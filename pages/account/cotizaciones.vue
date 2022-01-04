<template lang="html">
    <section class="ps-page--simple">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-order-tracking">
            <div class="container">
                <div class="ps-section__header">
                    <h3>Cotizaciones</h3>
                    <p>
                        Desde esta ventana podrás consultar tus cotizaciones, editarlas o
                        cancelarlas
                    </p>
                </div>
                <Cotizaciones class="p-2" />
                <TablaCotizaciones class="p-0" />
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import TablaCotizaciones from '~/components/partials/account/modules/TablaCotizaciones';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import Cotizaciones from '~/components/partials/account/modules/Cotizaciones'

export default {
    middleware: 'authentication',
    transition: 'zoom',
    components: {
        HeaderMobile,
        BreadCrumb,
        TablaCotizaciones,
        Cotizaciones
    },
    ...mapState({
        cartItems: state => state.cart.cartItems,
        cartProducts: state => state.product.cartProducts
    }),
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/'
                },
                {
                    text: 'Cotizaciones'
                }
            ]
        };
    },
    methods: {
        async loadCartProducts() {
            const cartItemsOnCookie = this.$cookies.get('cart', {
                parseJSON: true
            });
            let queries = [];
            cartItemsOnCookie.cartItems.forEach(item => {
                queries.push(item.id);
            });
            if (queries.length > 0) {
                await this.$store.dispatch('product/getCartProducts', queries);
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
