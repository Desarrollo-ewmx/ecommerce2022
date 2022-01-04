export const state = () => ({
    cotizaciones: [], // <- Carritos de compras (Cotizaciones)
    cantidad: 1
});

export const mutations = {
    addtoquantity(state, payload) {
        state.cantidad = payload;
    },
    addToCotizaciones(state, payload) {
        payload = JSON.parse(JSON.stringify(payload)); //  Antes de agregarse al arreglo, debe de parsearse el payload
        state.cotizaciones.push(payload);
    },

    editToCotizaciones(state, payload) {
        payload = JSON.parse(JSON.stringify(payload));
        state.cotizaciones[payload.indice].name = payload.name;
    },

    removeToCotizaciones(state, payload) {
        state.cotizaciones.splice(payload, 1);
    }
};

export const actions = {
    addcantidad({ commit }, payload) {
        commit('addtoquantity', payload);
    },
    addCotizacion({ commit }, payload) {
        commit('addToCotizaciones', payload);
        const cookieParams = {
            cotizaciones: state.cotizaciones
        };

        this.$cookies.set('cotizacion', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    editCotizacion({ commit }, payload) {
        commit('editToCotizaciones', payload);
        const cookieParams = {
            cotizaciones: state.cotizaciones
        };

        this.$cookies.set('cotizacion', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    deleteCotizacion({ commit }, payload) {
        commit('removeToCotizaciones', payload);
        const cookieParams = {
            cotizaciones: state.cotizaciones
        };

        this.$cookies.set('cotizacion', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    }

    /**
     * Cargar cotizaciones desde la cookie
     */
    // getCotizaciones({ commit }, payload) {
    //   let query = '';
    //   payload.forEach(item => {
    //     if (query === '') {
    //       query = `id=${item}`;
    //     } else {
    //       query = query + `&id=${item}`;
    //     }
    //   });

    // }
};
