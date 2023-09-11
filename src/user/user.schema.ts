import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({required: true})
  email: string;
  
  @Prop({ required: true })
  status: string

  @Prop([String])
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);