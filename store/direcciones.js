export const state = () => ({
    direcciones: [], //
    direccionesFiltradas: [],
    postal_code: 88510
});
export const mutations = {
    setDireccion(state, payload) {
        state.direcciones = payload;
    },
    setdireccionesFiltradas(state, payload) {
        state.direccionesFiltradas = payload;
    },
    setpPostalCode(state, payload) {
        state.postal_code = payload;
    }
};

export const actions = {
    async getDirecciones({ commit }) {
        try {
            const res = await fetch('/data/cp.json');
            const data = await res.json();
            commit('setDireccion', data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    },
    getpostalcode({ commit }, payload) {
        try {
            commit('setpPostalCode', payload);
            console.log(payload);
        } catch (error) {}
    }
};

export const getters = {
    cpMunicipios(state) {
        const resultado = state.direcciones.filter(
            codes => codes.CP == state.postal_code
        );
        console.log('filtre esto');
        console.log(resultado);
        return resultado;
        //const result = state.direcciones.filter(state.direcciones.CP == "88520");
        //return result;
    }
};
