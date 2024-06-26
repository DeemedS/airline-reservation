import mongoose, { Schema, Document } from 'mongoose';

interface IBookFlight extends Document {
    departureFlightId: string;
    returnFlightId: string;
    seatCode: string;
    bookedDate: Date;
    userID: string;
    guestInfo: {
        firstName: string,
        lastName: string,
        middleName: string,
        birthday: string,
        age: string,
        nationality: string,
        gender: string,
        email: string,
        phone: string, 
        secondaryPhone: string,
        addressline1: string,
        addressline2: string,
        city: string,
        region: string,
        zip: string,},
    bookingData: {
        selectedPackage: string,
        packageCost: number,
        referenceNumber: string,
    },
    };

const BookFlightSchema = new Schema({
    departureFlightId: { type: String, required: true },
    returnFlightId: { type: String},
    seatCode: {type: String, required: true },
    bookedDate: { type: Date, default: Date.now},
    userID: { type: String },
    guestInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String},
        birthday: { type: String, required: true },
        age: { type: String, required: true },
        nationality: { type: String, required: true },
        gender: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        secondaryPhone: { type: String},
        addressline1: { type: String, required: true },
        addressline2: { type: String},
        city: { type: String, required: true },
        region: { type: String, required: true },
        zip: { type: String, required: true },
    },
    bookingData: {
        selectedPackage: { type: String, required: true },
        packageCost: { type: Number, required: true },
        referenceNumber: { type: String, required: true },
    },
    paymentStatus: { type: String, default: 'pending' },
});

const BookFlight = mongoose.models.bookflights ||  mongoose.model<IBookFlight>('bookflights', BookFlightSchema);


export default BookFlight;