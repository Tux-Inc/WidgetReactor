import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/createEmployee.dto';

export enum TagEnum {
    SPORT = 1,
    NOURITURE = 2,
    REPOS = 3,
}

export enum RGPDEnum {
    PICTURE = 1,
    EMAIL = 2,
    NAME = 3,
    SURNAME = 4,
    BIRTHDATE = 5,
    GENDER = 6,
    WORK = 7,
}

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee) private employeeRepository: Repository<Employee>
    ) {}

    async getOrCreateEmployeeByKeyId(key_id: number): Promise<Employee> {
        let employee = await this.employeeRepository.findOne({ where: { key_id } });
        if (!employee) {
            employee = this.employeeRepository.create({ key_id, rgpd: [], tags: [], picture: [] });
            await this.employeeRepository.save(employee);
        }
        return employee;
    }

    async toggleEnumValue(key_id: number, enumValue: number, field: 'rgpd' | 'tags'): Promise<Employee> {
        const employee = await this.getOrCreateEmployeeByKeyId(key_id);
        
        if (employee[field].includes(enumValue)) {
            employee[field] = employee[field].filter(value => value !== enumValue);
        } else {
            employee[field].push(enumValue);
        }

        return this.employeeRepository.save(employee);
    }

    async updateRGPD(key_id: number, rgpdValue: number): Promise<Employee> {
        if (!Object.values(RGPDEnum).includes(rgpdValue)) {
            throw new NotFoundException(`RGPD ${rgpdValue} not found`);
        }
        return this.toggleEnumValue(key_id, rgpdValue, 'rgpd');
    }

    async updateTags(key_id: number, tagValue: number): Promise<Employee> {
        if (!Object.values(TagEnum).includes(tagValue)) {
            throw new NotFoundException(`Tag ${tagValue} not found`);
        }
        return this.toggleEnumValue(key_id, tagValue, 'tags');
    }

    async getAllTags(): Promise<string[]> {
        return Object.keys(TagEnum).slice(Object.keys(TagEnum).length / 2);
    }      

    async getTagsByKeyId(key_id: number): Promise<number[]> {
        const employee = await this.getOrCreateEmployeeByKeyId(key_id);
        return employee.tags;
    }

    async getRGPDByKeyId(key_id: number): Promise<number[]> {
        const employee = await this.getOrCreateEmployeeByKeyId(key_id);
        return employee.rgpd;
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }
}
