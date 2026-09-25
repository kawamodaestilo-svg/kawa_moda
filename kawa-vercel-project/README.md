# Kawa Moda

## Publicar gratis en Vercel

1. Crea un repositorio nuevo en https://github.com/new
2. Sube **todos** los archivos y carpetas de este proyecto (respeta la
   carpeta `src/` tal cual está).
3. Entra a https://vercel.com, inicia sesión con tu cuenta de GitHub (gratis,
   sin tarjeta) y haz clic en "Add New Project".
4. Elige el repositorio que acabas de crear y presiona "Deploy".
5. En 1-2 minutos te da una URL pública gratis, por ejemplo:
   `kawa-moda.vercel.app`

## Para que TODOS los dispositivos vean los mismos datos (Firebase)

Por defecto, si no configuras nada, cada navegador guarda sus propios datos
por separado. Para que el celular, la tablet y el computador vean siempre
la misma información:

1. Ve a https://console.firebase.google.com y crea un proyecto gratis.
2. Dentro del proyecto: ⚙️ (Configuración del proyecto) > "Tus apps" >
   icono `</>` (Web) > regístrala con cualquier nombre. Te va a mostrar un
   bloque `firebaseConfig` con varias claves.
3. Abre `src/firebaseConfig.js` en este proyecto y reemplaza los valores
   "PEGA_AQUI" con esas claves.
4. En el menú lateral de Firebase entra a "Firestore Database" > "Crear
   base de datos" (modo producción, cualquier ubicación).
5. En la pestaña "Reglas" de Firestore, pega esto y publica:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /kawa-data/{document} {
         allow read, write: if true;
       }
     }
   }
   ```

6. Sube estos cambios a GitHub (o vuelve a subir los archivos actualizados).
   Vercel vuelve a publicar la app automáticamente en 1-2 minutos.

Nota de seguridad: estas reglas dejan la base de datos abierta a quien
tenga tu link y tus claves de Firebase — no hay usuarios/contraseñas reales
detrás, solo la contraseña que ya tiene la app. Es razonable para un
equipo pequeño y de confianza, pero no es una seguridad "a prueba de todo".

Si nunca configuras Firebase, la app sigue funcionando normal, solo que
cada navegador guarda sus datos por separado (localStorage).

## Desarrollo local (opcional)

```bash
npm install
npm run dev
```
