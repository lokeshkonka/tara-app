require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');
const { seedIfEmpty } = require('./src/seed/communitySeed');
const { seedIfEmpty: seedLearnIfEmpty } = require('./src/seed/learnDataSeed');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectDB();

        // PHASE 2: idempotent dev seed for the Community module (panchayats,
        // sample voice stories/posts). Only runs when the DB has no data.
        await seedIfEmpty();

        // PHASE 4: idempotent dev seed for the Learn curriculum (categories,
        // modules and level rows). Only runs when the DB has no categories.
        await seedLearnIfEmpty();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Server start failed:', err.message);
        process.exit(1);
    }
}

startServer();
