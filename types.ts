
export interface Product {
  id: string;
  name: string;
  quantitySold: number;
  revenue: number;
  costPerUnit: number;
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'Facebook' | 'Google' | 'TikTok' | 'Instagram';
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status: 'active' | 'paused' | 'ended';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
}

export interface AppState {
  products: Product[];
  campaigns: Campaign[];
  users: User[];
  metaPixelId: string;
}

export type Period = 'day' | 'month' | 'year';
