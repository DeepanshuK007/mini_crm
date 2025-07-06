// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchCustomers = () => API.get('/customers');
export const createCustomer = (data) => API.post('/customers', data);

// POST /api/campaigns/preview
// {
//   "operator": "AND",
//   "rules": [
//     { "field": "totalSpend", "operator": "gt", "value": "10000" },
//     { "field": "visitCount", "operator": "lt", "value": "3" }
//   ]
// }
