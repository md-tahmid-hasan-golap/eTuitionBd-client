import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../firebase/AuthContext";
import { FaFileInvoiceDollar, FaCheckCircle } from "react-icons/fa";

const Payments = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending: isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/student/payments/${user?.email}`);
      console.log('Fetched Payments:', res.data);
      return res.data;
    },
  });

  if (isLoading && user?.email) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-[#0f172a] italic uppercase tracking-tighter">
          Payment <span className="text-orange-500">History</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">View all your successful transactions.</p>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 p-20 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700 text-center">
          <FaFileInvoiceDollar className="mx-auto text-slate-200 text-7xl mb-6" />
          <h3 className="text-2xl font-black text-slate-400 uppercase italic">No Payments Found</h3>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest font-black">
                <tr>
                  <th className="py-5 px-6">Transaction ID</th>
                  <th className="py-5 px-6">Tutor Info</th>
                  <th className="py-5 px-6">Amount</th>
                  <th className="py-5 px-6">Date</th>
                  <th className="py-5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {payments.map((payment) => (
                  <tr key={payment._id} className="border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800 transition-colors">
                    <td className="py-5 px-6 font-mono text-slate-400">{payment.transactionId}</td>
                    <td className="py-5 px-6">
                      <span className="font-bold text-[#0f172a]">{payment.tutorEmail}</span>
                    </td>
                    <td className="py-5 px-6 font-black text-emerald-600">
                      {payment.price} BDT
                    </td>
                    <td className="py-5 px-6 text-slate-500 dark:text-slate-400">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <FaCheckCircle /> Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
