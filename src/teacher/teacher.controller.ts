import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AuthService } from 'src/auth/auth.service';
import { TeacherDto } from 'src/auth/dto/teacher.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { UpdateDto } from './dto/update.dto';
import { CurrentTeacher } from 'src/auth/decorator/teacher.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from 'src/auth/decorator/admin.guard';

@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly authService: AuthService,
  ) {}

  // ADMIN CREATE A TEACHER

  @UseGuards(AdminGuard)
  @Auth()
  @HttpCode(200)
  @Post('create')
  @UsePipes(new ValidationPipe())
  async createTeacher(@Body() dto: TeacherDto) {
    return this.authService.createTeacher(dto);
  }

  // GET A TEACHER BY ID

  @Get('id/:id')
  @HttpCode(200)
  async getById(@Param('id') id: number) {
    return this.teacherService.getById(id);
  }

  // PROFILE

  @Auth()
  @Get('profile')
  @HttpCode(200)
  async profile(@CurrentTeacher('id') id: number) {
    return this.teacherService.profile(id);
  }

  // GET ALL

  @Get()
  @HttpCode(200)
  async getAll() {
    return this.teacherService.getAll();
  }

  // UPDATE A TEACHER

  @Auth()
  @Put('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async update(@Body() dto: UpdateDto, @CurrentTeacher('id') id: number) {
    return this.teacherService.update(dto, id);
  }

  // ADD PHOTOS TO PROFILE

  @Auth()
  @Put('add-photo')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo'))
  async addPhoto(@CurrentTeacher('id') id: number, @UploadedFile() photo: any) {
    return this.teacherService.addPhoto(id, photo);
  }

  // UPDATE PROFILE PHOTO

  @Auth()
  @Put('update-profile-photo')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo'))
  async updateProfilePhoto(
    @CurrentTeacher('id') id: number,
    @UploadedFile() photo: any,
  ) {
    return this.teacherService.updateProfilePhoto(id, photo);
  }
}
