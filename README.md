# 🧠 Frontend - App de Notas Privadas con React y Context API

Este frontend está desarrollado en **React** y se conecta a un backend con Node.js y MongoDB. Permite a los usuarios autenticarse (registro/login), y una vez logueados, pueden **crear, leer, editar y eliminar** sus propias notas privadas.

---

## 📦 Tecnologías utilizadas

- **React**
- **React Router DOM**
- **Axios** para hacer peticiones HTTP
- **Context API** para la gestión del estado global de autenticación
- **js-cookie** (para manejar las cookies)

---

### Backend
- Repositorio: (https://github.com/CarlosDiazGirol/auth-back)[https://github.com/CarlosDiazGirol/auth-back] 

## Funcionalidades principales

- Registro de usuario
- Login de usuario
- Mantener su sesión mediante cookies
- Gestión de notas (solo visibles por su autor)
- Persistencia de sesión entre recargas de página
- Logout desde cualquier parte de la app

---

## Estructura

├── src/
│   ├── api/axiosConfig.js
│   ├── components/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── Notes.jsx
│   ├── context/AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx          ← Página pública
│   │   └── Dashboard.jsx     ← Página protegida con CRUD
│   ├── App.jsx
│   └── main.jsx

## Autenticación con Context API y Cookies

### ¿Qué se usa y por qué?

| Recurso        | Para qué se usa                                |
|----------------|------------------------------------------------|
| **Context API**| Para gestionar globalmente la sesión del usuario |
| **Cookies**    | Para guardar el token JWT de forma persistente y más segura que localStorage |
| **Axios**      | Para hacer peticiones HTTP al backend           |

### ¿Por qué usar cookies en lugar de localStorage?

| Método        | Ventajas                                          | Inconvenientes                            |
|---------------|---------------------------------------------------|-------------------------------------------|
| `localStorage`| Fácil de usar, persistente                        | Vulnerable a ataques XSS                  |
| `Cookies`     | Pueden ser más seguras (si se usan con httpOnly)  | Requieren configurar cabeceras y CORS     |

En este proyecto usamos **cookies manuales con `js-cookie`** para equilibrar seguridad y simplicidad. No son `httpOnly` (que el frontend no puede leer), pero son más seguras que exponer directamente tokens en `localStorage`.

---

## Flujo de autenticación

1. El usuario se registra o inicia sesión → el backend devuelve un **JWT**
2. El frontend guarda el token en una **cookie** usando `js-cookie`
3. Cada vez que se hace una petición, Axios incluye ese token en la cabecera `Authorization`
4. Si el token es válido, el backend permite acceder o modificar notas
5. Si el usuario hace logout, se elimina la cookie y se bloquea el acceso

---

## 🧠 Contexto de autenticación (`AuthContext`)

Se usa `Context API` para:

- Saber en cualquier momento si el usuario está autenticado (`isAuthenticated`)
- Ejecutar funciones globales como `login()` y `logout()`
- Evitar tener que pasar props entre muchos componentes

```

