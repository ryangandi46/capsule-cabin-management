import { Router } from 'express'
import { listUnits, createUnit, getUnit, updateUnitStatus } from '../services/unitService.js'
import { createUnitSchema, updateUnitSchema } from '../validators/unitSchemas.js'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const { status, type } = req.query
    const units = await listUnits({ status, type })
    res.json(units)
  } catch {
    res.status(400).json({ error: 'Invalid query' })
  }
})

router.get('/:id', async (req, res) => {
  const unit = await getUnit(req.params.id)
  if (!unit) return res.status(404).json({ error: 'Not found' })
  res.json(unit)
})

router.post('/', async (req, res) => {
  const parsed = createUnitSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  const created = await createUnit(parsed.data)
  res.status(201).json(created)
})

router.put('/:id', async (req, res) => {
  const parsed = updateUnitSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() })
  try {
    const updated = await updateUnitStatus(req.params.id, parsed.data.status)
    res.json(updated)
  } catch (e) {
    if (e.code === 'NOT_FOUND') return res.status(404).json({ error: 'Not found' })
    if (e.code === 'BAD_TRANSITION') return res.status(400).json({ error: e.message })
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
