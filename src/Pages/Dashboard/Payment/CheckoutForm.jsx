import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const CheckoutForm = ({ application }) => {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const price = application?.expectedSalary || 0;

    useEffect(() => {
        console.log('Payment Price:', price);
        if (price > 0) {
            const fetchSecret = async () => {
                try {
                    const res = await axiosSecure.post('/api/student/create-payment-intent', { price });
                    console.log('Client Secret Response:', res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                } catch (error) {
                    console.error('Payment Intent Fetch Error:', error.response || error);
                }
            };
            fetchSecret();
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        setProcessing(true);
        setError('');

        try {
            const { error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card,
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                setProcessing(false);
                return;
            }

            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: application?.studentEmail || user?.email,
                        name: user?.displayName || 'Student',
                    }
                }
            });

            if (confirmError) {
                console.error('Payment Confirmation Error:', confirmError);
                setError(confirmError.message);
                setProcessing(false);
            } else {
                if (paymentIntent.status === 'succeeded') {
                    const payment = {
                        studentEmail: application?.studentEmail || user?.email,
                        transactionId: paymentIntent.id,
                        price: price,
                        date: new Date(),
                        tuitionId: application?.tuitionId,
                        applicationId: application?._id,
                        tutorEmail: application?.tutorEmail,
                        status: 'paid'
                    };

                    // Save Payment History
                    await axiosSecure.post('/api/student/payments', payment);
                    
                    // Update Application Status
                    await axiosSecure.patch(`/api/student/application-status/${application._id}`, { status: 'Accepted' });
                    
                    // Update Tuition Status
                    await axiosSecure.patch(`/api/student/tuition-status/${application.tuitionId}`, { status: 'Filled' });

                    toast.success('Payment Successful! 🎉');
                    navigate('/dashboard/payments');
                }
                setProcessing(false);
            }
        } catch (err) {
            console.error('Unexpected Payment Error:', err);
            setError('An unexpected error occurred. Please try again.');
            setProcessing(false);
        }
    };

    console.log('Current Client Secret:', clientSecret);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Total Amount</span>
                    <span className="text-2xl font-black text-[#0f172a]">BDT {price}</span>
                </div>
                
                <div className="p-4 bg-white rounded-xl border border-slate-200">
                    <CardElement
                        onChange={(e) => {
                            setError(e.error ? e.error.message : "");
                        }}
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                    fontFamily: 'Inter, sans-serif',
                                },
                                invalid: {
                                    color: '#ef4444',
                                },
                            },
                        }}
                    />
                </div>
                {error && <p className="text-red-500 text-sm mt-3 ml-1 font-medium">{error}</p>}
            </div>

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="w-full bg-[#0f172a] hover:bg-orange-500 text-white font-black py-4 rounded-2xl shadow-xl transition-all uppercase tracking-widest text-sm disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {processing ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : (
                    <>
                        <FaLock /> Pay Securely
                    </>
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
