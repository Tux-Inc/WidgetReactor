import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnnoucementModule } from './annoucement/annoucement.module';
import { Annoucement } from './annoucement/entities/annoucement.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Employee } from './employee/entities/employee.entity';
import { RestaurantModule } from './restaurant/restaurant.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'survivorDB',
    entities: [Annoucement, Restaurant, Employee],
    synchronize: false,
  }), RestaurantModule, AnnoucementModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
