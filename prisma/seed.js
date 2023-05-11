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
    const driver = await createGolfClub('Driver');
    const wood = await createGolfClub('3 Wood');
    const hybrid = await createGolfClub('3 Hybrid');
    const iron4 = await createGolfClub('4 Iron');
    const iron5 = await createGolfClub('5 Iron');
    const iron6 = await createGolfClub('6 Iron');
    const iron7 = await createGolfClub('7 Iron');
    const iron8 = await createGolfClub('8 Iron');
    const iron9 = await createGolfClub('9 Iron');
    const pitchingWedge = await createGolfClub('PW');
    const sandWedge = await createGolfClub('SW');
    const gapWedge = await createGolfClub('GW');
    const lobWedge = await createGolfClub('LW');
    const putter = await createGolfClub('Putter');

    const golfShot1 = {
        userId: 1,
        golfClubId: 6,
        left: true,
        right: false,
        onTarget: false,
        long: true,
        short: false,
        pinHigh: false,
    };
    createGolfShot(golfShot1);
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

async function createGolfClub(club) {
    const newClub = await prisma.golfClub.create({
        data: {
            club,
        },
    });

    console.info(`A ${club} was added to the golf club database`);
    return newClub;
}

async function createGolfShot(shot) {
    const { userId, golfClubId, left, right, onTarget, long, short, pinHigh } =
        shot;
    const newShot = await prisma.golfShotBasic.create({
        data: {
            userId,
            golfClubId,
            left,
            right,
            onTarget,
            long,
            short,
            pinHigh,
        },
        include: {
            user: true,
            golfClub: true,
        },
    });
    return newShot;
}

seed().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
