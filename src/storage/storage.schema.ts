import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PortfolioFileDocument = HydratedDocument<PortfolioFile>;

@Schema()
export class PortfolioFile {
  @Prop({ unique: true, required: true })
  fileId: string;

  // @Prop({ required: true })
  // displayName: string;
}

export const PortfolioFileSchema = SchemaFactory.createForClass(PortfolioFile);