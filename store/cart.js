const calculateAmount = obj =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

export const state = () => ({
    total: 0,
    amount: 0,
    cartItems: [], // * <- Carrito de compras (Cotizaciones)
    loading: false
});

export const mutations = {
    AddQuantityRandom(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem) {
            state.total = parseInt((state.total - selectedItem.quantity) + payload.cantidad,10);
            selectedItem.quantity = payload.cantidad;
            state.amount = calculateAmount(state.cartItems);
        }
    },
    
    initCart(state, payload) {
        state.cartItems = payload.cartItems;
        state.amount = payload.amount;
        state.total = payload.total;
    },

    setLoading(state, payload) {
        state.loading = payload;
    },

    addItem(state, payload) {
        console.log({ payload })
        if (state.cartItems !== null) {
            let existItem = state.cartItems.find(item => item.id === payload.id);

            if (existItem) {
                existItem.quantity = parseInt(existItem.quantity);
                existItem.quantity+= parseInt(payload.quantity);
            } else {
                state.cartItems.push(payload);
            }
            state.total = parseInt(state.total);
            state.total = state.total + parseInt(payload.quantity);
        } else {
            state.cartItems.push(payload);
            state.total = payload.quantity;
        }
        state.amount = calculateAmount(state.cartItems);
    },

    removeItem: (state, payload) => {
        const index = state.cartItems.find(item => item.id === payload.id);
        console.log({ payload })

        state.total = state.total - payload.quantity;
        console.log( state.total );
        
        let nuevo = state.cartItems.filter(itemin => itemin.id != index.id);
        console.log({ nuevo });
        state.cartItems = nuevo;

        if (state.cartItems.length === 0) {
            state.cartItems = [];
            state.amount = 0;
            state.total = 0;
        } else {
            state.amount = calculateAmount(state.cartItems);
        }
    },

    increaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem) {
            selectedItem.quantity++;
            state.total++;
            state.amount = calculateAmount(state.cartItems);
        }
    },

    decreaseItemQuantity(state, payload) {
        let selectedItem = state.cartItems.find(item => item.id === payload.id);
        if (selectedItem && selectedItem.quantity > 1) {
            selectedItem.quantity--;
            state.total--;
            state.amount = calculateAmount(state.cartItems);
        }
    },

    clearCart: state => {
        state.cartItems = [];
        state.amount = 0;
        state.total = 0;
    }
};

export const actions = {
    AddItemQuantity({ commit, state }, payload) {
        commit('AddQuantityRandom', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    
    },
    
    addProductToCart({ commit, state }, payload) {
        commit('addItem', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    removeProductFromCart({ commit, state }, payload) {
        commit('removeItem', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    increaseCartItemQuantity({ commit, state }, payload) {
        commit('increaseItemQuantity', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    decreaseCartItemQuantity({ commit, state }, payload) {
        commit('decreaseItemQuantity', payload);
        const cookieParams = {
            total: state.total,
            amount: state.amount,
            cartItems: state.cartItems
        };

        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    },

    clearCart({ commit }) {
        commit('clearCart');
        const cookieParams = {
            total: 0,
            amount: 0,
            cartItems: []
        };
        this.$cookies.set('cart', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
    }
};
