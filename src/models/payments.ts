import mongoose, { Schema, Document } from 'mongoose';

interface IPayments extends Document {
    bookingId: string;
    amount: number;
    reference: string;
    proofOfPayment: string;
    status: string;
    date: Date;
}

const PaymentsSchema = new Schema({
    bookingId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    proofOfPayment: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Payments = mongoose.models.payments ||  mongoose.model<IPayments>('payments', PaymentsSchema);


export default Payments;