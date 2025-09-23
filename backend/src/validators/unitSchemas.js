import { z } from 'zod'

export const UnitTypeEnum = z.enum(['capsule', 'cabin'])
export const StatusEnum = z.enum([
  'Available',
  'Occupied',
  'Cleaning In Progress',
  'Maintenance Needed',
])

export const createUnitSchema = z.object({
  name: z.string().min(1),
  type: UnitTypeEnum,
})

export const updateUnitSchema = z.object({
  status: StatusEnum,
})
