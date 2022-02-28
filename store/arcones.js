import { apiURL } from '~/repositories/Repository';
import Repository, { serializeQuery } from '~/repositories/Repository.js';
export const state = () => ({
    arcones: []
});

export const mutations = {
    setProducts(state, payload) {
        state.arcones = payload;
    }
};

export const actions = {
    async setarmados({ commit, state }) {
        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.get(
                `${apiURL}/muestraarmados?token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            // const data = await arma.json();
            const arma = JSON.parse(JSON.stringify(result.data.armado));
            commit('setProducts', arma);
            console.log(state.arcones);
            console.log(arma[5]);
            return arma;
        } catch (error) {
            console.log(error);
        }
    }
};

export const getters = {
    getproducts(state) {
        const arcones = state.arcones;
        return arcones;
    }
};
