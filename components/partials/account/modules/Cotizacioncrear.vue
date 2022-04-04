<template lang="html">
    <div align="center">
        <form @submit.prevent="crearcotizacion">
            <div align="center">
                <div class="form-check-inline">
                    <label>Nombre de la cotizacion</label>
                    <b-form-input
                        v-model="cotizacionarcon.nombreCot"
                        type="text"
                        class="form-control col-md-5 mr-4"
                        id="validacionNombre"
                        required
                    ></b-form-input>
                    <b-button pill type="submit" class="ps-btn mr-4">Crear</b-button>
                </div>
            </div>
        </form>
        <p>{{ cotizacionarcon }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ArconesyCP from '~/components/partials/account/modules/ArconesyCP';

export default {
    name: 'Cotizacioncrear',
    components: {
        ArconesyCP,
    },
    ...mapState({
        //cotizacionarcon: state => state.cotizacionarcon.cotizacionarcon
        cartItems: (state) => state.cart.cartItems,
    }),
    data() {
        return {
            cotizacionarcon: {
                nombreCot: null,
                status: 'Abierta',
                cantTotalArc: 0,
                constenv: 0.0,
                desc: 0.0,
                subtotal: 0.0,
                iva: 0.0,
                comision: 0.0,
                total: 0.0,
                id: null,
                descrip: 'Sin descripcion',
            },
        };
    },
    methods: {
        guardarCookie() {
            this.$store.dispatch(
                'cotizacionarcon/getCotArcon',
                this.cotizacionarcon
            );
        },
        async crearcotizacion() {
            this.cotizacionarcon.id = localStorage.id;
            await this.$store.dispatch(
                'cotizacionarcon/setCotArcon',
                this.cotizacionarcon
            );
            console.log('Volvere a recargar');
            await this.$store.dispatch(
                'cotizacionarcon/getCot',
                localStorage.id
            );
            console.log('Actualice la tabla');
            this.cotizacionarcon.nombreCot = '';
        },
    },
};
</script>
