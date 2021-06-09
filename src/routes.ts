import { Router } from 'express';
import  PlantsController from './controllers/PlantsController';
import  EnvController from './controllers/EnvController';


const routes = Router();

routes.get('/plants', PlantsController.show);
//routes.get('/plants', PlantsController.index);
//routes.get('/plants/:id', PlantsController.show);
// routes.post('/plants', PlantsController.create);
// routes.delete('/plants/:id', PlantsController.delete);
// routes.post('/plants-environments', EnvController.create);
// routes.get('/plants_environments', EnvController.index);

export default routes;