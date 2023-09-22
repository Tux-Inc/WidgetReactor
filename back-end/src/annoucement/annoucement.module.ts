import { Module } from '@nestjs/common';
import { AnnoucementController } from './annoucement.controller';
import { AnnoucementService } from './annoucement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annoucement } from './entities/annoucement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annoucement])],
  controllers: [AnnoucementController],
  providers: [AnnoucementService]
})
export class AnnoucementModule {}
