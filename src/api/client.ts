import axios from 'axios';

// PC-r terminal-e 'ipconfig' likhe IPv4 address-ti ekhane boshun
// const PC_IP_ADDRESS = '192.168.1.107'; 

const apiClient = axios.create({
  baseURL: `http://192.168.1.107:5000/api`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;