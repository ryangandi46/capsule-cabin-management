## Jalankan
### Backend
cd backend && npm i && npx prisma generate && npm run migrate -- --name init && node prisma/seed.js && npm run dev
### Frontend
cd frontend/app && npm i && npm run dev

## API
GET /api/units?status=...&type=...
GET /api/units/:id
POST /api/units
PUT /api/units/:id

Rule: Forbid direct "Occupied -> Available" (HTTP 400).
DB: PostgreSQL
