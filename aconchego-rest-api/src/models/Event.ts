import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  eventDate: Date;
  eventTime: string;
  image?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventTime: { type: String, required: true },
    image: { type: String },
    location: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
