import { Body, Controller, Get, Inject, Patch, Post } from '@nestjs/common';
import { SaveRequestDto } from './dto/save.request.dto';
import { TemplateService } from '../application/template.service';
import { CommandMapper } from '../application/command/command.mapper';
import { SaveCommand } from '../application/command/save.command';
import { InfoMapper } from '../application/info/info.mapper';
import { SaveResponseDto } from './dto/save.response.dto';
import { SaveInfo } from '../application/info/save.info';
import { GetRequestDto } from './dto/get.request.dto';
import { GetCommand } from '../application/command/get.command';
import { GetResponseDto } from './dto/get.response.dto';
import { GetInfo } from '../application/info/get.info';

@Controller('template/api')
export class ApiController {
  constructor(
    @Inject(TemplateService)
    private readonly templateService: TemplateService,
  ) {}

  @Post()
  async save(@Body() body: SaveRequestDto.Body) {
    try {
      const info = await this.templateService.save(
        CommandMapper.of(SaveCommand.Body, body),
      );

      return InfoMapper.of(SaveResponseDto.Body, info.getInfo());
    } catch (e) {
      console.error(`ApiController/save()`, e);

      return InfoMapper.of(
        SaveResponseDto.Body,
        new SaveInfo.Info().setFailure().getInfo(),
      );
    }
  }

  @Patch()
  async update(@Body() body: SaveRequestDto.Body) {
    try {
      const info = await this.templateService.update(
        CommandMapper.of(SaveCommand.Body, body),
      );

      return InfoMapper.of(SaveResponseDto.Body, info.getInfo());
    } catch (e) {
      console.error(`ApiController/update()`, e);

      return InfoMapper.of(
        SaveResponseDto.Body,
        new SaveInfo.Info().setFailure().getInfo(),
      );
    }
  }

  @Get()
  async get(@Body() body: GetRequestDto.Body) {
    try {
      const info = await this.templateService.get(
        CommandMapper.of(GetCommand.Body, body),
      );

      return InfoMapper.of(GetResponseDto.Body, info.getInfo());
    } catch (e) {
      console.error(`ApiController/get()`, e);

      return InfoMapper.of(
        GetResponseDto.Body,
        new GetInfo.Info().setFailure().getInfo(),
      );
    }
  }

  @Get('/all')
  async getAll() {
    try {
      const info = await this.templateService.getAll();
      return InfoMapper.of(GetResponseDto.Body, info.getInfo());
    } catch (e) {
      console.error(`ApiController/getAll()`, e);

      return InfoMapper.of(
        GetResponseDto.Body,
        new GetInfo.Info().setFailure().getInfo(),
      );
    }
  }
}
