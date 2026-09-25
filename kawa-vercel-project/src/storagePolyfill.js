// Kawa fue creada originalmente como artifact de Claude, donde existe una API
// llamada `window.storage` para guardar datos de forma persistente. Aquí la
// recreamos usando Firebase Firestore, así que los datos quedan guardados en
// la nube y se ven iguales desde cualquier celular o computador que abra
// esta misma app (mientras uses las mismas claves de src/firebaseConfig.js).
//
// Si todavía no configuraste src/firebaseConfig.js, la app sigue
// funcionando pero guardando solo en este navegador (localStorage), para
// que nunca se rompa por falta de configuración.

import { firebaseConfig } from './firebaseConfig.js';

const isConfigured = Object.values(firebaseConfig).every(
  v => typeof v === 'string' && v && v !== 'PEGA_AQUI'
);

async function setupFirestore() {
  const { initializeApp } = await import('firebase/app');
  const { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs } =
    await import('firebase/firestore');

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const COLLECTION = 'kawa-data';

  return {
    async get(key) {
      const snap = await getDoc(doc(db, COLLECTION, key));
      if (!snap.exists()) return null;
      return { key, value: snap.data().value, shared: true };
    },
    async set(key, value) {
      await setDoc(doc(db, COLLECTION, key), { value, updatedAt: Date.now() });
      return { key, value, shared: true };
    },
    async delete(key) {
      await deleteDoc(doc(db, COLLECTION, key));
      return { key, deleted: true, shared: true };
    },
    async list(prefixFilter = '') {
      const snap = await getDocs(collection(db, COLLECTION));
      const keys = snap.docs.map(d => d.id).filter(k => k.startsWith(prefixFilter));
      return { keys, shared: true };
    },
  };
}

function setupLocalStorageFallback() {
  const prefix = 'kawa:';
  return {
    async get(key) {
      const raw = localStorage.getItem(prefix + key);
      if (raw === null) return null;
      return { key, value: raw, shared: false };
    },
    async set(key, value) {
      localStorage.setItem(prefix + key, value);
      return { key, value, shared: false };
    },
    async delete(key) {
      localStorage.removeItem(prefix + key);
      return { key, deleted: true, shared: false };
    },
    async list(prefixFilter = '') {
      const keys = Object.keys(localStorage)
        .filter(k => k.startsWith(prefix + prefixFilter))
        .map(k => k.slice(prefix.length));
      return { keys, shared: false };
    },
  };
}

// Se decide UNA sola vez qué implementación usar, y toda llamada espera a
// que esa decisión esté lista antes de leer o escribir — así se evita que
// la primera carga de la app use localStorage por error mientras Firebase
// todavía se está conectando.
let implPromise = null;
function getImpl() {
  if (!implPromise) {
    implPromise = isConfigured
      ? setupFirestore().catch(err => {
          console.error('No se pudo conectar a Firebase, usando almacenamiento local:', err);
          return setupLocalStorageFallback();
        })
      : Promise.resolve(setupLocalStorageFallback());
  }
  return implPromise;
}

if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    async get(key, ...rest) { return (await getImpl()).get(key, ...rest); },
    async set(key, value, ...rest) { return (await getImpl()).set(key, value, ...rest); },
    async delete(key, ...rest) { return (await getImpl()).delete(key, ...rest); },
    async list(prefixFilter, ...rest) { return (await getImpl()).list(prefixFilter, ...rest); },
  };
}
