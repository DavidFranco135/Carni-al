
import React, { useState } from 'react';
import { Lock, Mail, AlertCircle, Skull, Zap, ChevronLeft, ShieldCheck, KeyRound, UserPlus, User } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

type AuthView = 'login' | 'forgot-password' | 'recovery-sent' | 'register' | 'register-success';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulação de autenticação segura
    setTimeout(() => {
      if (email === 'davidbhmg147@gmail.com' && password === '135227') {
        onLogin();
      } else {
        setError('Acesso negado. Credenciais inválidas no sistema.');
        setLoading(false);
      }
    }, 1200);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('register-success');
    }, 1500);
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('recovery-sent');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl shadow-purple-500/20 rotate-3 group transition-transform duration-500 hover:rotate-0">
            <Skull size={40} className="group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Banda Carniçal</h1>
          <p className="text-slate-500 font-bold mt-2 tracking-widest uppercase text-[10px]">
            {view === 'login' ? 'Acesso ao Núcleo de Operações' : 
             view === 'register' ? 'Novo Protocolo de Membro' : 'Segurança do Sistema'}
          </p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-slate-800 transition-all duration-500">
          
          {/* VIEW: LOGIN */}
          {view === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm animate-pulse">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Protocolo ID</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input 
                    required
                    type="email" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white transition-all font-medium"
                    placeholder="admin@carnical.io"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Código Cripto</label>
                  <button 
                    type="button" 
                    onClick={() => setView('forgot-password')}
                    className="text-[10px] font-black text-purple-400 hover:text-purple-300 uppercase tracking-widest transition-colors"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input 
                    required
                    type="password" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-600/20 hover:bg-purple-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" /> : <><Zap size={20} /> Entrar no Fluxo</>}
              </button>

              <div className="pt-4 text-center">
                <button 
                  type="button"
                  onClick={() => setView('register')}
                  className="text-slate-400 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <UserPlus size={16} />
                  Criar Cadastro
                </button>
              </div>
            </form>
          )}

          {/* VIEW: REGISTER */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5 animate-fadeIn">
              <button 
                type="button" 
                onClick={() => setView('login')}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-2"
              >
                <ChevronLeft size={16} />
                Voltar
              </button>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    required
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600 text-white transition-all font-medium"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input 
                    required
                    type="email" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600 text-white transition-all font-medium"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Senha</label>
                  <input 
                    required
                    type="password" 
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600 text-white transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Confirmar</label>
                  <input 
                    required
                    type="password" 
                    className="w-full px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600 text-white transition-all font-medium"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
              >
                {loading ? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" /> : <><UserPlus size={20} /> Iniciar Registro</>}
              </button>
            </form>
          )}

          {/* VIEW: REGISTER SUCCESS */}
          {view === 'register-success' && (
            <div className="text-center space-y-6 animate-fadeIn py-4">
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Conta Criada!</h3>
                <p className="text-slate-500 text-sm font-medium">
                  Seu cadastro foi injetado no banco de dados. Você já pode acessar o sistema.
                </p>
              </div>
              <button 
                onClick={() => setView('login')}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/10"
              >
                Ir para Login
              </button>
            </div>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {view === 'forgot-password' && (
            <form onSubmit={handleForgot} className="space-y-6 animate-fadeIn">
              <div className="space-y-4">
                <button 
                  type="button" 
                  onClick={() => setView('login')}
                  className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                >
                  <ChevronLeft size={16} />
                  Voltar ao Login
                </button>
                <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-slate-400 text-xs leading-relaxed font-medium">
                  Insira seu e-mail de administrador para receber um link de reset criptografado.
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">E-mail Cadastrado</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                  <input 
                    required
                    type="email" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-white transition-all font-medium"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-800 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-slate-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {loading ? <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" /> : <><KeyRound size={20} /> Solicitar Reset</>}
              </button>
            </form>
          )}

          {/* VIEW: RECOVERY SENT */}
          {view === 'recovery-sent' && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Protocolo Iniciado</h3>
                <p className="text-slate-500 text-sm font-medium">
                  Verifique a caixa de entrada de <b className="text-slate-300">{email}</b>. O link de reset expira em 30 minutos.
                </p>
              </div>
              <button 
                onClick={() => setView('login')}
                className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
              >
                Entendido
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mt-10">
          Powered by Banda Carniçal Engine © 2024
        </p>
      </div>
    </div>
  );
};

export default Login;
