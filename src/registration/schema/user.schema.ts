import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ToDo } from "src/todo/schemas/todo.schema";

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    password: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'todo'})
    todolist: ToDo[]

}

export const UserSchema = SchemaFactory.createForClass(User)