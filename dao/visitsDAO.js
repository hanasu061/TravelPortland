import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let visits;

export default class VisitsDAO {
    static async injectDB(conn) {
        if (visits) {
            return;
        }
        try {
            visits = await conn.db(
                process.env.XSQ_COLLECTION)
                .collection('visit');
        } catch(e) {
            console.error(`Unable to connect to visitsDAO: ${e}`);
        }
    }

    static async getVisits({page = 0, 
                            visitsPerPage = 20,} = {}) { // empty object as default value
        
        let cursor;
        try {
            cursor = await visits.find()
                                 .limit(visitsPerPage)
                                 .skip(visitsPerPage * page);
            const visitsList = await cursor.toArray();
            const totalNumVisits = await visits.countDocuments();
            return {visitsList, totalNumVisits};
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return {visitsList: [], totalNumVisits: 0};
        }
    }

    static async getVisitByID(id) {
        try {
            return await visits.aggregate([
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
            console.error(`Unable to get visit by ID: ${e}`);
            throw e;
        }
    }
}