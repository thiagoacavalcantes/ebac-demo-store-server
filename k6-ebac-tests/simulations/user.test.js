import http from 'k6/http';
import { group, sleep } from 'k6';
import Login from '../request/login.request.js';
import data from '../data/usuarios.js';
import User from '../request/user.request.js';
import Product from '../request/product.request.js';
import Costumer from '../request/customer.request.js';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 }  
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
}

export default function () {

    let login = new Login()
    let user = new User()
    let product = new Product()
    let costumer = new Costumer()
    
    group('login and get token', ()=> {
        login.access(data.usuarioOk.user, data.usuarioOk.pass)
    })

    group('list users', () => {
        user.list(login.getToken())
    })

    group('list of products', () => {
        product.list(login.getToken())
    })

    group('list of costumers', () => {
        costumer.list(login.getToken())
    })

    }