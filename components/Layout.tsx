
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Megaphone, 
  BarChart3, 
  Users as UsersIcon, 
  Settings as SettingsIcon, 
  LogOut,
  Menu,
  Skull,
  MessageSquare
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Produtos', icon: ShoppingBag, path: '/products' },
    { name: 'Campanhas', icon: Megaphone, path: '/campaigns' },
    { name: 'WhatsApp Sync', icon: MessageSquare, path: '/whatsapp' },
    { name: 'Relatórios', icon: BarChart3, path: '/reports' },
    { name: 'Usuários', icon: UsersIcon, path: '/users' },
    { name: 'Configurações', icon: SettingsIcon, path: '/settings' },
  ];

  const activePath = location.pathname;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-64 glass z-30 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
              <Skull size={24} />
            </div>
            <h1 className="font-black text-xl tracking-tighter uppercase text-white">Carniçal</h1>
          </div>

          <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold group
                  ${activePath === item.path 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <item.icon size={20} className={activePath === item.path ? 'text-white' : 'group-hover:text-purple-400'} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800/50">
            <button 
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 font-bold"
            >
              <LogOut size={20} />
              Desconectar
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-slate-950/50 backdrop-blur-md border-b border-slate-800/50 px-8 flex items-center justify-between">
          <button 
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-800 rounded-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center gap-4 ml-auto">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-white">David Carniçal</p>
              <p className="text-xs text-purple-400 font-mono">ADMIN_SYS_ACCESS</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-purple-500/50 p-0.5">
              <img 
                src="https://picsum.photos/id/1012/100/100" 
                alt="Profile" 
                className="w-full h-full rounded-full grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
