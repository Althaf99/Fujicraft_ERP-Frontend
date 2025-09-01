// Update a raw material by id

import axios from 'axios';

import { API_BASE } from '../../../api';


export const fetchRawMaterialTypes = () => axios.get(`${API_BASE}/raw-material-types`).then(res => res.data);
export const addRawMaterialType = (data: { name: string }) => axios.post(`${API_BASE}/raw-material-types`, data).then(res => res.data);

export const fetchColors = () => axios.get(`${API_BASE}/colors`).then(res => res.data);
export const addColor = (data: { name: string }) => axios.post(`${API_BASE}/colors`, data).then(res => res.data);

export const fetchVendors = () => axios.get(`${API_BASE}/vendors`).then(res => res.data);
export const addVendor = (data: { name: string, contact?: string, address:string }) => axios.post(`${API_BASE}/vendors`, data).then(res => res.data);

export const fetchRawMaterials = () => axios.get(`${API_BASE}/raw-materials`).then(res => res.data);
export const addRawMaterial = (data: any) => axios.post(`${API_BASE}/raw-materials`, data).then(res => res.data);
export const updateRawMaterialByAttribute = (data: any) => axios.put(`${API_BASE}/raw-materials/update/by-attributes`, data).then(res => res.data);

export const fetchBrands = () => axios.get(`${API_BASE}/brands`).then(res => res.data);
export const addBrand = (data: { name: string , code: string, country: string}) => axios.post(`${API_BASE}/brands`, data).then(res => res.data);
