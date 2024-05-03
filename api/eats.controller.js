import EatsDAO from '../dao/eatsDAO.js';

export default class EatsController {

    static async apiGetEats(req, res, next) {
        const eatsPerPage = req.query.eatsPerPage? 
            parseInt(req.query.eatsPerPage) : 20;
        const page = req.query.page? parseInt(req.query.page) : 0;

        const {eatsList, totalNumEats} = await 
            EatsDAO.getEats({page, eatsPerPage});
        
        let response = {eats: eatsList, 
                        page: page, 
                        entries_per_page: eatsPerPage, 
                        total_results: totalNumEats};
        res.json(response);
    }

    static async apiGetEatById(req, res, next) {
        try {
            let id = req.params.id || {}
            let eat = await EatsDAO.getEatByID(id);
            if (!eat) {
                res.status(404).json({error: 'not found'});
                return;
            }
            res.json(eat);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }
}