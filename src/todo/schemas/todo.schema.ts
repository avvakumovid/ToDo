import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type ToDoDocument = ToDo & Document

@Schema()
export class ToDo {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    content: string

    @Prop({ required: true, default: false })
    done: boolean
}

export const ToDoSchema = SchemaFactory.createForClass(ToDo)