import { BadRequestException, Injectable } from '@nestjs/common';
import { MediaService } from 'src/media/media.service';
import { PrismaService } from 'src/prisma.service';
import { PostDto } from './post.dto';
import { DeleteDto } from './dto/delete.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
  ) {}

  async create(dto: PostDto, id: number, photo?: any) {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        photos: [photo ? await this.mediaService.createFile(photo) : null],
        teacherId: +id,
      },
    });

    return post;
  }

  async update(dto: PostDto, teacherId: number, id: number, photo?: any) {
    const isExist = await this.prisma.post.findUnique({
      where: { id: +id },
    });

    if (!isExist || isExist.teacherId !== +teacherId)
      throw new BadRequestException('Post is not exists or you cannot edit');

    const post = await this.prisma.post.update({
      where: { id: isExist.id },
      data: {
        title: dto.title,
        content: dto.content,
        photos: [...isExist.photos, await this.mediaService.createFile(photo)],
      },
    });

    return post;
  }

  async delete(teacherId: number, id: DeleteDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: +id.id, teacherId: +teacherId },
    });
    if (!post) throw new BadRequestException('You don not have this post');
    await this.prisma.post.delete({ where: { id: post.id } });
  }

  async getAll() {
    const post = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        photos: true,
        teacher: true,
      },
    });

    if (!post) throw new BadRequestException('Not categories');

    return post;
  }

  async byId(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: +id },
      select: {
        id: true,
        title: true,
        content: true,
        photos: true,
        teacher: true,
      },
    });

    if (!post) throw new BadRequestException('Post or Teacher not exists');

    return post;
  }

  //   async getAllCategories() {
  //     const categories = await this.prisma.post.findMany({
  //       select: {
  //         id: true,
  //         title: true,
  //         content: true,
  //         photos: true,
  //         teacher: true,
  //       },
  //     });

  //     return categories
  //   }
}
