import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';
import {
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseEntity, TMutable } from '../../../common/entity/base.entity';

@Entity('notification_inplatform_history')
export class HistoryEntityMongo extends BaseEntity<HistoryEntityMongo> {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsObject()
  trace: Record<string, any>;

  @Column()
  @IsNumber()
  user_id: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  group_id: number;

  @Column()
  @IsString()
  category: string;

  @Column()
  @IsObject()
  message: Record<string, any>;

  @CreateDateColumn()
  created_date: Date;

  @Column({ nullable: true })
  @IsDate()
  @IsOptional()
  read_date: Date;

  static of(props: TMutable<HistoryEntityMongo>) {
    const _this = new this();

    _this.mutable({
      trace: props.trace,
      user_id: props.user_id,
      group_id: props.group_id,
      category: props.category,
      message: props.message,
    });

    return _this;
  }
}
