import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let eats;

export default class EatsDAO {
    static async injectDB(conn) {
        if (eats) {
            return;
        }
        try {
            eats = await conn.db(
                process.env.XSQ_COLLECTION)
                .collection('eat');
        } catch(e) {
            console.error(`Unable to connect to eatsDAO: ${e}`);
        }
    }

    static async getEats({page = 0, 
                            eatsPerPage = 20,} = {}) { // empty object as default value
        
        let cursor;
        try {
            cursor = await eats.find()
                                 .limit(eatsPerPage)
                                 .skip(eatsPerPage * page);
            const eatsList = await cursor.toArray();
            const totalNumEats = await eats.countDocuments();
            return {eatsList, totalNumEats};
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return {eatsList: [], totalNumEats: 0};
        }
    }

    static async getEatByID(id) {
        try {
            return await eats.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                }, 
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id', 
                        foreignField: 'facility_id', 
                        as: 'reviews',
                    }
                }
            ]).next();
        } catch(e) {
            console.error(`Unable to get eat by ID: ${e}`);
            throw e;
        }
    }
}