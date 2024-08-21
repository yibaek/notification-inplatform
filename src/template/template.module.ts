import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './interface/api.controller';
import { TemplateRepository } from './infrastructure/template.repository';
import { TemplateRepositoryImpl } from './infrastructure/template.repository.impl';
import { TemplateEntityMongo } from './infrastructure/entity/template.entity.mongo';
import { TemplateService } from './application/template.service';
import { TemplateServiceImpl } from './application/template.service.impl';
import { TemplateServiceInternal } from './application/internal/template.service.internal';
import { TemplateServiceImplInternal } from './application/internal/template.service.impl.internal';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntityMongo], 'default.mongo')],
  providers: [
    { provide: TemplateService, useClass: TemplateServiceImpl },
    {
      provide: TemplateRepository,
      useClass: TemplateRepositoryImpl,
    },
    {
      provide: TemplateServiceInternal,
      useClass: TemplateServiceImplInternal,
    },
  ],
  exports: [
    {
      provide: TemplateServiceInternal,
      useClass: TemplateServiceImplInternal,
    },
  ],
  controllers: [ApiController],
})
export class TemplateModule {}
