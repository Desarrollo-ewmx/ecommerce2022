import Repository, { serializeQuery } from '~/repositories/Repository.js';
import { baseUrl } from '~/repositories/Repository';
import { apiURL } from '~/repositories/Repository';

export const state = () => ({
    product: null,
    products: null,
    searchResults: null,
    cartProducts: null,
    wishlistItems: null,
    compareItems: null,
    brands: null,
    categories: null,
    total: 0,
    catalogo: null
});

export const mutations = {
    setProducts(state, payload) {
        state.products = payload;
    },

    setCartProducts(state, payload) {
        state.cartProducts = payload;
    },
    setWishlistItems(state, payload) {
        state.wishlistItems = payload;
    },
    setCompareItems(state, payload) {
        state.compareItems = payload;
    },

    setProduct(state, payload) {
        state.product = payload;
    },

    setBrands(state, payload) {
        state.brands = payload;
    },

    setCategories(state, payload) {
        state.categories = payload;
    },

    setSearchResults(state, payload) {
        state.searchResults = payload;
    },

    setTotal(state, payload) {
        state.total = payload;
    },

    setCatalogo(state, payload) {
        state.catalogo = payload;
    }
};

export const actions = {
    async getProducts({ commit }, payload) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then(response => {
                commit('setProducts', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getTotalRecords({ commit, state }, payload) {
        // const reponse = await Repository.get(`${baseUrl}/products/count`)
        //     .then(response => {
        //         commit('setTotal', response.data);
        //         return response.data;
        //     })
        //     .catch(error => ({ error: JSON.stringify(error) }));
        // return reponse;

        try {
            const token =
                '3RRZ4Czrz9KDMMG5Xo3IzaCU5WV7ZluKDYhNiw9lNZvUdRgFDnNUePyByJF8LVgIXPEE5gzJgQrzqa5RFaPu69oK893wNFWpY6xEoVLtzmNH3seFecjKBCHrjJXkTFo0DjDrR13NKF1R4uTxhxDnSw';
            const response = await Repository.get(
                `${apiURL}/muestraarmadoyproductos?token=${token}`
            );
            const result = JSON.parse(JSON.stringify(response.data));
            const arma = JSON.parse(JSON.stringify(result.data.armado));
            const resultado = arma.filter(
                catalogo => catalogo.armado_catalogo == 'Si'
            );
            //  commit('setProducts', resultado);
            commit('setTotal', resultado.length);
            commit('setProducts', resultado);
            commit('setCatalogo', resultado);
            //  console.log(state.arcones);
            //  console.log(state.arcones.length);
            return arma;
        } catch (error) {
            console.log(error);
        }
    },

    async getProductsById({ commit }, payload) {
        const reponse = await Repository.get(`${baseUrl}/products/${payload}`)
            .then(response => {
                commit('setProduct', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getProductByKeyword({ commit }, payload) {
        console.log('El usuario escribio esto');
        console.log(payload);
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(payload)}`
        )
            .then(response => {
                commit('setSearchResults', response.data);
                commit('setTotal', response.data.length);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getCartProducts({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `id=${item}`;
                console.log(`id=${item}`);
            } else {
                query = query + `&id=${item}`;
                console.log('llevo esto' + query);
            }
        });
        console.log('reccorremos todo el payload');
        const reponse = await Repository.get(`${baseUrl}/products?${query}`) /// <--- fix this error cannot read properties
            .then(response => {
                console.log('antes de hacer commit');
                commit('setCartProducts', response.data);
                console.log('actualizamos el carrito del store');
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getWishlishtProducts({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `id=${item}`;
            } else {
                query = query + `&id=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/products?${query}`)
            .then(response => {
                commit('setWishlistItems', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getCompareProducts({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `id=${item}`;
            } else {
                query = query + `&id=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/products?${query}`)
            .then(response => {
                commit('setCompareItems', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getProductBrands({ commit }) {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then(response => {
                commit('setBrands', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getProductCategories({ commit }) {
        const reponse = await Repository.get(`${baseUrl}/product-categories`)
            .then(response => {
                commit('setCategories', response.data);
                return response.data;
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },

    async getProductsByBrands({ commit }, payload) {
        let query = '';
        payload.forEach(item => {
            if (query === '') {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
        const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
            .then(response => {
                if (response.data) {
                    const brands = response.data;
                    let products = [];
                    brands.forEach(brand => {
                        brand.products.forEach(product => {
                            products.push(product);
                        });
                    });
                    commit('setProducts', products);
                    commit('setTotal', products.length);
                    return products;
                } else {
                    return null;
                }
            })
            .catch(error => ({ error: JSON.stringify(error) }));
        return reponse;
    },
    async getProductsByPriceRange({ commit, state }, payload) {
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
            commit('setTotal', resultado2.length);
            commit('setProducts', resultado2);
            console.log('Obtuve : ' + resultado2.length);
            console.log(resultado2);
            return resultado2;
        } catch (error) {
            console.log(error);
        }
    }
};
