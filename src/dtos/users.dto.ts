import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  public phone_number: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public role: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public location: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public dealership_id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public sales_pitch: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public image: string;
}
