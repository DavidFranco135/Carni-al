
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { INITIAL_STATE } from './constants';
import { AppState, Product, Campaign, User } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Campaigns from './components/Campaigns';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Users from './components/Users';
import Login from './components/Login';
import WhatsAppSync from './components/WhatsAppSync';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Persistence & Real-time Listener Simulation
  useEffect(() => {
    const saved = localStorage.getItem('traffic_analyzer_data');
    if (saved) {
      setState(JSON.parse(saved));
    }

    // Ouvinte para "Pulsos Externos"
    const handleExternalUpdate = (event: any) => {
      const newCampaign = event.detail as Campaign;
      if (newCampaign) {
        addCampaign(newCampaign);
      }
    };

    window.addEventListener('carnical_data_pulse', handleExternalUpdate);
    return () => window.removeEventListener('carnical_data_pulse', handleExternalUpdate);
  }, []);

  useEffect(() => {
    localStorage.setItem('traffic_analyzer_data', JSON.stringify(state));
  }, [state]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const updateProducts = (products: Product[]) => setState(prev => ({ ...prev, products }));
  const updateCampaigns = (campaigns: Campaign[]) => setState(prev => ({ ...prev, campaigns }));
  const addCampaign = (campaign: Campaign) => setState(prev => {
    if (prev.campaigns.some(c => c.id === campaign.id)) return prev;
    return { ...prev, campaigns: [campaign, ...prev.campaigns] };
  });
  const updateUsers = (users: User[]) => setState(prev => ({ ...prev, users }));
  const updatePixel = (id: string) => setState(prev => ({ ...prev, metaPixelId: id }));
  
  const clearAllData = () => {
    const emptyState: AppState = {
      products: [],
      campaigns: [],
      users: state.users, // Mantém os usuários para não perder o acesso
      metaPixelId: ''
    };
    setState(emptyState);
    localStorage.setItem('traffic_analyzer_data', JSON.stringify(emptyState));
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={() => setIsAuthenticated(true)} />} 
        />
        
        <Route 
          path="/" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Dashboard state={state} />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route 
          path="/products" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Products products={state.products} setProducts={updateProducts} />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route 
          path="/campaigns" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Campaigns campaigns={state.campaigns} setCampaigns={updateCampaigns} />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route 
          path="/whatsapp" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <WhatsAppSync onDataReceived={addCampaign} />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route 
          path="/reports" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Reports state={state} />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route 
          path="/users" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Users users={state.users} setUsers={updateUsers} />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route 
          path="/settings" 
          element={isAuthenticated ? (
            <Layout onLogout={handleLogout}>
              <Settings 
                pixelId={state.metaPixelId} 
                setPixelId={updatePixel} 
                onClearAll={clearAllData}
              />
            </Layout>
          ) : <Navigate to="/login" />} 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
