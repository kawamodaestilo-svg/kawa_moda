// 1) Ve a https://console.firebase.google.com
// 2) Crea un proyecto nuevo (gratis) llamado, por ejemplo, "kawa-moda"
// 3) Dentro del proyecto: menú ⚙️ > "Configuración del proyecto" >
//    baja hasta "Tus apps" > icono </> ("Web") > regístrala con cualquier
//    nombre (ej. "kawa-web") > te muestra un bloque de código como este:
//
//    const firebaseConfig = {
//      apiKey: "AIza...",
//      authDomain: "kawa-moda-xxxx.firebaseapp.com",
//      projectId: "kawa-moda-xxxx",
//      storageBucket: "kawa-moda-xxxx.appspot.com",
//      messagingSenderId: "...",
//      appId: "..."
//    };
//
// 4) Copia esos valores AQUÍ ABAJO, reemplazando los que dicen "PEGA_AQUI".
// 5) No olvides también activar Firestore: menú lateral > "Firestore Database"
//    > "Crear base de datos" > modo de producción > cualquier ubicación.
//    Luego en la pestaña "Reglas" pega esto y publica:
//
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /kawa-data/{document} {
//          allow read, write: if true;
//        }
//      }
//    }
//
//    (Esto deja la base de datos abierta a quien tenga estas claves —
//    suficiente para un equipo pequeño que solo comparte este link, pero
//    ten presente que no es una seguridad "a prueba de todo".)

export const firebaseConfig = {
  apiKey: "PEGA_AQUI",
  authDomain: "PEGA_AQUI",
  projectId: "PEGA_AQUI",
  storageBucket: "PEGA_AQUI",
  messagingSenderId: "PEGA_AQUI",
  appId: "PEGA_AQUI",
};
