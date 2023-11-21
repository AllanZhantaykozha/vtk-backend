import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UpdateDto } from './dto/update.dto';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class TeacherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
    private readonly jwt: JwtService,
  ) {}

  async profile(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: +id },
      select: {
        id: true,
        login: true,
        firstname: true,
        secondname: true,
        surname: true,
        description: true,
        isAdmin: true,
        group: true,
        jobName: true,
        cellNumber: true,
        profilePhoto: true,
        photos: true,
        posts: true,
      },
    });

    if (!teacher) throw new BadRequestException('Teacher is not exists');

    return teacher;
  }

  async getAll() {
    const teachers = await this.prisma.teacher.findMany({
      select: {
        id: true,
        login: true,
        firstname: true,
        secondname: true,
        surname: true,
        description: true,
        group: true,
        jobName: true,
        profilePhoto: true,
        photos: true,
        posts: true,
      },
    });
    return teachers;
  }

  async getById(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: +id },
      select: {
        id: true,
        login: true,
        firstname: true,
        secondname: true,
        surname: true,
        description: true,
        group: true,
        jobName: true,
        cellNumber: true,
        profilePhoto: true,
        photos: true,
        posts: true,
      },
    });

    if (!teacher) throw new BadRequestException('Teacher is not exists');

    return teacher;
  }

  async update(dto: UpdateDto, id: number) {
    const teacher = await this.getById(id);

    if (!teacher) throw new BadRequestException('Teacher is not exists');

    await this.prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        firstname: dto.firstname,
        secondname: dto.secondname,
        surname: dto.surname,
        description: dto.description,
        group: dto.group,
        jobName: dto.jobName,
        cellNumber: [...teacher.cellNumber, dto.cellNumber],
      },
    });
  }

  async addPhoto(id: number, photo: any) {
    const teacher = await this.getById(id);

    if (!teacher) throw new BadRequestException('Teacher is not exists');

    await this.prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        photos: [...teacher.photos, await this.mediaService.createFile(photo)],
      },
    });
  }

  async updateProfilePhoto(id: number, photo: any) {
    const teacher = await this.getById(id);

    if (!teacher) throw new BadRequestException('Teacher is not exists');

    const fileNameProfilePhoto = await this.mediaService.createFile(photo);

    await this.prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        profilePhoto: fileNameProfilePhoto,
      },
    });
  }

  //   async getCategoryByTitle(title: string, id: number) {
  //     const category = await this.prisma.category.findMany({where: {teacherId: +id, title}})

  //     if (!category) throw new BadRequestException('Not category')

  //     return category
  //   }
}
