
import React, { useState } from 'react';
import { User } from '../types';
import { UserPlus, Shield, Mail, MoreVertical, ShieldAlert } from 'lucide-react';

interface UsersProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

const Users: React.FC<UsersProps> = ({ users, setUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'viewer' as 'admin' | 'viewer' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9)
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: 'viewer' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Gerenciamento de Usuários</h2>
          <p className="text-slate-500">Controle quem tem acesso ao painel de análise.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors font-semibold shadow-sm"
        >
          <UserPlus size={20} />
          Convidar Usuário
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-indigo-600">
                <Shield size={32} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">{user.name}</h4>
                <div className="flex items-center gap-1 text-slate-500 text-sm justify-center">
                  <Mail size={14} />
                  {user.email}
                </div>
              </div>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {user.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scaleIn">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Convidar Novo Usuário</h3>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
                <input required type="email" className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nível de Acesso</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value as any })}>
                  <option value="viewer">Visualizador</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-slate-600 hover:bg-slate-50 rounded-xl font-medium">Cancelar</button>
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold">Enviar Convite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
