import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get()
    findAll() {
        return this.employeeService.findAll();
    }

    @Get('all-tags')
    getAllTags() {
        return this.employeeService.getAllTags();
    }

    @Get('tags/:key_id')
    getTags(@Param('key_id') key_id: number) {
        return this.employeeService.getTagsByKeyId(key_id);
    }

    @Get('rgpd/:key_id')
    getRGPD(@Param('key_id') key_id: number) {
        return this.employeeService.getRGPDByKeyId(key_id);
    }

    @Put('update-rgpd/:key_id')
    updateRGPD(@Param('key_id') key_id: number, @Body('rgpd') rgpd: number) {
        return this.employeeService.updateRGPD(key_id, rgpd);
    }

    @Put('update-tags/:key_id')
    updateTags(@Param('key_id') key_id: number, @Body('tags') tags: number) {
        return this.employeeService.updateTags(key_id, tags);
    }
}
