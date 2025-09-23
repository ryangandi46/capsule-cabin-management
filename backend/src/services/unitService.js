import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const forbiddenJump = { 'Occupied': ['Available'] }

export async function listUnits({ status, type }) {
  return prisma.unit.findMany({
    where: { ...(status && { status }), ...(type && { type }) },
    orderBy: { name: 'asc' },
  })
}

export async function getUnit(id) {
  return prisma.unit.findUnique({ where: { id } })
}

export async function createUnit({ name, type }) {
  return prisma.unit.create({ data: { name, type, status: 'Available' } })
}

export async function updateUnitStatus(id, nextStatus) {
  const current = await prisma.unit.findUnique({ where: { id } })
  if (!current) {
    const e = new Error('Not Found'); e.code = 'NOT_FOUND'; throw e
  }
  const banned = forbiddenJump[current.status] || []
  if (banned.includes(nextStatus)) {
    const e = new Error(`Cannot change status from ${current.status} to ${nextStatus} directly`)
    e.code = 'BAD_TRANSITION'; throw e
  }
  return prisma.unit.update({ where: { id }, data: { status: nextStatus } })
}
