import { IsNumber, IsString } from "class-validator";

export class DeleteDto {
    @IsString()
    login: string
}