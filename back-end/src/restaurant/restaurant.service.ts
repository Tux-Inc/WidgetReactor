import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

/*
async function getRestaurantsInNice(apiKey) {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json', {
      params: {
        query: 'restaurants in Nice',
        key: apiKey
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}*/

interface RestaurantData {
    name: string;
    formatted_address: string;
    geometry: {
        location: {
        lat: number;
        lng: number;
        }
    }
}
  
interface FakeRestaurantsResponse {
    data: {
        results: RestaurantData[];
    }
}
    
async function getFakeRestaurantsInNice(): Promise<FakeRestaurantsResponse> {
    return new Promise((resolve, reject) => {
      try {
        const response = {
          data: {
            results: [
              {
                name: "abuteghinna",
                formatted_address: "11 Rue du Marché, 06300 Nice",
                geometry: {
                  location: {
                    lat: 43.6977,
                    lng: 7.2774
                  }
                }
              },
              {
                name: "safari",
                formatted_address: "1 Cr Saleya, 06300 Nice",
                geometry: {
                  location: {
                    lat: 43.6959,
                    lng: 7.2761
                  }
                }
              }
            ]
          }
        };
  
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
}

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant) 
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    findAll() {
        return this.restaurantRepository.find();
    }

    async updateAll(updateStr: string) {
        try {
            const response = await getFakeRestaurantsInNice();
            const restaurantDataList = response.data.results;

            for (let restaurantData of restaurantDataList) {
                const existingRestaurant = await this.restaurantRepository.findOne({
                    where: { name: restaurantData.name }
                });

                if (existingRestaurant) {
                    existingRestaurant.name = restaurantData.name;
                    existingRestaurant.loc = restaurantData.formatted_address;
                } else {
                    const newRestaurant = new Restaurant();
                    newRestaurant.name = restaurantData.name;
                    newRestaurant.loc = restaurantData.formatted_address;
                    newRestaurant.mark = 0;

                    await this.restaurantRepository.save(newRestaurant);
                }
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update restaurants');
        }
    }

    async updateMark(id: number, mark: number) {
        try {
            const restaurant = await this.restaurantRepository.findOne({ where: { id: id } });
    
            if (!restaurant) {
                throw new Error('Restaurant not found');
            }
            
            restaurant.mark = (restaurant.mark + mark) / 2;

            return this.restaurantRepository.save(restaurant);
            } catch (error) {
                console.error(error);
            throw new Error('Failed to update the mark');
        }
    }  
}
