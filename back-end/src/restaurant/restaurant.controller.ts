import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/createRestaurant.dto';
import { UpdateMarkDto } from './dto/updateMark.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

    @Get()
    findAll() {
        return this.restaurantService.findAll();
    }

    @Post('update-all')
    updateAllRestaurants(@Body('updateStr') updateStr: string) {
        return this.restaurantService.updateAll(updateStr);
    }

    @Put(':id/mark')
    updateRestaurantMark(
        @Param('id') id: number, 
        @Body() updateMarkDto: UpdateMarkDto,
    ) {
        return this.restaurantService.updateMark(id, updateMarkDto.mark);
    }
}
