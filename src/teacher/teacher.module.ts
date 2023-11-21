import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { AuthService } from 'src/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from 'src/config/jwt.strategy';
import { MediaService } from 'src/media/media.service';

@Module({
  controllers: [TeacherController],
  providers: [TeacherService, AuthService, JwtService, JwtStrategy, ConfigService, PrismaService, MediaService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ]
})
export class TeacherModule {}
