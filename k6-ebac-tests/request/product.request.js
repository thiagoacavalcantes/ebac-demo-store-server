import http from 'k6/http';
import { check } from 'k6';
import Utils from '../utils/utils.js';

export default class Product {
    list(token) {
        let response = http.get(`${Utils.getBaseUrl()}/products`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'os produtos devem retornar 200': r => r && r.status === 200 })
    }
}