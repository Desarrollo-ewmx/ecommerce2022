export const state = () => ({
    direcciones: []
});

export const mutations = {
    addtoDirecciones(state, payload) {
        payload = JSON.parse(JSON.stringify(payload));
        state.direcciones.push(payload);
        console.log(state.direcciones);
        console.log('Agregado a la base');
    },
    editToDirecciones(state, payload) {
        payload = JSON.parse(JSON.stringify(payload));
        console.log(state.direcciones);
        state.direcciones[payload.indice] = payload;
        console.log('Direccion actualizada');
        console.log(state.direcciones);
    },

    removeToDirecciones(state, payload) {
        state.direcciones.splice(payload, 1);
    }
};

export const actions = {
    addDireccion({ commit }, payload) {
        commit('addtoDirecciones', payload);
        const cookieParams = {
            direcciones: state.direcciones
        };

        this.$cookies.set('direccion', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    editDireccion({ commit }, payload) {
        console.log('obtuve esto: ' + payload.municipioArc);
        commit('editToDirecciones', payload);
        const cookieParams = {
            direcciones: state.direcciones
        };

        this.$cookies.set('direccion', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    deleteToDirecciones({ commit }, payload) {
        commit('removeToDirecciones', payload);
        const cookieParams = {
            direcciones: state.direcciones
        };

        this.$cookies.set('direccion', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    }
};
