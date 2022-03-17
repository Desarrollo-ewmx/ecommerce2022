import { apiURL } from '~/repositories/Repository';
import Repository, { serializeQuery } from '~/repositories/Repository.js';
export const state = () => ({
    info: []
});

export const mutations = {
    setInfo(state, payload) {
        state.info = payload;
    }
};

export const actions = {
    async setinfonet({ commit, state }) {
        try {
            const response = await Repository.get(`${apiURL}/info`);
            const result = JSON.parse(JSON.stringify(response.data));
            const arma = JSON.parse(JSON.stringify(result.data.info));
            commit('setInfo', arma);
            console.log(state.info);
            return arma;
        } catch (error) {
            console.log(error);
        }
    }
};

export const getters = {
    getsn(state) {
        const contact = state.info;
        return contact;
    }
};
