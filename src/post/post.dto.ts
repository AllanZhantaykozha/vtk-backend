import {IsOptional, IsString } from 'class-validator';

export class PostDto {
    @IsString()
    @IsOptional()
    title: string

    @IsOptional()
    @IsString()
    content: string
}