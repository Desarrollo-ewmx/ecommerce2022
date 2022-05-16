<template lang="html">
<div class="container">
    <div v-if="codevalid == 1">
        <b-form-group label="Cotizacion activa" label-for="cotizacion">
            <b-form-select v-model="cotizacionactv" class="form-control col-md-11 mr-4" id="cotizacion" @change="cotactiva(cotizacionactv)">
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                    <b-form-select-option v-for="(cotizacion, index) in cotizaciones" :value="cotizacion" v-bind:key="index">{{ cotizacion.nom }} {{ cotizacion.serie }}
                    </b-form-select-option>
                </template>
            </b-form-select>
        </b-form-group>
    </div>
    <div v-if="codevalid == 0">
        <p>Inicie sesion para ver sus cotizaciones</p>
    </div>
    <div v-if="cotizaciones == '' && codevalid == 1">
        <p>No tiene cotizaciones creadas, cree una por favor</p>
    </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex';
import {
    baseUrl
} from '~/repositories/Repository';

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
            codevalid: null,
        };
    },
    methods: {
        async getcot() {
            console.log(localStorage.getItem('id'))
            if (localStorage.getItem('id') != null) {
                await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
                this.codevalid = 1
                console.log("Termine de listar cotizaciones")
                console.log(this.cotizaciones)
            } else {
                this.codevalid = 0
            }
            console.log("Esta activa en localStorage")
            console.log(localStorage.getItem('idcot'))
            let cotacti = this.cotizaciones.filter(x => x.id == localStorage.getItem('idcot'))
            console.log(cotacti)
            this.$store.dispatch('cotizacionarcon/getactiva', cotacti[0]);
        },
        cotactiva(cotizacion) {
            console.log("Tengo esto")
            console.log(cotizacion)
            this.$store.dispatch('cotizacionarcon/getactiva', this.cotizacionactv);
            console.log("Tengo almacenado")
            console.log(localStorage.getItem('idcot'))
        }
    },
    async created() {
        await this.getcot();
        if (this.cotizacionesactv != null) {
            this.cotizacionactv = this.cotizacionesactv
        } else {
            this.cotizacionactv = null
        }
        console.log("Esta activa la cotizacion")
        console.log(this.cotizacionactv)

        this.$store.watch(
            (state) => {
                return this.$store.state.cotizacionarcon.cotizaciones // could also put a Getter here
            },
            (newValue, oldValue) => {
                if (this.cotizaciones != null) {
                    console.log(localStorage.getItem('idcot'))
            let cotacti = this.cotizaciones.filter(x => x.id == localStorage.getItem('idcot'))
            console.log(cotacti)
            this.$store.dispatch('cotizacionarcon/getactiva', cotacti[0]);
            this.cotizacionactv = this.cotizacionesactv
                }
                
            },
            //Optional Deep if you need it
            {
                deep: true
            }
        )
    },
};
</script>
