import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({ trim: true })
  avatarUrl: string;

  @Prop()
  bio: string;

  @Prop({ default: new Date().toISOString() })
  createdAt: Date;

  @Prop({ default: new Date().toISOString() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
