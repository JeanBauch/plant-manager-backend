import Plant from '../models/Plant';
import plantEnvironment_view from './plantEnvironments_view';

export default {
  render(plant: Plant ) {
    return{
      id: plant.id,
      name: plant.name,
      about: plant.about,
      water_tips: plant.water_tips,
      photo: plant.photo,
      environments: plantEnvironment_view.renderMany(plant.environments),
      frequency: {
        times: plant.frequency_times,
        repeat_every: plant.frequency_repeat_every
      }
    };
  },

  renderMany(plants: Plant[]) {
    return plants.map(plant => this.render(plant));
  },
};