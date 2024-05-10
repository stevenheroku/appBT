import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL ='';

const cafeApi = axios.create({
    baseURL,
    timeout: 5000, // Tiempo de espera en milisegundos
    headers: {
       'Content-Type': 'application/json',
    },
 });
// const cafeApi = axios.create({baseURL});

cafeApi.interceptors.request.use(
    async(config)=>{
        const token = await AsyncStorage.getItem('token');
        if(token){
            config.headers['x-token'] = token;
        }

        return config;
    }
)

export default cafeApi;