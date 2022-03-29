import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & Document;

export type ToDoType = {
  id: Types.ObjectId;
  title: string;
  content: string;
  done: boolean;
  date: Date;
};
@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: [] })
  todolist: ToDoType[];
}

export const UserSchema = SchemaFactory.createForClass(User);
