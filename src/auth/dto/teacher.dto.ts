import { IsString } from "class-validator"

export class TeacherDto {
    @IsString()
    login: string

    @IsString()
    password: string
}