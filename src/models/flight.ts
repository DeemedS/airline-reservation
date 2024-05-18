import mongoose, { Schema, Document } from 'mongoose';

interface IFlight extends Document {
  from: string;
  to: string;
  date: Date;
  arrival: Date;
  departure: Date;
  code: string;
  fare: number;
}

const FlightSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  arrival: { type: Date, required: true },
  departure: { type: Date, required: true },
  code: { type: String, required: true },
  fare: { type: Number, required: true },
});

const Flight = mongoose.models.flights ||  mongoose.model<IFlight>('flights', FlightSchema);


export default Flight;