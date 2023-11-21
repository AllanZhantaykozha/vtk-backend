import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ConfigService } from '@nestjs/config';
import { MediaService } from 'src/media/media.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, ConfigService, PrismaService, MediaService],
})
export class PostModule {}
