import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TeacherDto } from './dto/teacher.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: TeacherDto) {
    return this.authService.login(dto);
  }

  @HttpCode(200)
  @Post('login/access-token')
  @UsePipes(new ValidationPipe())
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.getNewTokens(dto.refreshToken);
  }

  @HttpCode(200)
  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async deleteTeacher(@Body() dto: DeleteDto) {
    return this.authService.deleteTeacher(dto.login);
  }
}
