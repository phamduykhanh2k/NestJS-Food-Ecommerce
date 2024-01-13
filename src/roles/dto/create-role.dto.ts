import { IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsString } from "class-validator"
import mongoose from "mongoose"

export class CreateRoleDto {
    @IsString({ message: 'Tên Role phải thuộc kiểu String' })
    @IsNotEmpty({ message: 'Tên Role không được bỏ trống' })
    name: string

    @IsString({ message: 'Description phải thuộc kiểu String' })
    description: string

    @IsBoolean({ message: 'Trạng thái phải là kiểu Boolean' })
    @IsNotEmpty({ message: 'Trạng thái không được bỏ trống' })
    isActive: boolean

    @IsArray({ message: 'Permissions phải là kiểu Array' })
    @IsMongoId({ each: true, message: 'Permission phải là kiểu ObjectId' })
    @IsNotEmpty({ message: 'Permission không được bỏ trống' })
    permissions: mongoose.Schema.Types.ObjectId[]
}