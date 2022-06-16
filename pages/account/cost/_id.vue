<template lang="html">
    <section class="ps-page--simple">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-order-tracking">
            <div class="container">
                <div class="ps-section__header">
                    <h3>Cotizar envio</h3>
                </div>
                <div>
                    <Cotizarcp />
                </div>
                <Tablaenvios />
                <p>{{value}}</p>
                <!-- <Cotizaciones class="p-2" /> -->

                <!-- <TablaCotizaciones class="p-0" /> -->
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Tablaenvios from '~/components/partials/account/modules/Tablaenvios';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import Cotizarcp from '~/components/partials/account/modules/Cotizarcp';

export default {
    middleware: 'validation',
    transition: 'zoom',
    components: {
        HeaderMobile,
        BreadCrumb,
        Tablaenvios,
        Cotizarcp,
    },
     computed: {
        ...mapState({
            // info: (state) => state.cotizacionarcon.infocoti
        }),
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/',
                },
                {
                    text: 'Cotizaciones',
                },
            ],
            value: '',
              
        };
    },
    methods: {
        async loadCartProducts() {
            const cartItemsOnCookie = this.$cookies.get('cart', {
                parseJSON: true,
            });
            let queries = [];
            cartItemsOnCookie.cartItems.forEach((item) => {
                queries.push(item.id);
            });
            if (queries.length > 0) {
                await this.$store.dispatch('product/getCartProducts', queries);
            }
        },
    },
     beforeMount() {
        this.value = this.$route.params.id;
    },
};
</script>

<style lang="scss" scoped></style>
