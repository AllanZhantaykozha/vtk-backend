import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path';
import { MediaController } from './media.controller';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService]
})
export class MediaModule {}
