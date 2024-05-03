import express from 'express';
import VisitsController from './visits.controller.js';
import EatsController from './eats.controller.js';
import ReviewsController from './reviews.controller.js';

// Get access to Express router
const router = express.Router();

router.route('/visits').get(VisitsController.apiGetVisits);
router.route('/visits/id/:id').get(VisitsController.apiGetVisitById);

router.route('/eats').get(EatsController.apiGetEats);
router.route('/eats/id/:id').get(EatsController.apiGetEatById);

router.route('/reviews').post(ReviewsController.apiPostReview);
router.route('/reviews').put(ReviewsController.apiUpdateReview);
router.route('/reviews').delete(ReviewsController.apiDeleteReview);

export default router;