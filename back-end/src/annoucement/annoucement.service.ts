import { Injectable } from '@nestjs/common';
import { Annoucement } from './entities/annoucement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnnoucementParams } from './utils/types';

@Injectable()
export class AnnoucementService {

    constructor(
        @InjectRepository(Annoucement) private annoucementRepository: Repository<Annoucement>
    ) {}

    findAll() {
        return this.annoucementRepository.find();
    }

    create(announcementDetail: CreateAnnoucementParams) {
        const newAnnouncement = this.annoucementRepository.create(announcementDetail);
        return this.annoucementRepository.save(newAnnouncement);
    }
}
