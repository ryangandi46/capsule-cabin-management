## Run Progam
### Backend
npx prisma generate
npm run migrate -- --name init
node prisma/seed.js
npm run dev  

### Frontend
cd ../frontend/app
npm i
npm run dev 

## API
GET /api/units?status=...&type=...
GET /api/units/:id
POST /api/units
PUT /api/units/:id

Rule: Forbid direct "Occupied -> Available" (HTTP 400).
DB: PostgreSQL
Name DB: unitsdb

## Troubleshooting
Node version error (EBADENGINE)
Vite 7 requires Node ≥20.19.0. Use nvm:

nvm install 20.19.0
nvm use 20.19.0

## Manual test
# 1) List all unit
curl http://localhost:3000/api/units

# 2) Filter
curl "http://localhost:3000/api/units?status=Available&type=capsule"

# 3) Creat new unit
curl -X POST http://localhost:3000/api/units 
  -H "Content-Type: application/json" 
  -d '{"name":"Capsule-A03","type":"capsule"}'

# 4) Get ID, and unit detail
curl http://localhost:3000/api/units/<ID>

# 5) Update status (valid)
curl -X PUT http://localhost:3000/api/units/<ID> 
  -H "Content-Type: application/json" 
  -d '{"status":"Maintenance Needed"}'

# 6) Try the forbidden rule (Occupied -> Available) → 400
curl -X PUT http://localhost:3000/api/units/<ID_OCCUPIED> 
  -H "Content-Type: application/json" 
  -d '{"status":"Available"}'
