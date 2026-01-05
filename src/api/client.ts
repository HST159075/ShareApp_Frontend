import axios from 'axios';

// PC-r terminal-e 'ipconfig' likhe IPv4 address-ti ekhane boshun
// const PC_IP_ADDRESS = '192.168.1.107'; 

const apiClient = axios.create({
  baseURL: `https://shareapp-liart.vercel.app/api`, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default apiClient;