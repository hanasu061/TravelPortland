import VisitsDAO from '../dao/visitsDAO.js';

export default class VisitsController {

    static async apiGetVisits(req, res, next) {
        const visitsPerPage = req.query.visitsPerPage? 
            parseInt(req.query.visitsPerPage) : 20;
        const page = req.query.page? parseInt(req.query.page) : 0;

        const {visitsList, totalNumVisits} = await 
            VisitsDAO.getVisits({page, visitsPerPage});
        
        let response = {visits: visitsList, 
                        page: page, 
                        entries_per_page: visitsPerPage, 
                        total_results: totalNumVisits};
        res.json(response);
    }

    static async apiGetVisitById(req, res, next) {
        try {
            let id = req.params.id || {}
            let visit = await VisitsDAO.getVisitByID(id);
            if (!visit) {
                res.status(404).json({error: 'not found'});
                return;
            }
            res.json(visit);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({error: e});
        }
    }
}