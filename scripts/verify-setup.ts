/**
 * Verification script to test Prisma setup
 * Run with: npx tsx scripts/verify-setup.ts
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Verifying Prisma setup...\n')

  try {
    // Test database connection
    console.log('1. Testing database connection...')
    await prisma.$connect()
    console.log('   ✅ Connected to database\n')

    // Test user table
    console.log('2. Testing User model...')
    const userCount = await prisma.user.count()
    console.log(`   ✅ User table accessible (${userCount} users)\n`)

    // Test post table
    console.log('3. Testing Post model...')
    const postCount = await prisma.post.count()
    console.log(`   ✅ Post table accessible (${postCount} posts)\n`)

    // Test calculation table
    console.log('4. Testing Calculation model...')
    const calcCount = await prisma.calculation.count()
    console.log(`   ✅ Calculation table accessible (${calcCount} calculations)\n`)

    // Create test user (optional)
    console.log('5. Testing data operations...')
    const testUser = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
        provider: 'email',
      },
    })
    console.log(`   ✅ Created test user: ${testUser.email}`)

    // Create test calculation
    const testCalc = await prisma.calculation.create({
      data: {
        userId: testUser.id,
        type: 'test',
        name: 'Verification Test',
        data: {
          test: true,
          timestamp: new Date().toISOString(),
        },
      },
    })
    console.log(`   ✅ Created test calculation: ${testCalc.id}`)

    // Fetch user with relations
    const userWithData = await prisma.user.findUnique({
      where: { id: testUser.id },
      include: {
        calculations: true,
      },
    })
    console.log(`   ✅ Retrieved user with ${userWithData?.calculations.length} calculation(s)`)

    // Clean up test data
    await prisma.calculation.delete({ where: { id: testCalc.id } })
    await prisma.user.delete({ where: { id: testUser.id } })
    console.log(`   ✅ Cleaned up test data\n`)

    console.log('✨ All tests passed! Your Prisma setup is working correctly.\n')
    console.log('📊 Database Summary:')
    console.log(`   - Users: ${userCount}`)
    console.log(`   - Posts: ${postCount}`)
    console.log(`   - Calculations: ${calcCount}`)
    console.log('\n🚀 You\'re ready to start building!')

  } catch (error) {
    console.error('❌ Verification failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
