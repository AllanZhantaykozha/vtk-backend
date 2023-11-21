import { Module } from '@nestjs/common';
import { TeacherModule } from './teacher/teacher.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './config/jwt.strategy';
import { PrismaService } from './prisma.service';
import { MediaModule } from './media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostModule } from './post/post.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TeacherModule,
    AuthModule,
    MediaModule,
    PostModule
  ],
  controllers: [],
  providers: [PrismaService, JwtStrategy],
})
export class AppModule {}
