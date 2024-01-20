import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { Permission, PermissionSchema } from 'src/permissions/schemas/permission.schema';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService, UsersService],
  imports: [MongooseModule.forFeature([
    { name: Role.name, schema: RoleSchema },
    { name: User.name, schema: UserSchema },
    { name: Permission.name, schema: PermissionSchema },
  ])]
})
export class DatabaseModule { }
