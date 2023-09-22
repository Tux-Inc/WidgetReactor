import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnnoucementService } from './annoucement.service';
import { CreateAnnoucementDto } from './dto/createAnnoucement.dto';

@Controller('announcement')
export class AnnoucementController {
    constructor(private readonly annoucementService: AnnoucementService) {}
    @Get()
    findAll() {
        return this.annoucementService.findAll();
    }

    @Post('create')
    createAnnoucement(@Body() createAnnouncementDto: CreateAnnoucementDto) {
        return this.annoucementService.create(createAnnouncementDto);
    }
}


