import { Types } from 'mongoose';

export default class UpdateToDoDto {
  id: string;
  title: string | undefined;
  content: string | undefined;
  done: boolean | undefined;
  date: Date;
}
