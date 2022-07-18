<template lang="html">
<section class="ps-page--simple">
    <bread-crumb :breadcrumb="breadCrumb" />
    <div class="ps-order-tracking">
        <div class="container">
            <div class="ps-section__header">
                <h3>Resumen de la cotizacion {{cotname.nom}}-{{cotname.serie}}</h3>
                <div align="center">
                <h4>A continuación, se muestra un resumen de tu cotización</h4>
            </div>
            </div>
            <div>
                <!-- <Cotizarcp /> -->
                <Resumencot/>
            </div>
            <!-- <Tablaenvios /> -->
      
        </div>
    </div>
</section>
</template>

<script>
import {
    mapState
} from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import Resumencot from '~/components/partials/account/modules/Resumencot';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    middleware: 'validation',
    transition: 'zoom',
    components: {
        HeaderMobile,
        BreadCrumb,
        Resumencot
    },
    computed: {
        ...mapState({
            info: (state) => state.cotizacionarcon.infocoti
        }),
    },
    data: () => {
        return {
            breadCrumb: [{
                    text: 'Inicio',
                    url: '/',
                },
                {
                    text: 'Resumen',
                },
            ],
            value: '',
            cotname: {
                nom: null,
                serie: null
            }

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
 async  beforeMount() {
     this.value = this.$route.params.id;
        let data = {
            cotid: this.$route.params.id,
            userid: localStorage.getItem('id')
        }
     let msg = await this.$store.dispatch('cotizacionarcon/infocot', data);
        this.cotname.nom = this.info[0].nom
        this.cotname.serie = this.info[0].serie
    },
};
</script>

<style lang="scss" scoped></style>
