import http from 'k6/http';
import { check } from 'k6';
import Utils from '../utils/utils.js';

export default class Costumer {
    list(token) {
        let response = http.get(`${Utils.getBaseUrl()}/customers`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'os clientes devem retornar 200': r => r && r.status === 200 })
    }
}