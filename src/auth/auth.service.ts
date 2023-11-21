import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { TeacherDto } from './dto/teacher.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

    // Создание админа 

    async createAdmin() {
        const isExist = await this.prisma.teacher.findUnique({where: {id: 1, isAdmin: true}})
        
        if (isExist) return

        const admin = await this.prisma.teacher.create({
            data: {
                login: this.configService.get('ADMIN_LOGIN'),
                password: await hash(this.configService.get('ADMIN_PASSWORD')),
                isAdmin: true
            }
        })

        const tokens = await this.issueTokens(admin.id)
      

        return {
            ...tokens
        }
    }

    // Создание учителя 

    async createTeacher(dto: TeacherDto) {
        const isExist = await this.prisma.teacher.findUnique({where: {login: dto.login}})
        
        if (isExist) throw new BadRequestException('Teacher already exists')

        const teacher = await this.prisma.teacher.create({
            data: {
                login: dto.login,
                password: await hash(dto.password)
            }
        })
        
        const tokens = await this.issueTokens(teacher.id)

        return {teacher: {...teacher}, ...tokens};
    }

    // Удаление учителя

    async deleteTeacher(login: string) {
      const isExist = await this.prisma.teacher.findUnique({where: {login}})
        
        if (!isExist) throw new BadRequestException('Teacher is not exists')

        const teacher = await this.prisma.teacher.delete({where: {login}})

        return teacher;
    }


    // Вход 

    async login(dto: TeacherDto) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { login: dto.login },
          });
      
          if (!teacher) throw new UnauthorizedException('Invalid login or password');
      
          const isValidPassword = await verify(teacher.password, dto.password);
      
          if (!isValidPassword)
            throw new UnauthorizedException('Invalid login or password');
      
          const tokens = await this.issueTokens(teacher.id);
      
          return {teacher: {...teacher}, ...tokens};
    }

    // Создание токенов 

    async getNewTokens(refreshToken: string) {
      const result = await this.jwt.verifyAsync(refreshToken)
      if(!result) throw new UnauthorizedException('Invalid Refresh Token')

      const teacher = await this.prisma.teacher.findUnique({where: {
        id: result.id
      }})

      const tokens = await this.issueTokens(teacher.id)

      return {
        ...tokens
      }
    }

    private async issueTokens(userId: number) {
        const data = { id: userId };
    
        const accessToken = this.jwt.sign(data, {
          expiresIn: '1h',
        });
    
        const refreshToken = this.jwt.sign(data, {
          expiresIn: '7d',
        });
    
        return { accessToken, refreshToken };
      }
}
