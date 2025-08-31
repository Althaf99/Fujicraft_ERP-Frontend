import axios from 'axios';


// Type declaration for process.env in Create React App
declare global {
  // eslint-disable-next-line no-var
  var process: {
    env: {
      REACT_APP_API_URL?: string;
      [key: string]: string | undefined;
    };
  };
}
const API_BASE =
  (import.meta as any).env?.VITE_API_URL ||
  (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) ||
  'http://localhost:6000/api';

export const fetchRawMaterialTypes = () => axios.get(`${API_BASE}/raw-material-types`).then(res => res.data);
export const addRawMaterialType = (data: { name: string }) => axios.post(`${API_BASE}/raw-material-types`, data).then(res => res.data);

export const fetchColors = () => axios.get(`${API_BASE}/colors`).then(res => res.data);
export const addColor = (data: { name: string }) => axios.post(`${API_BASE}/colors`, data).then(res => res.data);

export const fetchVendors = () => axios.get(`${API_BASE}/vendors`).then(res => res.data);
export const addVendor = (data: { name: string, contact?: string }) => axios.post(`${API_BASE}/vendors`, data).then(res => res.data);

export const fetchRawMaterials = () => axios.get(`${API_BASE}/raw-materials`).then(res => res.data);
export const addRawMaterial = (data: any) => axios.post(`${API_BASE}/raw-materials`, data).then(res => res.data);

export const fetchBrands = () => axios.get(`${API_BASE}/brands`).then(res => res.data);
export const addBrand = (data: { name: string }) => axios.post(`${API_BASE}/brands`, data).then(res => res.data);
