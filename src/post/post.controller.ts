import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { CurrentTeacher } from 'src/auth/decorator/teacher.decorator';
import { PostDto } from './post.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Auth()
  @Delete()
  @HttpCode(200)
  async delete(@Body() postId: DeleteDto, @CurrentTeacher('id') id: number) {
    return this.postService.delete(id, postId);
  }

  @Auth()
  @Post('')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() dto: PostDto,
    @CurrentTeacher('id') id: number,
    @UploadedFile() photo: any,
  ) {
    return this.postService.create(dto, id, photo);
  }

  @Get('')
  @HttpCode(200)
  async getAll() {
    return this.postService.getAll();
  }

  @Auth()
  @Put('update/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Body() dto: PostDto,
    @CurrentTeacher('id') teacherId: number,
    @UploadedFile() photo: any,
    @Param('id') id: number,
  ) {
    return this.postService.update(dto, teacherId, id, photo);
  }

  @Get('id/:id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async byId(@Param('id') id: number) {
    return this.postService.byId(id);
  }

  // @Get('')
  // @HttpCode(200)
  // @UsePipes(new ValidationPipe())
  // async getCategoryById(@Param('id') id: number, @Param('categoryId') categoryId: number) {
  //   return this.postService.getCategoryById(id, categoryId);
  // }
}
