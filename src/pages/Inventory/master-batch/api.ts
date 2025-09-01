
import axios from 'axios';
import { API_BASE } from  '../../../api';
// Vendor CRUD (API)
export const fetchVendors = () => axios.get(`${API_BASE}/vendors`).then(res => res.data);
export const addVendor = (vendor: { name: string; contact: string; address: string }) => axios.post(`${API_BASE}/vendors`, vendor).then(res => res.data);

// Color CRUD (with code and vendor)
export const fetchMasterBatchColors = () => axios.get(`${API_BASE}/master-batch-colors`).then(res => res.data);
export const addMasterBatchColor = (data: { name: string; code: string; vendorId: string }) => axios.post(`${API_BASE}/master-batch-colors`, data).then(res => res.data);

// Inventory CRUD
export const fetchMasterBatchInventory = () => axios.get(`${API_BASE}/master-batch-inventory`).then(res => res.data);
export const addMasterBatchInventory = (data: { colorId: string; code: string; vendorId: string; weight: number }) => axios.post(`${API_BASE}/master-batch-inventory`, data).then(res => res.data);
