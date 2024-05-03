import mongodb from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import VisitsDAO from './dao/visitsDAO.js';
import EatsDAO from './dao/eatsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.XSQ_DB_URI
    );
    const port = process.env.PORT || 8000;

    try {
        //Connect to MongoDB server
        await client.connect();
        await VisitsDAO.injectDB(client);
        await EatsDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);

export default app;
