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
                `${apiURL}/cot?estat=${payload.status}&tot_arm=${payload.cantTotalArc}&cost_env=${payload.constenv}&desc=${payload.desc}&sub_total=${payload.subtotal}&iva=${payload.iva}&com=${payload.comision}&tot=${payload.total}&user_id=${payload.id}&desc_cot=nada&token=${token}`
            ).then(response => {
                //  commit('setProducts', response.data);
                return response.data;
            });
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
    getactiva({ commit, state }, payload) {
        commit('setcotizacionact', payload);
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
    }
};
