# API de lista de resurtido farmacéutico

API REST para la [lista de resurtido farmacéutico](https://github.com/santiagojimenezisc/pharmacy-restock-list), una app para que las farmacias de barrio pequeñas armen su lista de compras semanal. El problema, las funcionalidades y las capturas están en el README del front.

Guarda los productos por comprar con su precio, laboratorio, proveedor y sector (anaquel), y permite marcarlos como comprados.

## Tecnologías

- **Node.js** + **Express 5**
- **MariaDB** con el driver `mariadb`
- **Swagger** (`swagger-jsdoc` + `swagger-ui-express`) para documentar el API
- **ESLint** + **Prettier** para revisar y formatear el código
- **Vitest** + **supertest** para las pruebas

## Cómo correrlo

Requisitos: Node.js 20.6+ y MariaDB 11+.

```sh
npm install
cp .env.example .env    # llena las variables de la tabla de abajo
```

Crea la base de datos con su estructura y los datos de ejemplo:

```sh
mariadb -u root -p < database/schema.sql
mariadb -u root -p pharmacy < database/seed.sql
```

Levanta el servidor:

```sh
npm run dev     # con recarga automática (nodemon)
npm start       # sin recarga
```

La documentación interactiva queda en `http://localhost:3000/api-docs`.

Pruebas, revisión y formato del código:

```sh
npm test                # corre las pruebas una vez
npm run test:watch      # las vuelve a correr al guardar cambios
npm run lint            # busca errores con ESLint
npm run format          # formatea todo con Prettier
npm run format:check    # solo revisa el formato, sin cambiar archivos
```

> Esta versión no tiene autenticación: está pensada para uso local. Antes de publicarla en internet hay que agregar login o una API key.

| Variable      | Descripción                      | Ejemplo                 |
| ------------- | -------------------------------- | ----------------------- |
| `PORT`        | Puerto del servidor              | `3000`                  |
| `FRONT_URL`   | URL del front permitida por CORS | `http://localhost:5173` |
| `DB_HOST`     | Host de MariaDB                  | `localhost`             |
| `DB_USER`     | Usuario de MariaDB               | `root`                  |
| `DB_PASSWORD` | Contraseña de MariaDB            |                         |
| `DB_NAME`     | Nombre de la base de datos       | `pharmacy`              |

## Endpoints

| Método   | Ruta                                  | Descripción                                |
| -------- | ------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/laboratories`                   | Lista de laboratorios                      |
| `GET`    | `/api/suppliers`                      | Lista de proveedores                       |
| `GET`    | `/api/sectors`                        | Lista de sectores (anaqueles)              |
| `GET`    | `/api/sectors/summary`                | Total de productos y pendientes por sector |
| `GET`    | `/api/sectors/:id`                    | Productos de un sector                     |
| `POST`   | `/api/sectors`                        | Agregar un sector                          |
| `PUT`    | `/api/sectors/:id`                    | Actualizar un sector                       |
| `DELETE` | `/api/sectors/:id`                    | Borrar un sector sin productos             |
| `GET`    | `/api/products-to-buy`                | Todos los productos por comprar            |
| `POST`   | `/api/purchase-items`                 | Agregar un producto                        |
| `PUT`    | `/api/products-to-buy/:id`            | Actualizar un producto                     |
| `PATCH`  | `/api/products-to-buy/:id/complete`   | Marcar un producto como comprado           |
| `PATCH`  | `/api/products-to-buy/:id/incomplete` | Marcar un producto como pendiente          |
| `DELETE` | `/api/products-to-buy/:id`            | Borrar un producto                         |

## Estructura

```
src/
├── server.js       arranca el servidor
├── app.js          configuración de Express, rutas y manejo de errores
├── config/         conexión a MariaDB (pool) y configuración de Swagger
├── routes/         URLs de cada recurso y su documentación de Swagger
├── middlewares/    funciones que corren antes de las rutas (validar IDs)
├── controllers/    reciben la petición, validan y responden
└── services/       consultas SQL a la base de datos

tests/            pruebas de los endpoints (no usan la base de datos)

database/
├── schema.sql    estructura de las tablas
└── seed.sql      datos de ejemplo
```

## Mejoras pendientes

- [ ] Unificar las rutas de productos bajo un solo nombre
- [ ] Respuestas con formato consistente (tipos y `tags` como arreglo)
