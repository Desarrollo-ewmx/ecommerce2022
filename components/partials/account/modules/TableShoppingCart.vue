<template lang="html">
    <table class="table ps-table--responsive ps-table--shopping-cart">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
         <!---   <pre>{{ cartItems }}</pre> ---->
            <pre>{{ total }}</pre>
            <!-- FIXME: Cannot read property 'id' of undefined -->
            <tr v-for="(product, index) in cartProducts" :key="product.index" >
                <!-- <pre>{{ product }}</pre> -->
                <td data-label="Product">
                    <product-shopping-cart :product="product"/> <!-- {{ `(${index} - indice del producto)` }} {{ `(${product.id} - id del producto)`  }} -->
                </td>
                <td data-label="Price" class="price">$ {{ product.price }}</td>
                <td data-label="Quantity">
                    <div class="form-group--number">
                        <button class="up" @click.prevent="AddQuantity(index)">+</button>
                        <button class="down" @click.prevent="RemoveQuantity(index)">-</button>
                        <input
                            class="form-control"
                            type="text"
                            :id="'icart' + cartItems[index].id"
                            placeholder="1"
                            :value="cartItems[index].quantity"
                            @input="updateTotal(index,$event.target.value)"
                        />
                    </div>
                </td>
                <td data-label="Total">
                    ${{
                        (cartItems[index].quantity * product.price).toFixed(2)
                    }}
                </td>
                <td data-label="Action">
                    <div>
                        <v-btn
                            href="#"
                            @click.prevent="handleRemoveProductFromCart(product)"
                            class="btn "
                            fab
                            dark
                            small
                            color="red"
                        >
                            <v-icon dark>
                            mdi-minus
                            </v-icon>
                        </v-btn>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';

export default {
    name: 'TableShoppingCart',
    components: { ProductShoppingCart },
    computed: {
        ...mapState({
            total: (state) => state.cart.total,
            cartItems: (state) => state.cart.cartItems,
            cartProducts: (state) => state.product.cartProducts,
            amount: (state) => state.cart.amount,
        }),

        quantity() {
            if (this.cartItems !== null) {
                const cartItem = this.cartItems.find(
                    (item) => item.id === this.product.id
                );
                if (cartItem !== undefined) {
                    return cartItem.quantity;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },

        baseUrl() {
            return baseUrl;
        },
    },

    methods: {
        updateTotal(index, cantidad) {
            let busca = true;
            for (let a = 0; a < cantidad.length; a++) {
                if (
                    cantidad.charAt(a) == '1' ||
                    cantidad.charAt(a) == '2' ||
                    cantidad.charAt(a) == '3' ||
                    cantidad.charAt(a) == '4' ||
                    cantidad.charAt(a) == '5' ||
                    cantidad.charAt(a) == '6' ||
                    cantidad.charAt(a) == '7' ||
                    cantidad.charAt(a) == '8' ||
                    cantidad.charAt(a) == '9' ||
                    cantidad.charAt(a) == '0'
                ) {
                } else {
                    busca = false;
                    break;
                }
            }
            if (busca) {
                this.cartItems[index].cantidad = cantidad;
                this.$store.dispatch(
                    'cart/AddItemQuantity',
                    this.cartItems[index]
                );
            } else {
                document.getElementById(
                    'icart' + this.cartItems[index].id
                ).value = this.cartItems[index].quantity;
            }
        },

        RemoveQuantity(index) {
            this.$store.dispatch(
                'cart/decreaseCartItemQuantity',
                this.cartItems[index]
            );
            // this.loadCartProducts();
        },

        AddQuantity(index) {
            this.$store.dispatch(
                'cart/increaseCartItemQuantity',
                this.cartItems[index]
            );
            // this.loadCartProducts();
        },

        async loadCartProducts() {
            console.log('otener cookies');
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            let queries = [];
            console.log('recorriendo carrito');
            cookieCart.cartItems.forEach((item) => {
                queries.push(item.id);
            });
            console.log('en caso de carrito no vacio');
            location.reload();
            if (this.cartItems.length > 0) {
                // Comparar con productMiniCart
                console.log('empezamos ciclo');
                const response = await this.$store.dispatch(
                    // <----- fix this
                    'product/getCartProducts',
                    queries
                );
                console.log('obtenemos carrito');
                console.log('carrito actualizado');
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                console.log('carrito no actualizado');
                this.$store.commit('product/setCartProducts', null);
            }
        },

        handleRemoveProductFromCart(product) {
            const cartItem = this.cartItems.find(
                (item) => item.id === product.id
            );
            console.log({ cartItem });
            this.$store.dispatch('cart/removeProductFromCart', cartItem);
            this.$store.commit('cart/setLoading', true);
            this.loadCartProducts();
            //location.reload();
        },
    },
};
</script>

<style lang="scss" scoped></style>
