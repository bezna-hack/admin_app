import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';

export type ProposalDocument = mongoose.HydratedDocument<Proposal>;

class Logging {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: User;

  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  date: Date;
}

@Schema()
export class Proposal {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  client: string;

  @Prop({ required: true })
  date: Date;

  @Prop()
  status: string;
  
  @Prop([String])
  checklist: string[];

  @Prop()
  checkpoint: string;

  @Prop()
  lead: string;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  lead_id: User;

  @Prop([String])
  files: string[];

  @Prop([String])
  client_emails: string[];

  @Prop({ type: mongoose.Schema.Types.Array})
  logging: Logging[];

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  // assignees: User[];

}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);