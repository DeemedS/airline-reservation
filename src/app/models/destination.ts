import mongoose, { Schema, Document } from 'mongoose';

interface IDestinations extends Document {
  Name: string;
  Code: string;
  Abv: string;
  City: string;
}

const DestinationSchema = new Schema({
  Name: { type: String, required: true },
  Code: { type: String, required: true },
  Abv: { type: String, required: true },
  City: { type: String, required: true }
});

const Destinations = mongoose.models.destinations ||  mongoose.model<IDestinations>('destinations', DestinationSchema);


export default Destinations;