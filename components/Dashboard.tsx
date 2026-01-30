
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';
import { AppState } from '../types';
import { DollarSign, TrendingUp, Wallet, Percent, MousePointer2, Target, RefreshCw, Zap, Skull, CheckCircle2, AlertCircle } from 'lucide-react';

interface DashboardProps {
  state: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const hasData = state.campaigns.length > 0;

  const totalSpend = state.campaigns.reduce((sum, c) => sum + c.spend, 0);
  const totalRevenue = state.products.reduce((sum, p) => sum + p.revenue, 0);
  const totalClicks = state.campaigns.reduce((sum, c) => sum + (c.clicks || 0), 0);
  const totalImpressions = state.campaigns.reduce((sum, c) => sum + (c.impressions || 0), 0);
  const totalConversions = state.campaigns.reduce((sum, c) => sum + (c.conversions || 0), 0);
  
  const totalProfit = totalRevenue - totalSpend;
  const roas = totalSpend > 0 ? (totalRevenue / totalSpend).toFixed(2) : '0';
  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0';
  const cpc = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : '0';
  const cpa = totalConversions > 0 ? (totalSpend / totalConversions).toFixed(2) : '0';

  const mainMetrics = [
    { label: 'ROAS Global', value: `${roas}x`, icon: Target, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'CTR Médio', value: `${ctr}%`, icon: MousePointer2, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { label: 'CPC Médio', value: `R$ ${cpc}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'CPA Médio', value: `R$ ${cpa}`, icon: Zap, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  const CHART_COLORS = ['#a855f7', '#06b6d4', '#10b981', '#f43f5e', '#f59e0b'];

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {showToast && (
        <div className="fixed top-24 right-10 z-50 animate-fadeIn">
          <div className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 shadow-2xl shadow-emerald-500/20 border border-emerald-400">
            <CheckCircle2 size={18} />
            Nodes Sincronizados com Sucesso
          </div>
        </div>
      )}

      {isSyncing && (
        <div className="absolute top-[-40px] left-0 w-full h-1 bg-slate-900 overflow-hidden rounded-full">
          <div className="h-full bg-purple-600 animate-[syncProgress_1.5s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Central de Comando</h2>
          <p className="text-slate-500 font-medium">Banda Carniçal | Inteligência de Tráfego</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold shadow-lg shadow-purple-600/30 ${
            isSyncing ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Sincronizando...' : 'Sincronizar Nodes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainMetrics.map((m, idx) => (
          <div key={idx} className={`bg-slate-900 p-6 rounded-2xl border ${m.border} shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${m.bg} ${m.color} group-hover:scale-110 transition-transform`}>
                <m.icon size={28} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{m.label}</p>
                <p className="text-2xl font-black text-white">{m.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl min-h-[400px]">
          <h3 className="text-lg font-black text-white uppercase mb-8 flex items-center gap-2">
            <Zap size={20} className="text-purple-500" />
            Vetor de Conversão
          </h3>
          <div className="h-80 relative">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={state.campaigns}>
                  <defs>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', color: '#f8fafc' }}
                  />
                  <Area type="monotone" dataKey="clicks" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                  <Area type="monotone" dataKey="conversions" stroke="#06b6d4" strokeWidth={3} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 italic font-black uppercase text-xs tracking-[0.3em]">
                <AlertCircle className="mb-4 opacity-20" size={48} />
                Aguardando Ingestão de Dados
              </div>
            )}
          </div>
        </div>

        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl">
          <h3 className="text-lg font-black text-white uppercase mb-8">Fontes de Energia</h3>
          <div className="h-80 relative">
            {hasData ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Facebook', value: state.campaigns.filter(c => c.platform === 'Facebook').reduce((s, c) => s + c.spend, 0) },
                      { name: 'Google', value: state.campaigns.filter(c => c.platform === 'Google').reduce((s, c) => s + c.spend, 0) },
                      { name: 'Instagram', value: state.campaigns.filter(c => c.platform === 'Instagram').reduce((s, c) => s + c.spend, 0) },
                      { name: 'TikTok', value: state.campaigns.filter(c => c.platform === 'TikTok').reduce((s, c) => s + c.spend, 0) },
                    ].filter(d => d.value > 0)}
                    cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={10} dataKey="value"
                  >
                    {[0,1,2,3].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-800 font-black uppercase text-[10px] tracking-widest">
                Sem Campanhas Ativas
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-950 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-purple-300 font-bold uppercase tracking-widest text-xs mb-4">Faturamento Bruto Acumulado</p>
            <h3 className="text-5xl font-black tracking-tighter">R$ {totalRevenue.toLocaleString()}</h3>
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-purple-300 uppercase font-black tracking-widest mb-1">Lucro Real</p>
                <p className="text-2xl font-black">R$ {totalProfit.toLocaleString()}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-purple-300 uppercase font-black tracking-widest mb-1">Gasto Ads</p>
                <p className="text-2xl font-black text-rose-400">R$ {totalSpend.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <TrendingUp className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
        
        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
          <h3 className="font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-2">
            <Skull size={20} className="text-slate-500" />
            Análise de Vitalidade
          </h3>
          <div className="space-y-8 mt-4">
             <div>
                <div className="flex justify-between text-xs font-black uppercase mb-3">
                   <span className="text-slate-500">Taxa de Conversão</span>
                   <span className="text-purple-400">{totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : 0}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                   <div className="bg-purple-500 h-full rounded-full neon-border shadow-[0_0_10px_#a855f7]" style={{ width: `${hasData ? Math.min(100, (totalConversions / (totalClicks || 1)) * 500) : 0}%` }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-xs font-black uppercase mb-3">
                   <span className="text-slate-500">Performance de Clique (CTR)</span>
                   <span className="text-cyan-400">{ctr}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                   <div className="bg-cyan-500 h-full rounded-full neon-border shadow-[0_0_10px_#06b6d4]" style={{ width: `${hasData ? Math.min(100, Number(ctr) * 10) : 0}%` }}></div>
                </div>
             </div>
             <div>
                <div className="flex justify-between text-xs font-black uppercase mb-3">
                   <span className="text-slate-500">Margem Operacional</span>
                   <span className="text-emerald-400">{totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(2) : 0}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full rounded-full neon-border shadow-[0_0_10px_#10b981]" style={{ width: `${totalRevenue > 0 ? Math.max(0, (totalProfit / (totalRevenue || 1)) * 100) : 0}%` }}></div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes syncProgress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
