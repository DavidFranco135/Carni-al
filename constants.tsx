
import { AppState, Product, Campaign, User } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Curso de Marketing Digital', quantitySold: 150, revenue: 15000, costPerUnit: 20 },
  { id: '2', name: 'E-book Estratégias Ads', quantitySold: 300, revenue: 8900, costPerUnit: 5 },
  { id: '3', name: 'Consultoria Individual', quantitySold: 12, revenue: 24000, costPerUnit: 100 },
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  { 
    id: '1', 
    name: 'Lançamento Verão 2024', 
    platform: 'Facebook', 
    spend: 4500, 
    impressions: 125000, 
    clicks: 3200, 
    conversions: 85,
    status: 'active', 
    date: '2024-01-15' 
  },
  { 
    id: '2', 
    name: 'Remarketing E-book', 
    platform: 'Google', 
    spend: 1200, 
    impressions: 45000, 
    clicks: 1100, 
    conversions: 42,
    status: 'active', 
    date: '2024-01-20' 
  },
  { 
    id: '3', 
    name: 'Tráfego Frio - Instagram', 
    platform: 'Instagram', 
    spend: 3200, 
    impressions: 98000, 
    clicks: 2100, 
    conversions: 31,
    status: 'paused', 
    date: '2023-12-10' 
  },
];

export const INITIAL_USERS: User[] = [
  { id: 'admin-1', name: 'Administrador Principal', email: 'davidbhmg147@gmail.com', role: 'admin' },
];

export const INITIAL_STATE: AppState = {
  products: INITIAL_PRODUCTS,
  campaigns: INITIAL_CAMPAIGNS,
  users: INITIAL_USERS,
  metaPixelId: '',
};
