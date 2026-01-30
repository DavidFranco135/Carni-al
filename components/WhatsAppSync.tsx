
import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, Zap, Cloud, Terminal, ShieldCheck, 
  ChevronRight, Server, Globe, Database, Smartphone,
  Wifi, Activity, Radio
} from 'lucide-react';
import { Campaign } from '../types';
import { parseWhatsAppMessage } from '../services/gemini';

interface WhatsAppSyncProps {
  onDataReceived: (campaign: Campaign) => void;
}

const WhatsAppSync: React.FC<WhatsAppSyncProps> = ({ onDataReceived }) => {
  const [activeTab, setActiveTab] = useState<'sim' | 'guide' | 'webhook'>('sim');
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<{msg: string, type: 'success' | 'error' | 'info', time: string}[]>([]);

  const addLog = (msg: string, type: 'success' | 'error' | 'info') => {
    setLogs(prev => [{ msg, type, time: new Date().toLocaleTimeString() }, ...prev]);
  };

  const processPayload = async (text: string) => {
    setIsProcessing(true);
    addLog(`Iniciando análise via Motor de IA...`, 'info');

    const result = await parseWhatsAppMessage(text);

    if (result) {
      const newCamp: Campaign = {
        id: `WA-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
        name: `WA_${result.platform.toUpperCase()}_${new Date().getDate()}`,
        platform: result.platform,
        spend: result.spend,
        impressions: result.spend * 15,
        clicks: result.clicks || Math.floor(result.spend * 0.8),
        conversions: result.conversions || 0,
        status: 'active',
        date: result.date
      };
      
      onDataReceived(newCamp);
      addLog(`Métricas extraídas: R$ ${result.spend} no ${result.platform}. Transmissão OK.`, 'success');
      return true;
    }
    
    addLog('Erro: O Motor não conseguiu identificar valores válidos.', 'error');
    return false;
  };

  const handleManualTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    const success = await processPayload(input);
    if (success) setInput('');
    setIsProcessing(false);
  };

  // Simula um Webhook chegando do Render/Firebase
  const simulateWebhook = () => {
    addLog('SINAL EXTERNO DETECTADO: Origem Render-Server-Node-01', 'info');
    setTimeout(() => {
      processPayload("Relatório Automático: Gastei 1200 no TikTok hoje, 45 conversões.");
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3 italic">
            <Radio className="text-emerald-400 animate-pulse" size={32} />
            Nexus de Comunicação
          </h2>
          <p className="text-slate-500 font-medium">Gateway de entrada para inteligência de dados.</p>
        </div>
        
        <div className="flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm">
          {['sim', 'webhook', 'guide'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab === 'sim' ? 'Teste IA' : tab === 'webhook' ? 'Webhook Live' : 'Documentação'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'sim' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6">
            <div className="p-6 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                <span className="text-purple-400 font-black">ÁREA DE TESTE:</span> Use este campo para validar se a IA está interpretando suas mensagens corretamente antes de ligar o Webhook real.
              </p>
            </div>

            <form onSubmit={handleManualTest} className="space-y-4">
              <textarea 
                className="w-full p-7 bg-slate-950 border border-slate-800 rounded-[2rem] outline-none focus:ring-2 focus:ring-purple-600 text-white min-h-[160px] font-medium placeholder:text-slate-800 resize-none transition-all"
                placeholder="Ex: 'Fala David, bati 500 reais no Facebook e voltaram 12 vendas agora de manhã'"
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button 
                disabled={isProcessing}
                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
              >
                {isProcessing ? <Activity className="animate-spin" /> : <><Zap size={20} /> Processar Pulso</>}
              </button>
            </form>
          </div>

          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl flex flex-col h-[480px]">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex justify-between items-center">
              Monitor de Tráfego 
              <span className="flex items-center gap-1.5 text-emerald-500"><Wifi size={14} /> ONLINE</span>
            </h3>
            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar font-mono">
              {logs.length === 0 && <p className="text-center text-slate-700 font-bold mt-20 uppercase text-[10px] tracking-widest italic">Aguardando sinal...</p>}
              {logs.map((log, idx) => (
                <div key={idx} className={`p-4 rounded-xl border flex gap-4 items-start animate-fadeIn ${
                  log.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' :
                  log.type === 'error' ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' :
                  'bg-slate-950 border-slate-800 text-slate-400'
                }`}>
                  <p className="text-xs font-bold leading-tight flex-1">{log.msg}</p>
                  <span className="text-[10px] font-black opacity-30 whitespace-nowrap">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'webhook' && (
        <div className="max-w-4xl mx-auto space-y-8">
           <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-slate-800 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                 <Globe size={40} />
              </div>
              <h3 className="text-2xl font-black text-white uppercase italic">Status da Ponte Cloud</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">Sua instância no Render está aguardando pacotes. Use o simulador abaixo para testar a injeção remota.</p>
              
              <div className="bg-black/40 p-6 rounded-2xl border border-slate-800 inline-block text-left">
                 <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Endpoint de Escuta (Web):</p>
                 <code className="text-purple-400 text-xs font-mono">https://render-server-wa.onrender.com/webhook/carniçal</code>
              </div>

              <div className="pt-6">
                 <button 
                  onClick={simulateWebhook}
                  className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-3 mx-auto shadow-2xl"
                 >
                    <Smartphone size={20} /> Simular Webhook Externo
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: "Instale Evolution API", desc: "No seu Render, suba o Docker da Evolution para ler as mensagens do WhatsApp.", icon: Smartphone },
            { title: "Configure Webhook", desc: "No painel Evolution, aponte o Webhook para sua Firebase Cloud Function.", icon: Server },
            { title: "Script de IA", desc: "Sua função deve chamar o código de extração que criamos e salvar no Firestore.", icon: Zap },
            { title: "Atualização Viva", desc: "O portal detectará a mudança no banco de dados e atualizará o gráfico na hora.", icon: Activity }
          ].map((step, i) => (
            <div key={i} className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 flex gap-6">
               <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-purple-400 border border-slate-800">
                  <step.icon size={24} />
               </div>
               <div>
                  <h4 className="font-black text-white uppercase text-sm mb-1">0{i+1}. {step.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{step.desc}</p>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WhatsAppSync;
