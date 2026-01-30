
import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Search, Edit2, Trash2, Package, Hash } from 'lucide-react';

interface ProductsProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const Products: React.FC<ProductsProps> = ({ products, setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    quantitySold: 0,
    revenue: 0,
    costPerUnit: 0
  });

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      };
      setProducts([...products, newProduct]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', quantitySold: 0, revenue: 0, costPerUnit: 0 });
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja triturar este registro?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      quantitySold: product.quantitySold,
      revenue: product.revenue,
      costPerUnit: product.costPerUnit
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Inventário de Conversão</h2>
          <p className="text-slate-500 font-medium">Controle de ativos e receita bruta.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', quantitySold: 0, revenue: 0, costPerUnit: 0 });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all font-bold shadow-lg shadow-purple-600/20"
        >
          <Plus size={20} />
          Injetar Produto
        </button>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Rastrear produto por nome..."
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-slate-900/50 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-500 text-xs font-black uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5 text-purple-400">Node_Asset</th>
                <th className="px-8 py-5">Volume</th>
                <th className="px-8 py-5">Custo_Unit</th>
                <th className="px-8 py-5">Yield_Bruto</th>
                <th className="px-8 py-5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl border border-purple-500/20">
                        <Package size={20} />
                      </div>
                      <span className="font-bold text-white tracking-tight">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 font-mono text-slate-400 text-sm">{product.quantitySold} UNIT</td>
                  <td className="px-8 py-5 font-mono text-slate-400 text-sm">R$ {product.costPerUnit.toFixed(2)}</td>
                  <td className="px-8 py-5">
                    <span className="text-emerald-400 font-black text-lg tracking-tighter">R$ {product.revenue.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => openEditModal(product)}
                        className="p-3 bg-slate-950 text-slate-400 hover:text-purple-400 hover:bg-slate-800 rounded-xl border border-slate-800 transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-slate-950 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl border border-slate-800 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-[2.5rem] w-full max-w-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 animate-scaleIn">
            <div className="p-8 border-b border-slate-800">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter">{editingProduct ? 'Modificar Registro' : 'Novo Ativo'}</h3>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Designação do Produto</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-600"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Volume de Vendas</label>
                  <input 
                    required
                    type="number" 
                    className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-600"
                    value={formData.quantitySold}
                    onChange={e => setFormData({ ...formData, quantitySold: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Custo Unid (R$)</label>
                  <input 
                    required
                    type="number" 
                    step="0.01"
                    className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:ring-2 focus:ring-purple-600"
                    value={formData.costPerUnit}
                    onChange={e => setFormData({ ...formData, costPerUnit: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Faturamento Gerado (R$)</label>
                <input 
                  required
                  type="number" 
                  className="w-full px-5 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-emerald-400 font-black text-2xl outline-none focus:ring-2 focus:ring-emerald-600"
                  value={formData.revenue}
                  onChange={e => setFormData({ ...formData, revenue: Number(e.target.value) })}
                />
              </div>
              <div className="flex justify-end gap-4 pt-6">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 py-4 text-slate-400 hover:text-white font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-10 py-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all font-black uppercase tracking-widest shadow-lg shadow-purple-600/20"
                >
                  Confirmar Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
