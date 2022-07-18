import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { apiURL } from '~/repositories/Repository';
import { copoMex } from '~/repositories/Repository';
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
    cotizacionactv: [],
    infocoti: [],
    infocp: [],
    direcload: [],
    delaux: null
});

export const mutations = {
    addcot(state, payload) {
        payload = JSON.parse(JSON.stringify(payload));
        console.log('Desde mutation', { payload });
        state.cotizacionarcon.push(payload);
    },
    setdelaux(state, payload) {
        state.delaux = payload;
    },
    setcotizaciones(state, payload) {
        state.cotizaciones = payload;
    },
    setcotizacionact(state, payload) {
        state.cotizacionactv = payload;
        console.log(payload.id);
        localStorage.setItem('idcot', payload.id);
    },
    setcotinfo(state, payload) {
        state.infocoti = payload;
        console.log('La cotizacion elegida es');
        console.log(state.infocoti);
    },
    setcp(state, payload) {
        state.infocp = payload;
        console.log('El cp tiene la siguiente informacion');
        console.log(state.infocp);
    },
    setdirec(state, payload) {
        state.direcload = payload;
        console.log('La cotizacion tiene cargadas las direcciones');
        console.log(state.direcload);
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

    async infocot({ commit, state }, payload) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            // console.log(
            //     `${apiURL}/cot?estat=${payload.status}&tot_arm=${payload.cantTotalArc}&cost_env=${payload.constenv}&desc=${payload.desc}&sub_total=${payload.subtotal}&iva=${payload.iva}&com=${payload.comision}&tot=${payload.total}&user_id=${payload.id}&desc_cot=nada&token=${token}`
            // );
            const response = await Repository.get(
                `${apiURL}/cotuserid?id=${payload.cotid}&user_id=${payload.userid}&token=${token}`
            );
            console.log(
                `${apiURL}/cotuserid?id=${payload.cotid}&user_id=${payload.userid}&token=${token}`
            );
            const result = JSON.parse(
                JSON.stringify(response.data.data.cotizaciones)
            );
            console.log('Esta es la cotizacion');
            console.log(result);
            commit('setcotinfo', result);
            const msg = JSON.parse(JSON.stringify(response.data.message));
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
    getaux({ commit, state }, payload) {
        commit('setdelaux', payload);
    },
    async deletearmcot({ commit, state }, payload) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/borrardir?id=${payload.reg}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const cont = JSON.parse(JSON.stringify(result.message));
            console.log('Eliminado');
            console.log(cont);
            // commit('setdelaux', payload.aux);
            return cont;
        } catch (error) {
            console.log(error);
        }
    },
    async deletecot({ commit, state }, payload) {
        try {
            const response = await Repository.get(
                `${apiURL}/cotizaciond/${payload}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const cont = JSON.parse(JSON.stringify(result.message));
            console.log('Eliminado');
            console.log(cont);
            return cont;
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
    async direcctable({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/tabdir?id_armado=${payload.id}&cant=${payload.cantTotalArc}&cant_direc_carg=${payload.cantdirec}&cost_env=${payload.constenv}&cotizacion_id=${payload.idcot}&id=${payload.id_registro}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            console.log(msg);
            return msg;
        } catch (error) {
            console.log(error);
        }
    },
    async cpset({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token = 'e1c91dd1-8b56-44c6-aaba-df21d802e3e1';
            const response = await Repository.get(
                `${copoMex}/info_cp/${payload}?type=simplified&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            // const msg = JSON.parse(JSON.stringify(result.message));
            console.log(result);
            commit('setcp', result);
            const msg = 'Ya termine';
            return msg;
        } catch (error) {
            console.log(error);
        }
    },
    async adddirecc({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.post(
                `${apiURL}/nuedir?id_registro_cot_arm=${payload.id}&est=${payload.est}&created_at_dir=${payload.usermail}&cantidad=${payload.cant}&cp=${payload.cp}&ciudad=${payload.city}&colonia=${payload.col}&del_o_munic=${payload.muni}&token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const msg = JSON.parse(JSON.stringify(result.message));
            console.log(result);
            return msg;
        } catch (error) {
            console.log(error);
        }
    },
    async getdirecc({ commit, state }, payload) {
        try {
            console.log('Me llego esto');
            console.log(payload);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.get(
                `${apiURL}/verdir?id=${payload.id}&user_id=${payload.user}`
            );
            const result = JSON.parse(JSON.stringify(response.data.data));
            commit('setdirec', result);
            const msg = JSON.parse(JSON.stringify(response.data.message));
            console.log(result);
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
