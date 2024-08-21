import { Controller, Inject, Post, RawBodyRequest, Req } from '@nestjs/common';
import { InplatformService } from '../application/inplatform.service';
import { SaveCommandMapper } from '../application/command/save.command.mapper';
import { SaveCommand } from '../application/command/save.command';
import { SaveInfoMapper } from '../application/info/save.info.mapper';
import { SaveResponseDto } from './dto/save.response.dto';
import { SaveDtoMapper } from './dto/save.dto.mapper';
import { SaveRequestDto } from './dto/save.request.dto';
import { SaveInfo } from '../application/info/save.info';

@Controller('inplatform/api')
export class ApiController {
  constructor(
    @Inject(InplatformService)
    private readonly inplatformService: InplatformService,
  ) {}

  @Post()
  async save(@Req() req: RawBodyRequest<Request>) {
    try {
      const message = SaveDtoMapper.of(
        SaveRequestDto.Message,
        JSON.parse(req.rawBody.toString()),
      );

      const info = await this.inplatformService.save(
        SaveCommandMapper.of(SaveCommand.Message, message),
      );

      return SaveInfoMapper.of(SaveResponseDto.Body, info.getInfo());
    } catch (e) {
      console.error(`ApiController/save()`, e);
      return SaveInfoMapper.of(
        SaveResponseDto.Body,
        new SaveInfo.Info().setFailure().getInfo(),
      );
    }
  }
}
