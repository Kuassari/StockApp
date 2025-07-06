import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ default: Date.now })
  addedAt: Date;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);