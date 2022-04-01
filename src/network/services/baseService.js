import { API_URL } from "../env/config";


export const baseService = {
    get: async (url) => {
        let response = [];
        let requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":true,
            }}

        await fetch(API_URL + url, requestOptions)
            .then(res => res.json())
            .then(data => {
                response = data
            })

        return response;
    },
    post: async (url, data) => {
        let response = {};
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify(data),
        }

        await fetch(API_URL + url, requestOptions)
            .then(res => res.json())
            .then(data => {
                response = data
            })

        return response;
    },
    delete: async (url) => {
        let response = {};
        let requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin":"*",
            },
        }

        await fetch(API_URL + url, requestOptions)
            .then(res => res.json())
            .then(data => {
                response = data
            })

        return response;
    }
};
