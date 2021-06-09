import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import PlantEnvironment from '../models/Plant_enviroments';
import environmentsView from '../views/plantEnvironments_view';

export default {
  async index(request: Request, response: Response) {
    const envRepository = getRepository(PlantEnvironment);

    const envs = await envRepository.find();

    return response.json(environmentsView.renderMany(envs));
  },

  async create(request: Request, response: Response) {
    const {
      key,
      title,
    } = request.body;
  
    const plantsEnvRepository = getRepository(PlantEnvironment);
  
    const plantEnv = plantsEnvRepository.create({
      key,
      title,
    });
  
    await plantsEnvRepository.save(plantEnv);
  
    return response.status(201).json(plantEnv);
  }

}