import mongoose, { Schema, Document } from 'mongoose';

interface IFlight extends Document {
  From: string;
  To: string;
  date: Date;
}

const FlightSchema = new Schema({
  From: { type: String, required: true },
  To: { type: String, required: true },
  date: { type: Date, required: true },
});

const Flight = mongoose.models.flights ||  mongoose.model<IFlight>('flights', FlightSchema);


export default Flight;