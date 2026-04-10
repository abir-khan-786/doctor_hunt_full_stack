import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();

  const dr1 = await prisma.doctor.create({
    data: {
      name: "Dr. Anika Rahman",
      specialty: "Cardiology",
      bio: "15+ years guiding heart health with a calm, patient-first approach.",
      imageUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
    },
  });

  const dr2 = await prisma.doctor.create({
    data: {
      name: "Dr. Karim Hossain",
      specialty: "Pediatrics",
      bio: "Focused on gentle care for children and clear guidance for parents.",
      imageUrl:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
    },
  });

  const dr3 = await prisma.doctor.create({
    data: {
      name: "Dr. Nusrat Jahan",
      specialty: "Dermatology",
      bio: "Skin wellness plans tailored to your lifestyle and climate.",
      imageUrl:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
    },
  });

  await prisma.review.createMany({
    data: [
      {
        patientName: "Rafiq M.",
        rating: 5,
        comment:
          "Booking took under a minute. The doctor was on time and explained everything clearly.",
        doctorId: dr1.id,
      },
      {
        patientName: "Sumaiya K.",
        rating: 5,
        comment:
          "Loved the reminders and the clean portal. Finally found a pediatrician we trust.",
        doctorId: dr2.id,
      },
      {
        patientName: "Imran S.",
        rating: 4,
        comment:
          "Great experience overall. Minor wait at the clinic but the care was excellent.",
        doctorId: dr3.id,
      },
      {
        patientName: "Tanjila A.",
        rating: 5,
        comment:
          "Doctor Hunt made comparing specialties easy. Highly recommend for busy families.",
        doctorId: null,
      },
    ],
  });

  console.log("Seed completed: doctors + reviews.");

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  if (adminEmail) {
    const result = await prisma.user.updateMany({
      where: { email: adminEmail },
      data: { role: "admin" },
    });
    if (result.count === 0) {
      console.log(
        `ADMIN_EMAIL=${adminEmail}: no matching user — create an account with this email, then run npm run db:seed again.`,
      );
    } else {
      console.log(`Promoted ${adminEmail} to admin (${result.count} user).`);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
