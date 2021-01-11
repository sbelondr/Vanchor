const exports = {}

import { refreshToken } from '../models/Services/User.service';
import router from '@/router';

exports.checkConnection = () => {
    if (!window.localStorage.getItem("access_token") || !refreshToken()) {
        router.push('login');
    }
}

export default exports;