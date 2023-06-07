import axios from 'axios';
import { AUDIO_LOCATION, CURRENT_URL, API_URL, JS_API } from '../api';

export async function getBotStatus(){
    const response = await axios.get(`${JS_API}/discord-bot/status`);
    return response.data;
}
export async function startDisBot(){
    const response = axios.get(`${JS_API}/discord-bot/start`);
    return response;
}
export async function stopDisBot(){
    const response = axios.get(`${JS_API}/discord-bot/stop`);
    return response;
}
export async function getDiscordSettings(){
    const response = axios.get(`${JS_API}/discord-bot/config`);
    return response;
}
export async function saveDiscordConfig(data){
    const response = axios.post(`${JS_API}/discord-bot/config`, data);
    return response;
}
export async function getAvailableChannels(){
    const response = axios.get(`${JS_API}/discord-bot/guilds`);
    return response;
}