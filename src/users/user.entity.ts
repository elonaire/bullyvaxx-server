import { Table, Column, Model, ForeignKey, BelongsToMany, IsEmail, AllowNull } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  username: string;

  @Column({primaryKey: true})
  user_id: string;

  @AllowNull(true)
  @Column
  first_name: string;

  @AllowNull(true)
  @Column
  middle_name: string;

  @AllowNull(true)
  @Column
  last_name: string;

  @AllowNull(true)
  @Column
  dob: string;

  @AllowNull(true)
  @Column
  phone: string;

  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @AllowNull(true)
  @Column
  gender: string;

  @AllowNull(false)
  @Column
  state: string;

  @AllowNull(false)
  @Column
  county: string;

  @AllowNull(false)
  @Column
  password: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

}

@Table
export class Role extends Model<Role> {

  @Column({primaryKey: true})
  role_id: string;

  @AllowNull(false)
  @Column
  @ApiProperty()
  role: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];

}

@Table
export class UserRole extends Model<UserRole> {

  @ForeignKey(() => User)
  @Column
  user_id: string;

  @ForeignKey(() => Role)
  @Column
  role_id: string;

  @AllowNull(false)
  @Column
  isPrimary: boolean;

}

export class UserResponse {
  @ApiProperty()
  username: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;
}

export class UserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  county: string;

  @ApiProperty()
  password: string;
}

export class UserUpdateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  user_id: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  password: string;
}

export class UserRoleDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  role: string;
}

export class RoleDto {
  @ApiProperty()
  role: string;
}