
import React, { useState } from 'react';
import { Target, Save, ExternalLink, Database, CheckCircle2, Trash2, AlertTriangle, RefreshCcw } from 'lucide-react';

interface SettingsProps {
  pixelId: string;
  setPixelId: (id: string) => void;
  onClearAll: () => void;
}

const Settings: React.FC<SettingsProps> = ({ pixelId, setPixelId, onClearAll }) => {
  const [tempId, setTempId] = useState(pixelId);
  const [isSaved, setIsSaved] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSave = () => {
    setPixelId(tempId);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFullReset = () => {
    onClearAll();
    setShowConfirmReset(false);
    alert("Sistema purgado com sucesso. Todos os dados pré-definidos foram removidos.");
  };

  return (
    <div className="max-w-4xl space-y-10 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Configurações de Núcleo</h2>
          <p className="text-slate-500 font-medium italic">Vincule as engrenagens externas do ecossistema Carniçal.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl transition-all font-black uppercase text-xs tracking-widest shadow-2xl ${
            isSaved ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-600/20'
          }`}
        >
          {isSaved ? <><CheckCircle2 size={18} /> Protocolo Salvo</> : <><Save size={18} /> Aplicar Mudanças</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Bloco de Tracking */}
        <div className="bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6">
          <div className="flex items-center gap-4 text-purple-400 mb-4">
            <Target size={28} />
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Meta Pixel Node</h3>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">ID Global de Rastreio</label>
            <input 
              type="text" 
              placeholder="Ex: 123456789012345"
              className="w-full px-6 py-5 bg-slate-950 border border-slate-800 rounded-2xl text-purple-400 focus:ring-2 focus:ring-purple-600 outline-none transition-all font-mono"
              value={tempId}
              onChange={(e) => setTempId(e.target.value)}
            />
          </div>
        </div>

        {/* Zona de Extermínio - DELETE ALL */}
        <div className="bg-rose-500/5 p-10 rounded-[2.5rem] border border-rose-500/20 shadow-2xl space-y-6">
          <div className="flex items-center gap-4 text-rose-500 mb-4">
            <Trash2 size={28} />
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Zona de Extermínio</h3>
          </div>
          
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            Use esta função para remover <span className="text-rose-400 font-black italic underline">TODOS</span> os dados pré-definidos, incluindo campanhas, produtos e histórico de relatórios. Esta ação não pode ser desfeita.
          </p>

          {!showConfirmReset ? (
            <button 
              onClick={() => setShowConfirmReset(true)}
              className="flex items-center gap-3 px-8 py-4 bg-rose-600/10 border border-rose-600/30 text-rose-500 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-lg"
            >
              <RefreshCcw size={18} /> Purgar Banco de Dados
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-rose-600 rounded-3xl animate-fadeIn">
              <div className="flex items-center gap-3 text-white">
                <AlertTriangle size={24} />
                <span className="font-black uppercase text-xs tracking-tighter">Confirmar Destruição Total?</span>
              </div>
              <div className="flex gap-2 ml-auto">
                <button 
                  onClick={() => setShowConfirmReset(false)}
                  className="px-6 py-2 bg-white/10 text-white rounded-xl font-bold text-xs uppercase hover:bg-white/20 transition-all"
                >
                  Abortar
                </button>
                <button 
                  onClick={handleFullReset}
                  className="px-6 py-2 bg-white text-rose-600 rounded-xl font-black text-xs uppercase hover:bg-rose-50 transition-all shadow-xl"
                >
                  Confirmar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cloud Status */}
      <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 border-dashed space-y-8">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-500/20">
                 <Database size={24} />
              </div>
              <div>
                 <h4 className="text-white font-black uppercase text-sm tracking-widest italic">Banco de Dados Firestore</h4>
                 <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest mt-1">Status: Conectado (Mock Mode)</p>
              </div>
           </div>
        </div>
        
        <div className="p-8 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
           <p className="text-slate-400 text-xs font-medium leading-relaxed italic">
            "Ao purgar os dados, o dashboard ficará zerado, pronto para receber suas informações reais do Facebook Ads, Google Ads e WhatsApp Sync."
           </p>
           <a 
            href="https://firebase.google.com/docs/hosting" 
            target="_blank" 
            className="inline-flex items-center gap-2 text-purple-400 text-[10px] font-black uppercase tracking-widest hover:underline"
           >
            Manual de Deploy <ExternalLink size={12} />
           </a>
        </div>
      </div>
    </div>
  );
};

export default Settings;
