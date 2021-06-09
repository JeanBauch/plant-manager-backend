import Plant_environment from '../models/Plant_enviroments';

export default {
  render(plant_environment: Plant_environment) {
    return{
      id: plant_environment.id,
      key: plant_environment.key,
      //title: plant_environment.title
    };
  },

  renderMany(plant_environments: Plant_environment[]) {
    return plant_environments.map(plant_environment => this.render(plant_environment));
  },
};