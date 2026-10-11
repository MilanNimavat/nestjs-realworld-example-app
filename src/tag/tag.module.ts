import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { TagService } from './tag.service';
import { TagEntity } from './tag.entity';
import { TagController } from './tag.controller';
import { TagCacheService } from './tag-cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity]), UserModule],
  providers: [TagService,TagCacheService],
  controllers: [
    TagController
  ],
  exports: [TagService]
})
export class TagModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
  }
}
