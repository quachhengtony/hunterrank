import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(4, 25)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 25)
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  username: string;
}
