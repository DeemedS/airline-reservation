"use client";
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import formatDate from '@/helpers/formatDate';



interface Payment {
    _id: string;
    bookingId: string;
    amount: string;
    reference: string;
    proofOfPayment: string;
    status: string;
    date: Date;
}

const page = () => {
    
        
    const Router = useRouter();
    const { paymentId } = useParams();

    const [saveLoading, setSaveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [payment , setPayment] = useState<Payment>({
        _id: '',
        bookingId: '',
        amount: '',
        reference: '',
        proofOfPayment: '',
        status: '',
        date: new Date()
    });


  const fetchPayment = async () => {
    try {
      const res = await axios.post("/api/admin/handlePayments", { paymentId });
      setPayment(res.data.payment);
    } catch (error) {
      console.log(error)
    }
  }


    

    useEffect(() => {
        fetchPayment();
    }, [])

    const handleEdit = (e : any) => {
        e.preventDefault();
        setSaveLoading(true);

        axios.put("/api/admin/handlePayments", payment)
        .then(res => {
            window.confirm('Would you like to save changes?');
            setSaveLoading(false);
            Router.push(`/admin/manage/manage-transactions`);
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleDelete = async (e : any, paymentId: string) => {
        try {
            e.preventDefault()
            setDeleteLoading(true);
            const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
            if (confirmDelete) {
                await axios.delete('/api/admin/handlePayments', {
                    data: { paymentId }
                });

                window.alert('Transaction deleted successfully');
            }
            Router.push(`/admin/manage/manage-transactions`);
        } catch (error) {
            console.log(error);
        } finally {
            setDeleteLoading(false);
        }
    };



    return (
        <div className="lg:ml-64 px-6 py-8 max-h-[100vh] overflow-y-scroll overflow-hidden">
        
        <form className="flex flex-col list-none justify-center p-10 rounded-lg bg-white mt-5">

            <h1 className="text-2xl font-semibold mb-3">Manage Transaction</h1>
            <h2 className="text-l">Reference ID: <span>{payment.reference}</span></h2>
            <h2 className="text-l">Amount: <span>{payment.amount}</span></h2>
            <h2 className="textt-l">Payment Date: <span>{formatDate(payment.date.toString())}</span></h2>
            
            <h2 className="text-l my-3">Proof of Payment:</h2>
            <div className="h-[70%] w-[70%]">
            <img src={'/payments/'+ payment.proofOfPayment} alt="" />
            </div>

            <h2 className="text-l">Status:</h2>
            <select className="w-[200px] mt-4 p-2 border border-gray-300 rounded-md" name="status" id="status"
            onChange={(e) => setPayment({...payment, status: e.target.value})} value={payment.status}
            >
                <option value="forVerification">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
            </select>





            <div className="flex flex-row gap-4 bottom-0 right-0 m-5 w-[50%]">
                <button
                    className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    onClick={handleEdit}>
                    {saveLoading ? "Pocessing..." : "Save Changes"}
                </button>

                <button
                    className="w-[50%] px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    onClick={(e) => handleDelete(e, payment._id)}>
                    {deleteLoading ? "Pocessing..." : "Delete Transaction"}
                </button>
            </div>

            </form> 

             </div>
    )                                    
}

export default page