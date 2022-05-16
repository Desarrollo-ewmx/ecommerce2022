import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { apiURL } from '~/repositories/Repository';

export const state = () => ({
    isLoggedIn: false,
    correo: null,
    armados: [],
    nombre: null,
    img: null
});

export const mutations = {
    setIsLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    },
    setNombre(state, payload) {
        state.nombre = payload;
        localStorage.setItem('nombre', payload);
    },
    setUsuario(state, payload) {
        state.correo = payload;
        localStorage.setItem('correo', payload);
    },
    deleteUsuario(state) {
        state.correo = null;
        state.nombre = null;
        state.isLoggedIn = false;
    },
    setArmados(state, payload) {
        state.armados = payload;
    },
    setImg(state, payload) {
        state.img = payload;
        localStorage.setItem('img', payload);
    }
};

export const actions = {
    setAuthStatus({ commit, state }, payload) {
        commit('setIsLoggedIn', payload);
        const cookieParams = {
            isLoggedIn: state.isLoggedIn
        };

        this.$cookies.set('auth', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    async setsesion({ commit, state }, payload) {
        try {
            const response = await Repository.post(
                `${apiURL}/login?email=${payload.username}&password=${payload.password}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const info = JSON.parse(JSON.stringify(result.data));
            console.log('Obtuve esto: ' + info.nom);
            const url = info.img_us_rut + info.img_us;
            commit('setUsuario', payload.username);
            commit('setNombre', info.nom);
            commit('setImg', url);
            localStorage.setItem('id', info.id);
            this.$cookies.set('user', state.correo);
            console.log(this.$cookies.get('user'));
            console.log(
                'El payload tiene el correo: ' +
                    payload.username +
                    ' y la contraseña: ' +
                    payload.password
            );
            const resp = 'Termine de consulta la API';
            return resp;
        } catch (error) {
            console.log(error);
            this.state.isLoggedIn = false;
        }
    },

    deletesesion({ commit, state }) {
        localStorage.removeItem('id');
        localStorage.removeItem('idcot');
        commit('deleteUsuario');
        this.$cookies.remove('user');
        console.log(this.$cookies.get('user'));
    },
    // async getarmados({ commit, state }) {
    //     //console.log(result.data.armado);
    //     try {
    //         const response = await Repository.get(
    //             `${apiURL}/muestraarmados?token=3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw `
    //         );
    //         const result = JSON.parse(JSON.stringify(response.data));
    //         // const data = await arma.json();
    //         const arma = JSON.parse(JSON.stringify(result.data.armado));
    //         commit('setArmados', arma);
    //         console.log(state.armados);
    //         console.log(arma[5]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    async setusuario({ commit, state }, payload) {
        try {
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/useradd?email=${payload.email}&nombre=${payload.nombre}&apellido=${payload.apellido}&tel_mov=${payload.tel}&password=${payload.password}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            // const data = await arma.json();
            const arma = JSON.parse(JSON.stringify(result.message));
            const resp = arma;
            return resp;
        } catch (error) {
            console.log(error);
        }
    },
    async image({ commit, state }, payload) {
        try {
            var formData = new FormData();

            formData.append('img', payload.img);
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/userupdate?id=${payload.id}&token=${token}&nom=${payload.nom}&tel_mov=${payload.tel_mov}&password=${payload.password}`,
                formData
            );
            const result = JSON.parse(JSON.stringify(response.data));
            console.log(result);
            // const data = await arma.json();
            // const arma = JSON.parse(JSON.stringify(result.message));
            // const resp = arma;
            return result;
        } catch (error) {
            console.log(error);
        }
    },

    async sendcode({ commit, state }, payload) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/msgpassemail?email=${payload}&token=${token}`
            );
            console.log('Ya termine');
            const result = JSON.parse(JSON.stringify(response.data));
            const arma = JSON.parse(JSON.stringify(result.message));
            console.log('Me responde esto');
            console.log(arma);
            return arma;
        } catch (error) {
            console.log(error);
        }
    },
    async changepass({ commit, state }, payload) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/msgpass?email=${payload.email}&password=${payload.password}&pass_token=${payload.code}&token=${token}`
            );
            console.log('Ya termine');
            const result = JSON.parse(JSON.stringify(response.data));
            const arma = JSON.parse(JSON.stringify(result.message));
            console.log('Me responde esto');
            console.log(arma);
            return arma;
        } catch (error) {
            console.log(error);
        }
    }
};
export const getters = {
    getauth(state) {
        const auth = state.correo;
        return auth;
    }
};
