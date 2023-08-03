import { IsString, IsOptional, IsNotEmpty } from "class-validator"

export class UserProfileDTO {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsOptional()
  @IsString()
  bio?: string

  @IsOptional()
  @IsString()
  twitterHandle?: string

  @IsOptional()
  @IsString()
  location?: string

  @IsOptional()
  @IsString()
  iNeedHelpWith?: string

  @IsOptional()
  @IsString()
  askMeAbout?: string
}
