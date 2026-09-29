import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/college_management';

async function checkDatabase() {
  try {
    console.log(`\nConnecting to: ${mongoUri} ...`);
    await mongoose.connect(mongoUri);
    console.log(' Connected to MongoDB!\n');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    console.log('='.repeat(65));
    console.log(` DATABASE: college_management (${collections.length} Collections)`);
    console.log('='.repeat(65));

    for (const col of collections) {
      const name = col.name;
      const count = await db.collection(name).countDocuments();
      console.log(` • ${name.padEnd(20)} : ${count} documents`);
    }

    console.log('='.repeat(65));

    // Show a sample from core collections
    const previewCollections = ['users', 'courses', 'students', 'events', 'notices', 'fees'];
    for (const name of previewCollections) {
      const exists = collections.some((c) => c.name === name);
      if (exists) {
        const sample = await db.collection(name).findOne({}, { projection: { password: 0 } });
        console.log(`\n--- Sample from "${name}" ---`);
        console.log(JSON.stringify(sample, null, 2));
      }
    }

    console.log('\n Database check completed successfully.\n');
  } catch (err) {
    console.error('Error connecting to database:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

checkDatabase();
