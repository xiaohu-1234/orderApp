import axios from 'axios';
const path = 'http://172.20.10.5:3333';

export function getInfo(hash){
    return axios.get(path+hash)
}