import { apiURL } from '~/repositories/Repository';
import Repository, { serializeQuery } from '~/repositories/Repository.js';
export const state = () => ({
    arcones: [],
    arcon: [],
    catalogo: [],
    total: 0,
    finded: []
});

export const mutations = {
    setProducts(state, payload) {
        state.arcones = payload;
    },
    setArcon(state, payload) {
        state.arcon = payload;
    },
    setCatalogo(state, payload) {
        state.catalogo = payload;
    },
    setTotal(state, payload) {
        state.total = payload;
    },
    setSortasc(state) {
        state.arcones.sort((a, b) => {
            return a.precio_redondeado - b.precio_redondeado;
        });
        // state.arcones.forEach(e => {
        //     console.log(`${e.precio_redondeado}`);
        // });
    },
    setSortdesc(state) {
        state.arcones.sort((a, b) => {
            return b.precio_redondeado - a.precio_redondeado;
        });
        // state.arcones.forEach(e => {
        //     console.log(`${e.precio_redondeado}`);
        // });
    },
    setFindarcon(state, payload) {
        state.finded = payload;
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
            const arma = JSON.parse(JSON.stringify(result.data.armado));
            const resultado = arma.filter(
                catalogo => catalogo.armado_catalogo === 'Si'
            );
            commit('setProducts', resultado);
            commit('setCatalogo', resultado);
            commit('setTotal', resultado.length);
            console.log(state.arcones);
            console.log(state.arcones.length);
            return arma;
        } catch (error) {
            console.log(error);
        }
    },

    async setarcon({ commit, state }, payload) {
        try {
            console.log('Tengo el id: ' + payload);
            const response = await Repository.get(
                `${apiURL}/muestraarmadoyproductos/${payload}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const producto = JSON.parse(JSON.stringify(result.data));
            commit('setArcon', producto);
            console.log('Encontre este producto');
            console.log(state.arcon);
            // const api = await Repository.get(
            //     `${apiURL}/muestraarmadoyproductos/${payload}`
            // );
            // console.log('Esto trae la consultota');
            // const api2 = JSON.parse(JSON.stringify(api.data));
            // const api3 = JSON.parse(JSON.stringify(api2.data));
            // console.log(api3.productosxarmado[0].desc_producto.nombre);
            return producto;
        } catch (error) {
            console.log(error);
        }
    },
    async getArconByPriceRange({ commit, state }, payload) {
        // const reponse = await Repository.get(
        //     `${baseUrl}/products?${serializeQuery(payload)}`
        // )
        //     .then(response => {
        //         commit('setProducts', response.data);
        //         commit('setSearchResults', response.data);
        //         commit('setTotal', response.data.length);
        //         return response.data;
        //     })
        //     .catch(error => ({ error: JSON.stringify(error) }));
        // return reponse;

        try {
            // const token =
            //     '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            // const response = await Repository.get(
            //     `${apiURL}/muestraarmadoyproductos?token=${token}`
            // );
            // const result = JSON.parse(JSON.stringify(response.data));
            // const arma = JSON.parse(JSON.stringify(result.data.armado));
            // const resultado = arma.filter(
            //     catalogo => catalogo.armado_catalogo == 'Si'
            // );
            const resultado2 = state.catalogo.filter(
                catalogo =>
                    catalogo.precio_redondeado >= payload.price_gt &&
                    catalogo.precio_redondeado <= payload.price_lt
            );
            commit('setProducts', resultado2);
            commit('setTotal', resultado2.length);
            console.log('Obtuve : ' + resultado2.length);
            console.log(resultado2);
            return resultado2;
        } catch (error) {
            console.log(error);
        }
    },

    getArconbygama({ commit, state }, payload) {
        const resultado2 = state.catalogo.filter(
            catalogo => catalogo.gama == payload
        );
        commit('setProducts', resultado2);
        commit('setTotal', resultado2.length);
        return resultado2;
    },
    getSortarcon({ commit, state }, payload) {
        console.log('La opcion es : ' + payload);
        if (payload == 'Mas bajo a mas alto') {
            commit('setSortasc');
        } else if (payload == 'Mas alto a mas bajo') {
            commit('setSortdesc');
        }
    },

    async getArconbykey({ commit, state }, payload) {
        try {
            console.log('Recibi: ' + payload.title_contains);
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.get(
                `${apiURL}/muestraarmados?token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const arma = JSON.parse(JSON.stringify(result.data.armado));
            const resultado = arma.filter(
                catalogo => catalogo.armado_catalogo === 'Si'
            );
            console.log('Termine de filtrar, ahora buscare');
            const search = resultado.filter(
                find =>
                    find.nombre_armado
                        .toUpperCase()
                        .includes(payload.title_contains.toUpperCase()) == true
            );
            console.log('Encontre');
            console.log(search);
            commit('setFindarcon', search);
            commit('setProducts', search);
            commit('setTotal', search.length);
            return search;
        } catch (error) {}
    }
};

export const getters = {
    getproducts(state) {
        const arcones = state.arcones;
        return arcones;
    },
    getarcon(state) {
        const arcon = state.arcon;
        console.log('Enviare esto a la vista');
        console.log(state.arcon);
        return arcon;
    }
};
