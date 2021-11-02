import { ApiProperty } from '@nestjs/swagger';
import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Content extends Model<Content> {
  @Column({ primaryKey: true })
  content_id: string;

  @AllowNull(false)
  @Column
  tab: string;

  @AllowNull(false)
  @Column
  content: string;
}

export class ContentDto {
  content_id: string;

  @ApiProperty()
  tab: string;

  @ApiProperty()
  content: string;
}
