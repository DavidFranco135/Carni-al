
import React, { useState, useRef } from 'react';
import { Campaign } from '../types';
import { Plus, Search, Edit2, Trash2, Megaphone, Calendar, FileUp, Download, Eye, MousePointer2, Target } from 'lucide-react';

interface CampaignsProps {
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
}

const Campaigns: React.FC<CampaignsProps> = ({ campaigns, setCampaigns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<Campaign, 'id'>>({
    name: '',
    platform: 'Facebook',
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    status: 'active',
    date: new Date().toISOString().split('T')[0]
  });

  const filtered = campaigns.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? { ...c, ...formData } : c));
    } else {
      const newCampaign: Campaign = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setProductsBulk([newCampaign]);
    }
    setIsModalOpen(false);
    setEditingCampaign(null);
  };

  const setProductsBulk = (newOnes: Campaign[]) => {
    setCampaigns([...campaigns, ...newOnes]);
  }

  const handleDelete = (id: string) => {
    if (confirm('Excluir esta campanha?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
    }
  };

  const openEditModal = (camp: Campaign) => {
    setEditingCampaign(camp);
    setFormData({
      name: camp.name,
      platform: camp.platform,
      spend: camp.spend,
      impressions: camp.impressions || 0,
      clicks: camp.clicks || 0,
      conversions: camp.conversions || 0,
      status: camp.status,
      date: camp.date
    });
    setIsModalOpen(true);
  };

  // Simulação de Importação Automática de CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      // Simula o parse de um CSV simples: Nome, Plataforma, Gasto, Cliques, Conversoes
      const lines = text.split('\n').slice(1);
      const imported: Campaign[] = lines.map(line => {
        const [name, platform, spend, impressions, clicks, conversions] = line.split(',');
        if (!name) return null;
        return {
          id: Math.random().toString(36).substr(2, 9),
          name: name.trim(),
          platform: (platform?.trim() as any) || 'Facebook',
          spend: Number(spend) || 0,
          impressions: Number(impressions) || 0,
          clicks: Number(clicks) || 0,
          conversions: Number(conversions) || 0,
          status: 'active',
          date: new Date().toISOString().split('T')[0]
        } as Campaign;
      }).filter(x => x !== null) as Campaign[];
      
      setProductsBulk(imported);
      alert(`${imported.length} campanhas importadas com sucesso!`);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Nome,Plataforma,Gasto,Impressoes,Cliques,Conversoes\nCampanha Teste,Facebook,500,10000,250,15";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_campanhas.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerenciamento de Anúncios</h2>
          <p className="text-slate-500">Métricas completas importadas de suas fontes de tráfego.</p>
        </div>
        <div className="flex gap-2">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".csv" className="hidden" />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors font-semibold border border-slate-200"
          >
            <FileUp size={20} />
            Importar Planilha
          </button>
          <button 
            onClick={() => {
              setEditingCampaign(null);
              setFormData({ name: '', platform: 'Facebook', spend: 0, impressions: 0, clicks: 0, conversions: 0, status: 'active', date: new Date().toISOString().split('T')[0] });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-semibold shadow-sm"
          >
            <Plus size={20} />
            Nova Campanha
          </button>
        </div>
      </div>

      {/* Tabela Detalhada com Métricas Avançadas */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filtrar campanhas..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={downloadTemplate} className="text-xs text-indigo-600 flex items-center gap-1 hover:underline">
            <Download size={14} /> Baixar template CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Campanha</th>
                <th className="px-6 py-4">Plataforma</th>
                <th className="px-6 py-4">Gasto</th>
                <th className="px-6 py-4">CTR</th>
                <th className="px-6 py-4">CPC</th>
                <th className="px-6 py-4">CPA</th>
                <th className="px-6 py-4">ROAS</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => {
                const ctr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '0';
                const cpc = c.clicks > 0 ? (c.spend / c.clicks).toFixed(2) : '0';
                const cpa = c.conversions > 0 ? (c.spend / c.conversions).toFixed(2) : '0';
                // Calculando ROAS baseando-se em uma média fictícia se não houver produto vinculado, ou zero
                const roas = c.spend > 0 ? ( (c.conversions * 150) / c.spend ).toFixed(2) : '0'; // Ex: Ticket médio de 150

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-400">{new Date(c.date).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.platform === 'Facebook' ? 'bg-blue-100 text-blue-700' :
                        c.platform === 'Google' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium">R$ {c.spend.toLocaleString()}</td>
                    <td className="px-6 py-4">{ctr}%</td>
                    <td className="px-6 py-4">R$ {cpc}</td>
                    <td className="px-6 py-4 text-rose-600 font-medium">R$ {cpa}</td>
                    <td className="px-6 py-4">
                       <span className={`font-bold ${Number(roas) >= 3 ? 'text-green-600' : 'text-amber-600'}`}>
                        {roas}x
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEditModal(c)} className="p-1.5 text-slate-400 hover:text-indigo-600"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-400 hover:text-red-600"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-scaleIn overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900">{editingCampaign ? 'Editar Métricas' : 'Cadastrar Campanha'}</h3>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Campanha</label>
                  <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Plataforma</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" value={formData.platform} onChange={e => setFormData({ ...formData, platform: e.target.value as any })}>
                    <option value="Facebook">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="TikTok">TikTok</option>
                    <option value="Instagram">Instagram</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                    <option value="active">Ativa</option>
                    <option value="paused">Pausada</option>
                    <option value="ended">Finalizada</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Gasto</label>
                  <input required type="number" step="0.01" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-indigo-600 font-bold" value={formData.spend} onChange={e => setFormData({ ...formData, spend: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Impressões</label>
                  <input required type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={formData.impressions} onChange={e => setFormData({ ...formData, impressions: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cliques</label>
                  <input required type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={formData.clicks} onChange={e => setFormData({ ...formData, clicks: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Conversões</label>
                  <input required type="number" className="w-full px-3 py-2 border border-slate-200 rounded-lg" value={formData.conversions} onChange={e => setFormData({ ...formData, conversions: Number(e.target.value) })} />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
