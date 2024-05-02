import axios from "axios";
const URL = process.env.TELEGRAM_API;
const API = axios.create({ baseURL: URL });
const token = '6536616687:AAGzHPLf3wAr-JnvMwlagmPHXlsZBNO1xo4'

// Telegram

// POST
export const telegramPostAPI = async (data: any) =>
    API.post(`https://api.telegram.org/bot${token}/sendMessage`, data);
