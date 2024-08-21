import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { BaseEntity, TMutable } from '../../../common/entity/base.entity';

@Entity('notification_inplatform_template')
export class TemplateEntityMongo extends BaseEntity<TemplateEntityMongo> {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsString()
  key: string;

  @Column()
  @IsString()
  category: string;

  @Column()
  @IsString()
  subject: string;

  @Column()
  @IsString()
  text: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @DeleteDateColumn()
  deleted_date: Date;

  static of(props: TMutable<TemplateEntityMongo>) {
    const _this = new this();
    _this.mutable(props);
    return _this;
  }

  update(
    props: TMutable<
      Omit<
        TemplateEntityMongo,
        '_id' | 'key' | 'created_date' | 'updated_date' | 'deleted_date'
      >
    >,
  ) {
    this.mutableForUpdate(props);
  }
}
