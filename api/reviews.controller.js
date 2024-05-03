import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {

    static async apiPostReview(req, res, next) {
        try {
            const facilityId = req.body.facility_id;
            const score = req.body.score;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name, 
                _id: req.body.user_id,
            }

            const date = new Date();

            const reviewResponse = await ReviewsDAO.addReview(
                facilityId, 
                userInfo, 
                score, 
                review, 
                date
            );

            var {error} = reviewResponse;

            if (error) {
                res.status(500).json({error: 'Unable to post reviews.'});
                console.error(error);
            }
            else {
                res.json({
                    status: 'success', 
                    response: reviewResponse
                });
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    static async apiUpdateReview(req, res, next) {
        
        try {
            const reviewId = req.body.review_id;
            const score = req.body.score;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name, 
                _id: req.body.user_id,
            }

            const date = new Date();

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId, 
                userInfo, 
                score, 
                review, 
                date
            );

            var {error} = reviewResponse;

            if (error) {
                res.status(500).json({error: 'Unable to update reviews.'});
                console.error(error);
            }
            else {
                res.json({
                    status: 'success', 
                    response: reviewResponse
                });
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }

    static async apiDeleteReview(req, res, next) {
        
        try {
            const reviewId = req.body.review_id;
            const userid = req.body.user_id;

            const reviewResponse = await ReviewsDAO.deleteReview(reviewId, userid);

            var {error} = reviewResponse;

            if (error) {
                res.status(500).json({error: 'Unable to delete reviews.'});
                console.error(error);
            }
            else {
                res.json({
                    status: 'success', 
                    response: reviewResponse
                });
            }
        } catch(e) {
            res.status(500).json({error: e});
        }
    }
}