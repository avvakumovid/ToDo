import { Types } from 'mongoose';

export class UserDto {
  id: Types.ObjectId;
  username: string;
  password: string;
}
