import { IsString } from 'class-validator';

export class UpdateProfilePhoto {
  @IsString()
  photo: string;
}
