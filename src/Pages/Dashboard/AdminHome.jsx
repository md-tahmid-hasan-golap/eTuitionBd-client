import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUsers, FaUserGraduate, FaBookOpen, FaMoneyBillWave, FaChartPie, FaChartBar } from "react-icons/fa";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from "recharts";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: analytics = {}, isPending: isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[600px]">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-orange-500"></span>
          <p className="text-slate-400 font-black animate-pulse">GENERATING ANALYTICS...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-red-100 dark:border-red-900/50 shadow-sm">
        <p className="text-red-500 text-xl font-bold italic">Failed to load admin statistics.</p>
      </div>
    );
  }

  const { roleData = [], revenueTrend = [], stats = {} } = analytics;

  const COLORS = ["#F97316", "#3B82F6", "#1E293B"]; // Orange, Blue, Dark

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 pb-20">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-[#0f172a] tracking-tight italic uppercase">
          Analytics <span className="text-orange-500">Dashboard</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Real-time platform performance and user distribution.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-orange-500/20 group hover:scale-[1.02] transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
              <FaMoneyBillWave />
            </div>
            <span className="text-orange-200 text-[10px] font-black uppercase tracking-[0.2em]">Total Revenue</span>
          </div>
          <h3 className="text-4xl font-black tabular-nums">{stats.totalRevenue || 0}</h3>
          <p className="text-orange-100 text-xs mt-2 font-bold opacity-80">Accumulated Earnings</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <FaUsers />
            </div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total Users</span>
          </div>
          <h3 className="text-4xl font-black text-[#0f172a] tabular-nums">{stats.totalUsers || 0}</h3>
          <p className="text-slate-400 text-xs mt-2 font-bold italic">Active Profiles</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 text-purple-500 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <FaUserGraduate />
            </div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Tutor Count</span>
          </div>
          <h3 className="text-4xl font-black text-[#0f172a] tabular-nums">{stats.tutorCount || 0}</h3>
          <p className="text-slate-400 text-xs mt-2 font-bold italic">Verified Tutors</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <FaBookOpen />
            </div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Tuitions</span>
          </div>
          <h3 className="text-4xl font-black text-[#0f172a] tabular-nums">{stats.totalTuitions || 0}</h3>
          <p className="text-slate-400 text-xs mt-2 font-bold italic">{stats.approvedTuitions} Approved</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <FaChartBar className="text-orange-500 text-xl" />
            <h3 className="text-xl font-black text-[#0f172a] uppercase tracking-tight">Revenue Trend</h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrend}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '1rem'}}
                  itemStyle={{fontWeight: 'black', color: '#0f172a'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#F97316" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <FaChartPie className="text-blue-500 text-xl" />
            <h3 className="text-xl font-black text-[#0f172a] uppercase tracking-tight">User Roles</h3>
          </div>
          <div className="h-[300px] w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  iconType="circle"
                  formatter={(value) => <span className="text-slate-500 dark:text-slate-400 font-bold text-xs uppercase tracking-widest">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-center">Platform Growth</p>
            <p className="text-[#0f172a] font-bold text-center text-sm">Balanced distribution of students and tutors.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
