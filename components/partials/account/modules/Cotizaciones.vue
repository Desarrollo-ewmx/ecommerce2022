<template lang="html">
    <div>

        <form class="needs-validation" novalidate>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <label>*Nombre de la cotización</label>
                    <input v-model="cotizacionarcon.nombreCot" type="text" class="form-control" id="validacionNombre" required>
                </div>
                <div class="col-md-4 mb-3">
                    <label>*Cantidad total de arcones</label>
                    <input v-model="cotizacionarcon.cantTotalArc" type="text" class="form-control" id="validacionCantArcones" required>
                </div>
                <div class="col-md-4 mb-3 mt-6 text-center">
                    <button class="ps-btn" @click.prevent="guardarCookie()">
                        Crear cotizacion
                    </button>
                </div>
            </div>
            <ArconesyCP :cotizacionarcon="cotizacionarcon"/>
        </form>
        <p>
            
            {{cotizacionarcon}}
        </p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ArconesyCP from '~/components/partials/account/modules/ArconesyCP';

export default {
    name: 'Cotizaciones',
    components: {
        ...mapState({
            //cotizacionarcon: state => state.cotizacionarcon.cotizacionarcon
        }),
        ArconesyCP,
    },
    data() {
        return {
            cotizacionarcon: {
                nombreCot: null,
                cantTotalArc: null,
                cantxTipoArc: null,
                tipoArcon: null,
                cantxCP: null,
                cp: null,
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
    },
};
</script>