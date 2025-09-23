import express from 'express'
import cors from 'cors'
import unitsRouter from './routes/units.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/units', unitsRouter)
app.get('/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
