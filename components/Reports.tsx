
import React, { useState } from 'react';
import { AppState, Period } from '../types';
import { Download, Filter, FileText, TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ReportsProps {
  state: AppState;
}

const Reports: React.FC<ReportsProps> = ({ state }) => {
  const [period, setPeriod] = useState<Period>('month');

  // Dados simulados de série temporal baseados no período
  const timeData = [
    { name: 'Sem. 01', investido: 1200, faturamento: 3000, lucro: 1800 },
    { name: 'Sem. 02', investido: 1500, faturamento: 5200, lucro: 3700 },
    { name: 'Sem. 03', investido: 1100, faturamento: 4100, lucro: 3000 },
    { name: 'Sem. 04', investido: 1800, faturamento: 6800, lucro: 5000 },
  ];

  // Criando cópias seguras para evitar mutação do estado original
  const topProducts = [...state.products]
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 5);

  const topCampaigns = [...state.campaigns]
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header do Relatório */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <BarChart3 className="text-purple-500" size={32} />
            Inteligência Analítica
          </h2>
          <p className="text-slate-500 font-medium italic">Deep analysis de performance e yield operacional.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm flex">
            {(['day', 'month', 'year'] as Period[]).map((p) => (
              <button 
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
                  period === p ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {p === 'day' ? 'Diário' : p === 'month' ? 'Mensal' : 'Anual'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-2xl hover:bg-slate-700 transition-all font-black uppercase text-xs tracking-widest border border-slate-700 shadow-xl">
            <Download size={18} />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Gráfico Principal de Crescimento */}
      <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-lg font-black text-white uppercase flex items-center gap-3">
            <Activity className="text-emerald-400" size={20} />
            Curva de Yield vs Investimento
          </h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase">Faturamento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase">Investido</span>
            </div>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeData}>
              <defs>
                <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis 
                dataKey="name" 
                stroke="#475569" 
                fontSize={10} 
                fontWeight="900" 
                axisLine={false} 
                tickLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={10} 
                fontWeight="900" 
                axisLine={false} 
                tickLine={false} 
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid #334155', color: '#f8fafc', fontWeight: 'bold' }}
                itemStyle={{ fontSize: '12px', textTransform: 'uppercase' }}
              />
              <Area type="monotone" dataKey="faturamento" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#colorFat)" />
              <Area type="monotone" dataKey="investido" stroke="#f43f5e" strokeWidth={2} strokeDasharray="8 4" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Listagens de Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Produtos */}
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
          <h4 className="font-black text-white uppercase text-sm mb-6 flex items-center gap-3">
            <PieChartIcon size={18} className="text-purple-500" />
            Vendas por Node (Produto)
          </h4>
          <div className="space-y-3">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl group hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-700">0{idx + 1}</span>
                  <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{p.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">{p.quantitySold} <span className="text-[10px] text-slate-500 uppercase">Unid.</span></p>
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">R$ {p.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maiores Gastos */}
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
          <h4 className="font-black text-white uppercase text-sm mb-6 flex items-center gap-3">
            <TrendingDown size={18} className="text-rose-500" />
            Dreno de Capital (Campanhas)
          </h4>
          <div className="space-y-3">
            {topCampaigns.map((c, idx) => (
              <div key={c.id} className="flex items-center justify-between p-5 bg-slate-950/50 border border-slate-800/50 rounded-2xl group hover:border-rose-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className={`w-2 h-2 rounded-full ${c.status === 'active' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                  <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{c.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-rose-400">R$ {c.spend.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{c.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer do Relatório */}
      <div className="p-8 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-[2rem] border border-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-600 rounded-2xl text-white shadow-lg shadow-purple-600/20">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-white font-black uppercase text-sm tracking-tight">Relatório de Consistência</p>
            <p className="text-slate-500 text-xs font-medium">Última atualização: {new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center px-6">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Taxa de Queima</p>
            <p className="text-xl font-black text-rose-400">R$ {(state.campaigns.reduce((s,c) => s+c.spend, 0) / 30).toFixed(2)}/dia</p>
          </div>
          <div className="w-px h-10 bg-slate-800 hidden md:block" />
          <div className="text-center px-6">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Eficiência Média</p>
            <p className="text-xl font-black text-emerald-400">88.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
