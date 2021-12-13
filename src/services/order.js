import { API_URL } from '../helpers/const';

const createOrder = (order) => {

    const url = `${API_URL}order`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-Requested-With': `XMLHttpRequest` //Header que permite visualizar
            //mensajes de error en Postman
        },
        body: JSON.stringify(order),
    });

}

export {
    createOrder,
}