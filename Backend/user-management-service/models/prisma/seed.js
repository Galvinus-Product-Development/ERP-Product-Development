const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb'); 

const prisma = new PrismaClient();

async function main() {
  const plainPassword = 'ECOMMERCE@2025'; // Your actual password
  const passwordHash = await bcrypt.hash(plainPassword, 10); // Hash it securely

    
  const userId = new ObjectId().toString();
  const adminId = new ObjectId().toString();
    

  const user = await prisma.user.create({
      data: {
        id: userId,
      name: 'Abhipsha Neog',
      email: 'abhipshaneog@gmail.com',
      passwordHash,
      phoneNumber: '+919876543210',
      address: {
        street: 'House 221B',
        city: 'Guwahati',
        zip: '781001',
        country: 'India',
      },
      profilePicture: 'https://example.com/avatar.png',
      role: 'admin',
      emailVerified: true,
      phoneVerified: true,
      loyaltyPoints: 200,
      lastLogin: new Date(),

      admin: {
          create: {
            id: adminId,
          //userId: userId,
          permissions: { manageUsers: true, accessReports: true },
          isSuperadmin: true,
        },
      },

      devices: {
        create: [
              {
           // userId: userId,
            deviceId: 'device-abhipsha',
            userAgent: 'Mozilla/5.0 (Abhipsha Browser)',
            ipAddress: '127.0.0.1',
            refreshToken: 'refresh-token-abhipsha',
          },
        ],
      },

      refreshTokens: {
        create: [
              {
               // userId: userId,
                token: 'refresh-token-abhipsha',
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
          },
        ],
      },

      passwordResetTokens: {
        create: [
              {
                //email: 'abhipshaneog@gmail.com',
                token: 'reset-token-abhipsha',
                expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
          },
        ],
      },

      notifications: {
        create: [
              {
                //userId: userId,
                title: 'Welcome, Abhipsha!',
                body: 'Thanks for setting up your admin account.',
                type: 'admin',
                status: 'unread',
          },
        ],
      },
    },
  });

  console.log(`✅ Seeded user: ${user.email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    prisma.$disconnect();
  });
