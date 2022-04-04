<template lang="html">
    <div v-if="codevalid == 1">
        <b-form-group label="Cotizacion activa" label-for="cotizacion">
            <b-form-select
                v-model="cotizacionactv"
                class="form-control col-md-11 mr-4"
                id="cotizacion"
                @change="cotactiva(cotizacionactv)"
            >
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option
                        v-for="(cotizacion, index) in cotizaciones"
                        :value="cotizacion"
                        v-bind:key="index"
                    >{{ cotizacion.serie }}</b-form-select-option>
                </template>
            </b-form-select>
        </b-form-group>
    </div>
    <div v-else>
        <p>No tiene cotizaciones</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';


export default {
    name: 'Cotselect',
    components: {},
    computed: {
        ...mapState({
            cotizaciones: (state) => state.cotizacionarcon.cotizaciones,
            cotizacionesactv: (state) => state.cotizacionarcon.cotizacionactv,
        }),
        baseUrl() {
            return baseUrl;
        },
    },
    data() {
        return {
            cotizacionactv: null,
            codevalid: 0,
        };
    },
    methods: {
        async getcot() {
            if (localStorage.id != null) {
                this.codevalid = 1
                await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
            }
            if (this.cotizacionesactv == null) {
                this.codevalid = 0
            }
            else {
                this.codevalid = 0
            }
        },
        cotactiva(cotizacion) {
            console.log("Tengo esto")
            console.log(cotizacion)
            this.$store.dispatch('cotizacionarcon/getactiva', this.cotizacionactv);
        }
    },
    async created() {
        this.getcot();
        if (this.cotizacionesactv != null) {
            this.cotizacionactv = this.cotizacionesactv
        }
        else {
            this.cotizacionactv = null
        }
        console.log("Esta activa la cotizacion")
        console.log(this.cotizacionactv)
    },
};
</script>

