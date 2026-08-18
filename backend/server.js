require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');
const { seedIfEmpty } = require('./src/seed/communitySeed');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        // PHASE 2: idempotent dev seed for the Community module (panchayats,
        // sample voice stories/posts). Only runs when the DB has no data.
        await seedIfEmpty();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Server start failed:', err.message);
        process.exit(1);
    }
}

startServer();
