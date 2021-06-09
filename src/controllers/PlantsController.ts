import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Plant from '../models/Plant';
import PlantEnvironment from '../models/Plant_enviroments';
import plantsView from '../views/plants_view';
import * as Yup from 'yup';

interface CustomRequestProps extends Request{
  query: {
    take: string,
    page: string
  }
}

export default {

  async show(request: Request, response: Response) {
    //const { id } = request.params;

    //const plantsRepository = getRepository(Plant);

    // const plant = await plantsRepository.findOneOrFail(id, {
    //   relations: ['environments']
    // });
    
    // return response.json(plantsView.render(plant));

    const plants: any = {
      id: 1,
      name: "Aningapara",
      about: "É uma espécie tropical que tem crescimento rápido e fácil manuseio.",
      water_tips: "Mantenha a terra sempre húmida sem encharcar. Regue 2 vezes na semana.",
      photo: "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/1.svg",
      frequency: "week",
    }
    return response.json(plants);
  },
  
  async index(request: CustomRequestProps, response: Response) {
    const { take, page } = request.query;
    const plantsRepository = getRepository(Plant);

    const plants = await plantsRepository.find({
      relations: ['environments']
    });

    if(take || page){
      const plantsInd = await plantsRepository
      .createQueryBuilder("plant")
      .leftJoinAndSelect("plant.environments", "Plants_environments")
      .take(Number(take))
      .skip(Number(page)? (Number(page) - 1)*Number(take) : 0)
      .getMany();

      console.log(plantsView.renderMany(plantsInd));
      return response.json(plantsView.renderMany(plantsInd));
    }
    else
      return response.json(plantsView.renderMany(plants));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      about,
      water_tips,
      photo,
      environments,
      frequency_times,
      frequency_repeat_every
    } = request.body;
  
    const plantsRepository = getRepository(Plant);

    const data = {
      name,
      about,
      water_tips,
      photo,
      frequency_times,
      frequency_repeat_every,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      about: Yup.string().required(),
      water_tips: Yup.string().required(),
      photo: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const plant = plantsRepository.create(data);

    await plantsRepository.save(plant);
    plant.environments = [];

    const relationShip = environments.map(async(envId:number) => {
      const envRepo = getRepository(PlantEnvironment);

      const env = await envRepo.findOneOrFail(envId);
    
      if(env) {
        plant.environments.push(env);
      }

    });
    Promise.all(relationShip).then( async() => {
      await plantsRepository.save(plant);
    
      return response.status(201).json(plant);
    });
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const plantsRepository = getRepository(Plant);

    plantsRepository.delete(id);

    return response.status(201).json({message: 'Deletado com sucesso'});
  }
}