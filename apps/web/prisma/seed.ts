import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const seedChain = await prisma.chain.create({
    data: {
        scopeId: 'seedScope',
        trace: '{name:"hello"}',
    },
  })
  console.log({ seedChain })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })