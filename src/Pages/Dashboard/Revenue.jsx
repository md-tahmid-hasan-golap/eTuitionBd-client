import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../firebase/AuthContext";
import {
  FaMoneyCheckAlt,
  FaWallet,
  FaCheckCircle,
  FaChartLine,
  FaExchangeAlt,
} from "react-icons/fa";

const Revenue = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // ── 1. Aggregated Stats (total earnings via MongoDB $group + $sum) ──
  const { data: stats = { totalRevenue: 0, totalTransactions: 0 }, isPending: statsLoading } = useQuery({
    queryKey: ["revenue-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/tutor/revenue-stats/${user?.email}`);
      return res.data;
    },
  });

  // ── 2. Individual transaction list ──
  const { data: payments = [], isPending: paymentsLoading, isError, refetch } = useQuery({
    queryKey: ["revenue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/tutor/revenue/${user?.email}`);
      return res.data;
    },
  });

  const isLoading = statsLoading || paymentsLoading;

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  const totalRevenue = stats?.totalRevenue || 0;
  const totalTransactions = stats?.totalTransactions || payments.length || 0;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight italic uppercase">
          Revenue <span className="text-blue-500">History</span>
        </h2>
        <p className="text-slate-500 font-medium mt-2">
          Track all your earnings from completed tuitions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Total Earnings Card */}
        <div className="md:col-span-2 bg-[#0f172a] text-white px-8 py-7 rounded-[2rem] flex items-center gap-6 shadow-xl">
          <div className="p-4 bg-white/10 rounded-2xl">
            <FaWallet className="text-4xl text-blue-400" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
              Total Earnings
            </p>
            <p className="text-4xl font-black">
              {totalRevenue.toLocaleString("en-BD", { maximumFractionDigits: 0 })}{" "}
              <span className="text-lg font-bold text-slate-400">BDT</span>
            </p>
            <p className="text-slate-500 text-xs font-medium mt-1">
              Calculated from all completed payments
            </p>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white border border-slate-100 shadow-sm px-8 py-7 rounded-[2rem] flex items-center gap-6">
          <div className="p-4 bg-blue-50 rounded-2xl">
            <FaExchangeAlt className="text-3xl text-blue-500" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
              Transactions
            </p>
            <p className="text-4xl font-black text-[#0f172a]">{totalTransactions}</p>
            <p className="text-slate-400 text-xs font-medium mt-1">Payments received</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      {isError ? (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-red-100 shadow-sm">
          <p className="text-red-500 text-xl font-bold italic">Failed to load revenue data.</p>
          <button
            onClick={() => refetch()}
            className="btn btn-sm mt-4 bg-red-500 hover:bg-red-600 text-white rounded-xl border-none"
          >
            Retry
          </button>
        </div>
      ) : payments.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
          <FaMoneyCheckAlt className="mx-auto text-slate-200 text-7xl mb-6" />
          <h3 className="text-2xl font-black text-slate-400 uppercase italic">No earnings yet</h3>
          <p className="text-slate-400 mt-2 font-medium">
            Your payment history will appear here once you get paid.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-3">
            <FaChartLine className="text-blue-500" />
            <h3 className="font-black text-[#0f172a] uppercase tracking-widest text-sm">
              Transaction Breakdown
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest font-black">
                <tr>
                  <th className="py-5 px-6">#</th>
                  <th className="py-5 px-6">Transaction ID</th>
                  <th className="py-5 px-6">Student Email</th>
                  <th className="py-5 px-6">Amount</th>
                  <th className="py-5 px-6">Date</th>
                  <th className="py-5 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-slate-700">
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-5 px-6 text-slate-400 font-black">{index + 1}</td>
                    <td className="py-5 px-6 font-mono text-slate-400 text-xs">
                      {payment.transactionId || "—"}
                    </td>
                    <td className="py-5 px-6">
                      <span className="font-bold text-[#0f172a]">
                        {payment.studentEmail || payment.email || "—"}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-black text-blue-600">
                      {(parseFloat(payment.price) || 0).toLocaleString("en-BD", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      BDT
                    </td>
                    <td className="py-5 px-6 text-slate-500">
                      {payment.date
                        ? new Date(payment.date).toLocaleDateString("en-BD", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <FaCheckCircle /> Received
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Footer total row */}
              <tfoot className="bg-slate-50">
                <tr>
                  <td colSpan={3} className="py-5 px-6 font-black text-slate-500 uppercase tracking-widest text-xs text-right">
                    Total
                  </td>
                  <td className="py-5 px-6 font-black text-[#0f172a] text-lg">
                    {totalRevenue.toLocaleString("en-BD", { maximumFractionDigits: 0 })} BDT
                  </td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Revenue;
