
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create demo users
  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@demo.com' },
    update: {},
    create: {
      email: 'parent@demo.com',
      password: await bcrypt.hash('demo123', 10),
      role: 'PARENT',
      firstName: 'Μαρία',
      lastName: 'Παπαδοπούλου',
      name: 'Μαρία Παπαδοπούλου',
      phone: '6901234567',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'SCHOOL_ADMIN',
      firstName: 'Γιάννης',
      lastName: 'Διευθυντής',
      name: 'Γιάννης Διευθυντής',
      phone: '6909876543',
    },
  });

  // Create mandatory test admin user
  const testAdmin = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: await bcrypt.hash('johndoe123', 10),
      role: 'SCHOOL_ADMIN',
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      phone: '6901111111',
    },
  });

  // Create additional test admin user
  const testAdmin2 = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      email: 'admin@school.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'SCHOOL_ADMIN',
      firstName: 'Admin',
      lastName: 'School',
      name: 'Admin School',
      phone: '6902222222',
    },
  });

  // Create drivers
  const drivers = await Promise.all([
    prisma.driver.upsert({
      where: { email: 'driver1@school.com' },
      update: {},
      create: {
        firstName: 'Γιάννης',
        lastName: 'Παπαδόπουλος',
        email: 'driver1@school.com',
        phone: '6901111111',
        licenseNumber: 'DL001234',
        experience: 15,
        rating: 4.8,
        imageUrl: 'https://img.apmcdn.org/e2f37539bc2eb64d382f94069a58312b96feaf1f/square/740974-20160206-busdriver1.jpg',
        status: 'ACTIVE',
      },
    }),
    prisma.driver.upsert({
      where: { email: 'driver2@school.com' },
      update: {},
      create: {
        firstName: 'Μαρία',
        lastName: 'Κωνσταντίνου',
        email: 'driver2@school.com',
        phone: '6902222222',
        licenseNumber: 'DL005678',
        experience: 12,
        rating: 4.9,
        imageUrl: 'https://thumbs.dreamstime.com/b/school-bus-driver-vector-illustration-young-asian-standing-front-yellow-smiling-female-uniform-cheerful-female-89788144.jpg',
        status: 'ACTIVE',
      },
    }),
    prisma.driver.upsert({
      where: { email: 'driver3@school.com' },
      update: {},
      create: {
        firstName: 'Δημήτρης',
        lastName: 'Αντωνίου',
        email: 'driver3@school.com',
        phone: '6903333333',
        licenseNumber: 'DL009012',
        experience: 8,
        rating: 4.2,
        imageUrl: 'https://img.freepik.com/premium-photo/young-brunette-man-driving-truck-looking-camera-square-frame_1026535-4941.jpg',
        status: 'ACTIVE',
      },
    }),
    prisma.driver.upsert({
      where: { email: 'driver4@school.com' },
      update: {},
      create: {
        firstName: 'Ελένη',
        lastName: 'Γεωργίου',
        email: 'driver4@school.com',
        phone: '6904444444',
        licenseNumber: 'DL003456',
        experience: 20,
        rating: 4.7,
        imageUrl: 'https://www.womenshistory.org/sites/default/files/styles/main_image/public/images/2018-07/Rosa_Parks_LOC%20square.jpg',
        status: 'ACTIVE',
      },
    }),
    prisma.driver.upsert({
      where: { email: 'driver5@school.com' },
      update: {},
      create: {
        firstName: 'Νίκος',
        lastName: 'Πετρόπουλος',
        email: 'driver5@school.com',
        phone: '6905555555',
        licenseNumber: 'DL007890',
        experience: 5,
        rating: 4.1,
        imageUrl: 'https://img3.stockfresh.com/files/r/rastudio/m/65/8627299_stock-vector-young-caucasian-school-bus-driver.jpg',
        status: 'ACTIVE',
      },
    }),
  ]);

  // Create routes
  const routes = await Promise.all([
    prisma.route.upsert({
      where: { id: 'route1' },
      update: {},
      create: {
        id: 'route1',
        name: 'Κεντρική Διαδρομή',
        description: 'Διαδρομή από κέντρο πόλης προς σχολείο',
        startLat: 37.9755,
        startLng: 23.7348,
        endLat: 37.9838,
        endLng: 23.7275,
        distance: 8.5,
        estimatedTime: 25,
        stops: [
          { name: 'Πλατεία Συντάγματος', lat: 37.9755, lng: 23.7348 },
          { name: 'Στάση Μετρό Πανεπιστήμιο', lat: 37.9695, lng: 23.7343 },
          { name: 'Πλατεία Εξαρχείων', lat: 37.9838, lng: 23.7275 }
        ],
        isActive: true,
      },
    }),
    prisma.route.upsert({
      where: { id: 'route2' },
      update: {},
      create: {
        id: 'route2',
        name: 'Βόρεια Διαδρομή',
        description: 'Διαδρομή από βόρεια προάστια προς σχολείο',
        startLat: 38.0756,
        startLng: 23.7792,
        endLat: 37.9838,
        endLng: 23.7275,
        distance: 12.3,
        estimatedTime: 35,
        stops: [
          { name: 'Κηφισιά', lat: 38.0756, lng: 23.7792 },
          { name: 'Αμαρούσιο', lat: 38.0436, lng: 23.8007 },
          { name: 'Νέα Ιωνία', lat: 38.0364, lng: 23.7539 }
        ],
        isActive: true,
      },
    }),
    prisma.route.upsert({
      where: { id: 'route3' },
      update: {},
      create: {
        id: 'route3',
        name: 'Νότια Διαδρομή',
        description: 'Διαδρομή από νότια προάστια προς σχολείο',
        startLat: 37.8746,
        startLng: 23.6779,
        endLat: 37.9838,
        endLng: 23.7275,
        distance: 15.7,
        estimatedTime: 45,
        stops: [
          { name: 'Γλυφάδα', lat: 37.8746, lng: 23.6779 },
          { name: 'Ελληνικό', lat: 37.8947, lng: 23.7275 },
          { name: 'Αλιμος', lat: 37.9098, lng: 23.7158 }
        ],
        isActive: true,
      },
    }),
    prisma.route.upsert({
      where: { id: 'route4' },
      update: {},
      create: {
        id: 'route4',
        name: 'Ανατολική Διαδρομή',
        description: 'Διαδρομή από ανατολικά προάστια προς σχολείο',
        startLat: 37.9642,
        startLng: 23.8178,
        endLat: 37.9838,
        endLng: 23.7275,
        distance: 10.2,
        estimatedTime: 30,
        stops: [
          { name: 'Χολαργός', lat: 37.9642, lng: 23.8178 },
          { name: 'Αγία Παρασκευή', lat: 37.9916, lng: 23.8203 },
          { name: 'Χαλάνδρι', lat: 38.0238, lng: 23.8033 }
        ],
        isActive: true,
      },
    }),
    prisma.route.upsert({
      where: { id: 'route5' },
      update: {},
      create: {
        id: 'route5',
        name: 'Δυτική Διαδρομή',
        description: 'Διαδρομή από δυτικά προάστια προς σχολείο',
        startLat: 37.9908,
        startLng: 23.6851,
        endLat: 37.9838,
        endLng: 23.7275,
        distance: 6.8,
        estimatedTime: 20,
        stops: [
          { name: 'Περιστέρι', lat: 37.9908, lng: 23.6851 },
          { name: 'Πετρούπολη', lat: 38.0416, lng: 23.6779 },
          { name: 'Ίλιον', lat: 38.0264, lng: 23.7025 }
        ],
        isActive: true,
      },
    }),
  ]);

  // Create buses
  const buses = await Promise.all([
    prisma.bus.upsert({
      where: { plateNumber: 'ΧΧΧ-1234' },
      update: {},
      create: {
        name: 'Λεωφορείο 1',
        plateNumber: 'ΧΧΧ-1234',
        capacity: 40,
        imageUrl: 'https://static.scientificamerican.com/sciam/cache/file/0F6D8D99-CF20-48BB-A23C174F6C42D5A8_source.jpg?crop=16%3A9%2Csmart&w=1920',
        status: 'ACTIVE',
        currentLat: 37.9755,
        currentLng: 23.7348,
        speed: 25,
        isMoving: true,
        driver: { connect: { id: drivers[0].id } },
        route: { connect: { id: routes[0].id } }
      },
    }),
    prisma.bus.upsert({
      where: { plateNumber: 'ΧΧΧ-5678' },
      update: {},
      create: {
        name: 'Λεωφορείο 2',
        plateNumber: 'ΧΧΧ-5678',
        capacity: 35,
        imageUrl: 'https://snworksceo.imgix.net/bdh/e8f6fda8-eece-43e3-be42-0b47a72c2b21.sized-1000x1000.jpg?w=800&dpr=2&ar=16%3A9&fit=crop&crop=faces',
        status: 'ACTIVE',
        currentLat: 38.0756,
        currentLng: 23.7792,
        speed: 30,
        isMoving: true,
        driver: { connect: { id: drivers[1].id } },
        route: { connect: { id: routes[1].id } }
      },
    }),
    prisma.bus.upsert({
      where: { plateNumber: 'ΧΧΧ-9012' },
      update: {},
      create: {
        name: 'Λεωφορείο 3',
        plateNumber: 'ΧΧΧ-9012',
        capacity: 42,
        imageUrl: 'https://static.seekingalpha.com/cdn/s3/uploads/getty_images/185905212/image_185905212.jpg?io=getty-c-crop-16-9',
        status: 'ACTIVE',
        currentLat: 37.8746,
        currentLng: 23.6779,
        speed: 28,
        isMoving: true,
        driver: { connect: { id: drivers[2].id } },
        route: { connect: { id: routes[2].id } }
      },
    }),
    prisma.bus.upsert({
      where: { plateNumber: 'ΧΧΧ-3456' },
      update: {},
      create: {
        name: 'Λεωφορείο 4',
        plateNumber: 'ΧΧΧ-3456',
        capacity: 38,
        imageUrl: 'https://www.shutterstock.com/shutterstock/videos/3502691889/thumb/1.jpg?ip=x480',
        status: 'ACTIVE',
        currentLat: 37.9642,
        currentLng: 23.8178,
        speed: 22,
        isMoving: false,
        driver: { connect: { id: drivers[3].id } },
        route: { connect: { id: routes[3].id } }
      },
    }),
    prisma.bus.upsert({
      where: { plateNumber: 'ΧΧΧ-7890' },
      update: {},
      create: {
        name: 'Λεωφορείο 5',
        plateNumber: 'ΧΧΧ-7890',
        capacity: 45,
        imageUrl: 'https://st2.depositphotos.com/1781556/7265/v/600/depositphotos_72657935-stock-video-yellow-school-bus-crossing-in.jpg',
        status: 'INACTIVE',
        currentLat: 37.9908,
        currentLng: 23.6851,
        speed: 0,
        isMoving: false,
        driver: { connect: { id: drivers[4].id } },
        route: { connect: { id: routes[4].id } }
      },
    }),
  ]);

  // Create additional parent users for other students
  const parent2 = await prisma.user.upsert({
    where: { email: 'parent2@demo.com' },
    update: {},
    create: {
      email: 'parent2@demo.com',
      password: await bcrypt.hash('demo123', 10),
      role: 'PARENT',
      firstName: 'Κωνσταντίνος',
      lastName: 'Γιάννου',
      name: 'Κωνσταντίνος Γιάννου',
      phone: '6902345678',
    },
  });

  const parent3 = await prisma.user.upsert({
    where: { email: 'parent3@demo.com' },
    update: {},
    create: {
      email: 'parent3@demo.com',
      password: await bcrypt.hash('demo123', 10),
      role: 'PARENT',
      firstName: 'Σοφία',
      lastName: 'Δημητρίου',
      name: 'Σοφία Δημητρίου',
      phone: '6903456789',
    },
  });

  // Create students
  const students = await Promise.all([
    prisma.student.create({
      data: {
        firstName: 'Άννα',
        lastName: 'Παπαδοπούλου',
        grade: 'Ε\' Δημοτικού',
        age: 11,
        address: 'Αθήνα, Κέντρο',
        parentId: parentUser.id,
        busId: buses[0].id,
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Πέτρος',
        lastName: 'Γιάννου',
        grade: 'Στ\' Δημοτικού',
        age: 12,
        address: 'Αθήνα, Κηφισιά',
        parentId: parent2.id,
        busId: buses[1].id,
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Ελένη',
        lastName: 'Δημητρίου',
        grade: 'Δ\' Δημοτικού',
        age: 10,
        address: 'Αθήνα, Γλυφάδα',
        parentId: parent3.id,
        busId: buses[2].id,
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Νίκος',
        lastName: 'Κώστας',
        grade: 'Γ\' Δημοτικού',
        age: 9,
        address: 'Αθήνα, Χολαργός',
        parentId: parent2.id,
        busId: buses[3].id,
      },
    }),
    prisma.student.create({
      data: {
        firstName: 'Μαρία',
        lastName: 'Αλεξίου',
        grade: 'Β\' Δημοτικού',
        age: 8,
        address: 'Αθήνα, Περιστέρι',
        parentId: parent3.id,
        busId: buses[4].id,
      },
    }),
  ]);

  // Create some GPS tracking data
  for (const bus of buses) {
    if (bus.currentLat && bus.currentLng) {
      const trackingData = Array.from({ length: 10 }, (_, i) => ({
        lat: bus.currentLat! + (Math.random() - 0.5) * 0.01,
        lng: bus.currentLng! + (Math.random() - 0.5) * 0.01,
        speed: Math.random() * 50,
        heading: Math.random() * 360,
        timestamp: new Date(Date.now() - (10 - i) * 60000),
        busId: bus.id,
      }));

      await prisma.gPSTracking.createMany({
        data: trackingData,
      });
    }
  }

  // Create sample events
  await prisma.event.createMany({
    data: [
      {
        type: 'SPEEDING',
        severity: 'HIGH',
        title: 'Υπερβολική Ταχύτητα',
        description: 'Ανιχνεύθηκε υπερβολική ταχύτητα 65 km/h σε ζώνη 50 km/h',
        location: 'Λεωφ. Κηφισίας 120',
        lat: buses[1].currentLat,
        lng: buses[1].currentLng,
        busId: buses[1].id,
        driverId: drivers[1].id,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        type: 'DELAY',
        severity: 'MEDIUM',
        title: 'Καθυστέρηση Διαδρομής',
        description: 'Το λεωφορείο καθυστερεί 15 λεπτά από το προγραμματισμένο χρόνο',
        location: 'Πλατεία Αττικής',
        lat: buses[2].currentLat,
        lng: buses[2].currentLng,
        busId: buses[2].id,
        driverId: drivers[2].id,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
    ],
  });

  // Create sample notifications
  await prisma.notification.createMany({
    data: [
      {
        title: 'Καλώς ήρθατε στο σύστημα',
        message: 'Το σύστημα παρακολούθησης σχολικών λεωφορείων είναι πλέον ενεργό',
        type: 'GENERAL',
        severity: 'LOW',
        userId: parentUser.id,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      },
      {
        title: 'Υπερβολική Ταχύτητα - Λεωφορείο 2',
        message: 'Ανιχνεύθηκε υπερβολική ταχύτητα στο Λεωφορείο 2',
        type: 'SAFETY_ALERT',
        severity: 'HIGH',
        busId: buses[1].id,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      },
      {
        title: 'Καθυστέρηση - Λεωφορείο 3',
        message: 'Το Λεωφορείο 3 καθυστερεί 15 λεπτά',
        type: 'DELAY_NOTIFICATION',
        severity: 'MEDIUM',
        busId: buses[2].id,
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      },
    ],
  });

  console.log('Seed completed successfully!');
  console.log('Demo accounts created:');
  console.log('Parent: parent@demo.com / demo123');
  console.log('Admin: admin@demo.com / admin123');
  console.log('Test Admin: john@doe.com / johndoe123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
