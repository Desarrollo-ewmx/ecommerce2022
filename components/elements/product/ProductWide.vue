<template lang="html">
    <div class="ps-product ps-product--wide">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                   :src="product.ruta_Completa"
                    alt="martfury"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__container">
            <div class="ps-product__content">
                <nuxt-link
                    :to="`/product/${product.id}`"
                    class="ps-product__title"
                >
                    {{ product.nombre_armado }}
                </nuxt-link>
                <p class="ps-product__vendor">
                    Sold by:
                    <nuxt-link to="/shop">
                        {{ product.gama }}
                    </nuxt-link>
                </p>
                <ul class="ps-product__desc">
                    <p>Productos contenidos:</p>
        <div v-for="armado in product.productosxarmado" >
              <strong>° {{armado.desc_producto.nombre}}</strong>
        </div>
                </ul>
            </div>
            <div class="ps-product__shopping">
                <p v-if="product.sale === true" class="ps-product__price sale">
                    <!-- ${{ product.price.toFixed(2) }} -->
                    ${{ product.precio_redondeado }}

                    <del class="ml-2">
                        <!-- ${{ product.sale_price.toFixed(2) }} -->
                        ${{ product.precio_redondeado }}
                    </del>
                </p>
                <p v-else class="ps-product__price">
                    <!-- ${{ product.price.toFixed(2) }} -->
                    ${{ product.precio_redondeado }}
                </p>
                <a class="ps-btn" href="#" @click.prevent="handleAddToCart">
                    Agregar al carrito
                </a>
                <ul class="ps-product__actions">
                    <li>
                        <a href="#" @click.prevent="handleAddItemToWishlist">
                            <i class="icon-heart"></i>
                            Lista de deseos
                        </a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="handleAddItemToCompare">
                            <i class="icon-chart-bars"></i>
                            Compare
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
import Rating from '../Rating';
import ProductQuickview from '~/components/elements/detail/ProductQuickview';
export default {
    name: 'ProductWide',
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
        }),
        baseUrl() {
            return baseUrl;
        },
    },

    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false,
    }),

    methods: {
        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price,
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.title} has been added to your cart!`,
            });
        },

        handleAddItemToWishlist() {
            let item = {
                id: this.product.id,
            };

            this.$store.dispatch('wishlist/addItemToWishlist', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to wishlist!',
                text: `${this.product.title} has been added to your wishlist !`,
            });
        },

        handleAddItemToCompare() {
            let item = {
                id: this.product.id,
            };
            this.$store.dispatch('compare/addItemToCompare', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to Compare!',
                text: `${this.product.title} has been added to your compare !`,
            });
        },

        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach((item) => {
                listOfIds.push(item.id);
            });
            const response = await this.$store.dispatch(
                'product/getCartProducts',
                listOfIds
            );
            if (response) {
                this.$store.commit('cart/setLoading', false);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
