# Sistema Web de Gestión de Inventario

Proyecto full stack con:
- Backend: Java 8 + Spring Boot 2.6
- Frontend: Angular 15.2.0
- Base de datos: MySQL
- Comunicación REST

## Estructura
- `backend/`: API REST con arquitectura en capas.
- `frontend/`: Aplicación Angular con Reactive Forms.
- `sql/schema.sql`: Script de creación de base de datos.

## Backend
```bash
cd backend
mvn spring-boot:run
```

## Frontend
```bash
cd frontend
npm install
npm start
```

## Endpoints
- `GET/POST/PUT/DELETE /api/categorias`
- `GET/POST/PUT/DELETE /api/productos`
- `POST /api/movimientos`
- `GET /api/movimientos/producto/{productoId}`

## Reglas de negocio
- ENTRADA: suma stock.
- SALIDA: resta stock y evita negativos.
