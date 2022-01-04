<template lang="html">
    <div class="ps-product--cart-mobile">
        <div class="ps-product__thumbnail">
            <!-- TODO: Imagen del producto (Tambien funciona como enlace a los detalles del producto)-->
            <!-- <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="`${baseUrl}${product.thumbnail.url}`"
                    alt="martfury"
                />
            </nuxt-link> -->
        </div>
        <div class="ps-product__content">
            <!-- TODO: Da la función de eliminar un producto de manera independiente -->
            <!-- <a
                class="ps-product__remove"
                href="#"
                @click.prevent="handleRemoveProductFromCart(product)"
            >
                <i class="icon-cross"></i>
            </a> -->
            <!-- TODO: Titulo del producto con formato de enlace (Redirigia a los detalles del producto de forma individual) -->
            <!-- <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                {{ product.title }}
            </nuxt-link> -->
            <!-- TODO: Por quien esta siendo vendido un articulo -->
            <!-- <p>
                <strong>Sold by:</strong>
                {{ product.vendor }}
            </p> -->
            <!-- TODO: Cantidad y monedad de dicho articulo -->
            <!-- <small v-if="quantity !== null">
                {{ quantity }} x {{ currency }} {{ product.price }}
            </small> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
export default {
    name: 'ProductMiniCart',
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState({
            total: state => state.cart.total,
            cartItems: state => state.cart.cartItems,
            cartProducts: state => state.product.cartProducts,
            currency: state => state.app.currency
        }),
        quantity() {
            if (this.cartItems !== null) {
                const cartItem = this.cartItems.find(item => item.id === this.product.id);
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
        }
    },
    methods: {
        async loadCartProducts() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            let queries = [];
            cookieCart.cartItems.forEach(item => {
                queries.push(item.id);
            });
            if (this.cartItems.length > 0) {
                const response = await this.$store.dispatch('product/getCartProducts',queries);
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
        handleRemoveProductFromCart(product) {
            const cartItem = this.cartItems.find(item => item.id === product.id);
            console.log({ cartItem });
            this.$store.dispatch('cart/removeProductFromCart', cartItem);
            this.$store.commit('cart/setLoading', true);
            this.loadCartProducts();
        }
    }
};
</script>

<style lang="scss" scoped></style>
