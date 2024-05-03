import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {

    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.XSQ_COLLECTION).collection('reviews');
        } catch(e) {
            console.error(`Unable to connect to reviewsDAO: ${e}`);
        }
    }

    static async addReview(facilityId, user, score, review, date) {
        try {
            const reviewDoc = {
                name: user.name, 
                user_id: user._id, 
                date: date, 
                score: score, 
                review: review, 
                facility_id: new ObjectId(facilityId),
            }
            return await reviews.insertOne(reviewDoc);
        } catch(e) {
            console.error(`Unable to post review: ${e}`);
            return {error: e};
        }
    }

    static async updateReview(reviewId, user, score, review, date) {
        try {
            return await reviews.updateOne(
                {_id: new ObjectId(reviewId), user_id: user._id}, 
                {$set: {"score": score, "review": review, "date": date}}
                );
        } catch(e) {
            console.error(`Unable to update review: ${e}`);
            return {error: e};
        }
    }

    static async deleteReview(reviewId, user_id) {
        try {
            return await reviews.deleteOne({_id: new ObjectId(reviewId), user_id: user_id});
        } catch(e) {
            console.error(`Unable to delete review: ${e}`);
            return {error: e};
        }
    }
}