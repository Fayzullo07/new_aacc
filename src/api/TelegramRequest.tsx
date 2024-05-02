import axios from "axios";
const URL = process.env.TELEGRAM_API;
const API = axios.create({ baseURL: URL });
const token = '7131194128:AAGc1vz4q3o072czHeLfcrJSeamgStuCaFM'

// Telegram

// POST
export const telegramPostAPI = async (data: any) =>
    API.post(`https://api.telegram.org/bot${token}/sendMessage`, data);
