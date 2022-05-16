import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { apiURL } from '~/repositories/Repository';
export const state = () => ({
    cotizacionarcon: {
        nombreCot: null,
        cantTotalArc: null,
        cantxTipoArc: null,
        tipoArcon: null,
        cantxCP: null,
        cp: null
    },
    cotizaciones: [],
    cotizacionactv: []
});

export const mutations = {
    addcot(state, payload) {
        payload = JSON.parse(JSON.stringify(payload));
        console.log('Desde mutation', { payload });
        state.cotizacionarcon.push(payload);
    },
    setcotizaciones(state, payload) {
        state.cotizaciones = payload;
    },
    setcotizacionact(state, payload) {
        state.cotizacionactv = payload;
        console.log(payload.id);
        localStorage.setItem('idcot', payload.id);
    }
};

export const actions = {
    async setCotArcon({ commit, state }, payload) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            console.log(
                `${apiURL}/cot?estat=${payload.status}&tot_arm=${payload.cantTotalArc}&cost_env=${payload.constenv}&desc=${payload.desc}&sub_total=${payload.subtotal}&iva=${payload.iva}&com=${payload.comision}&tot=${payload.total}&user_id=${payload.id}&desc_cot=nada&token=${token}`
            );
            const response = await Repository.post(
                `${apiURL}/cot?estat=${payload.status}&nom=${payload.nombreCot}&tot_arm=${payload.cantTotalArc}&cost_env=${payload.constenv}&desc=${payload.desc}&sub_total=${payload.subtotal}&iva=${payload.iva}&com=${payload.comision}&tot=${payload.total}&user_id=${payload.id}&desc_cot=nada&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            return msg;
        } catch (error) {
            console.log(error);
        }
    },

    async getCot({ commit, state }, payload) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.get(
                `${apiURL}/cotizacion?user_id=${payload}&token=${token}`
            ).then(response => {
                const result = JSON.parse(JSON.stringify(response.data));
                const cont = JSON.parse(
                    JSON.stringify(result.data.cotizaciones)
                );
                console.log('Obtenido');
                console.log(cont);
                commit('setcotizaciones', cont);
                return response.data;
            });
        } catch (error) {
            console.log(error);
        }
    },

    async changename({ commit, state }, payload) {
        try {
            console.log('Me llego');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/nomcot?nom=${payload.nom}&id=${payload.id}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            console.log(msg);
            return msg;
        } catch (error) {
            console.log(error);
        }
    },

    async addtocot({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/cotarmados?id_armado=${payload.idarm}&cant=${payload.cant}&cant_direc_carg=${payload.cantdirec}&cost_env=${payload.constenv}&cotizacion_id=${payload.cotid}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            console.log(msg);
            return msg;
        } catch (error) {
            console.log(error);
        }
    },

    getactiva({ commit, state }, payload) {
        if (payload != null) {
            commit('setcotizacionact', payload);
        }
    },
    async deletecot({ commit, state }, payload) {
        try {
            const response = await Repository.get(
                `${apiURL}/cotizaciond/${payload}`
            ).then(response => {
                const result = JSON.parse(JSON.stringify(response.data));
                const cont = JSON.parse(JSON.stringify(result.data.message));
                console.log('Obtenido');
                console.log(cont);
                return cont;
            });
        } catch (error) {
            console.log(error);
        }
    },
    async editarm({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/upcotarmados?id_armado=${payload.id}&cant=${payload.cantTotalArc}&cant_direc_carg=${payload.cantdirec}&cost_env=${payload.constenv}&cotizacion_id=${payload.idcot}&id=${payload.id_registro}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            console.log(msg);
            return msg;
        } catch (error) {
            console.log(error);
        }
    },
    async editarm({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/upcotarmados?id_armado=${payload.id}&cant=${payload.cantTotalArc}&cant_direc_carg=${payload.cantdirec}&cost_env=${payload.constenv}&cotizacion_id=${payload.idcot}&id=${payload.id_registro}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            console.log(msg);
            return msg;
        } catch (error) {
            console.log(error);
        }
    },
    async deletearm({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/cotarmadosd?&id=${payload}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            let msg = JSON.parse(JSON.stringify(result.message));
            console.log(msg);
            return msg;
        } catch (error) {
            console.log(error);
        }
    }
};
