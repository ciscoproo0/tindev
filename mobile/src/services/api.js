import axios from 'axios';

const api = axios.create({
    //caso esteja conectado direto no USB, utilizar ip da maquina, caso não, utilize #adb reverse tcp:3000(ou porta que definiu no node) tcp:3000
    baseURL: 'http://192.168.100.4:3000'
});

export default api;
