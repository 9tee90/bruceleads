import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create demo user if it doesn't exist
  const demoUserEmail = 'demo@bruceleads.com';
  const existingDemoUser = await prisma.user.findUnique({
    where: { email: demoUserEmail },
  });

  if (!existingDemoUser) {
    const hashedPassword = await bcrypt.hash('demouser123', 10);
    await prisma.user.create({
      data: {
        email: demoUserEmail,
        name: 'Demo User',
        password: hashedPassword,
        role: 'DEMO',
      },
    });
    console.log('Demo user created successfully');
  } else {
    console.log('Demo user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 