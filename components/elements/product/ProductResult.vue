<template lang="html">
    <div class="ps-product ps-product--wide ps-product--search-result">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="product.ruta_Completa"
                    alt="martfury"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__content">
            <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                {{ product.nombre_armado }}
            </nuxt-link>
            <!-- <div class="ps-product__rating">
                <rating />
                <span>{{ product.ratingCount }}</span>
            </div> -->
            <p v-if="product.sale === true" class="ps-product__price sale">
                {{ currency }}{{ product.precio_redondeado }}
                <del class="ml-2"> {{ currency }}{{ product.precio_redondeado }} </del>
            </p>
            <p v-else class="ps-product__price">
                {{ currency }}{{ product.precio_redondeado }}
            </p>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '~/repositories/Repository';
import Rating from '~/components/elements/Rating';
import { mapState } from 'vuex';
export default {
    name: 'ProductResult',
    components: { Rating },

    props: {
        product: {
            type: Object,
            require: true,
            default: {},
        },
    },
    computed: {
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            currency: (state) => state.app.currency,
        }),
        baseUrl() {
            return baseUrl;
        },
    },
};
</script>

<style lang="scss" scoped></style>
