import router from '@/router';
import store from '@/store';
import { User } from '../User';

const axios = require("axios").default;
const url = "http://localhost:3000/auth/";

export async function login(mail: string, password: string) {
    const result = await axios.post(url + 'login', {
        email: mail,
        password: password
    });
    const user = new User(result.data.id, result.data.lastname, result.data.firstname, result.data.email, result.data.accessToken, result.data.refreshToken);
    window.localStorage.setItem("access_token", user.getAccessToken());
    window.localStorage.setItem("refresh_token", user.getRefreshToken());
    store.commit('logUser', user);
    return user;
}

export async function logout() {
    const token = window.localStorage.getItem("refresh_token");
    if (token) {
        const result = await axios.delete(url + 'logout/' + token);
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        return result;
    } else {
        return ({result: 'Error'});
    }
}

export async function refreshToken() {
    const token = window.localStorage.getItem("refresh_token");
    if (token) {
        try {
            const result = await axios.post(url + 'refresh-token', {
                refreshToken: token
            });
            if (result.status == 200) {
                window.localStorage.setItem("access_token", result.data.accessToken);
                window.localStorage.setItem("refresh_token", result.data.refreshToken);
                const user = new User(result.data.id, result.data.lastname, result.data.firstname, result.data.email, result.data.accessToken, result.data.refreshToken);
                store.commit('logUser', user);
            }
        } catch (error) {
            router.push('login');
        }
    } else {
        console.log('log out');
        
        // logout();
    }
}
