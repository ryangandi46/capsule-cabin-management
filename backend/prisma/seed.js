import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const data = [
  { name: 'Capsule-A01', type: 'capsule', status: 'Available' },
  { name: 'Capsule-A02', type: 'capsule', status: 'Occupied' },
  { name: 'Forest-Cabin-2', type: 'cabin', status: 'Cleaning In Progress' },
]

try {
  const ops = await prisma.unit.createMany({ data, skipDuplicates: true })
  console.log('Seeded:', ops)
} finally {
  await prisma.$disconnect()
}
