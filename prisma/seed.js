import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function seed() {
    const adminUser = await createUser(
        'admin@test.com',
        'Testpassword1!',
        'ADMIN'
    );
    const publicUser = await createUser(
        'public1@test.com',
        'Testpassword1!',
        'PUBLIC'
    );
}

async function createUser(email, password, role = 'PUBLIC') {
    const user = await prisma.user.create({
        data: {
            email,
            password: await bcrypt.hash(password, 8),
            role,
        },
    });

    console.info(`${role} user created`, user);

    return user;
}

seed().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
