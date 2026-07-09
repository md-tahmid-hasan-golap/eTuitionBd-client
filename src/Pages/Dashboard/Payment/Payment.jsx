import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: application, isLoading } = useQuery({
        queryKey: ['application', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/student/application/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <span className="loading loading-spinner loading-lg text-orange-500"></span>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                <h2 className="text-3xl font-black text-[#0f172a] mb-2 text-center">Secure Checkout</h2>
                <p className="text-slate-500 dark:text-slate-400 text-center mb-8 font-medium">
                    Payment for Tuition (ID: {application?.tuitionId})
                </p>

                {application?.expectedSalary ? (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm application={application} />
                    </Elements>
                ) : (
                    <p className="text-red-500 text-center font-bold">Invalid Application Details</p>
                )}
            </div>
        </div>
    );
};

export default Payment;
