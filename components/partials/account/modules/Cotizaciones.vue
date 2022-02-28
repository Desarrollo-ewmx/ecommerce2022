<template lang="html">
<div>

    <form class="needs-validation" novalidate ALIGN="center">
        <div class="form-row">
            <div class="form-check-inline">
                <label>Nombre de la cotizacion</label>
                <b-form-input v-model="cotizacionarcon.nombreCot" type="text" class="form-control col-md-4 mr-4" id="validacionNombre" required></b-form-input>
                <b-button pill class="ps-btn mr-4">Crear/Editar cotizacion</b-button>
                <b-button pill class="ps-btn">Tarjeta dedicatoria</b-button>
            </div>
            <br>
            <!----
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
                </div>-->
        </div>
        <div class="form-row">
            <div class="form-check-inline">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="blue" class="bi bi-plus-circle-fill btn" viewBox="0 0 16 16" @click.prevent="otraDir()">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
                <b-form-group id="group1" label="Cantidad por tipo de arcon" label-for="input1">
                    <b-form-input id="input1" v-model="wf" type="text" class="form-control col-md-11 mr-5"></b-form-input>
                </b-form-group>
                <b-form-group id="group2" label="Tipo de arcon (SKU)" label-for="input2">
                    <b-form-input id="input2" v-model="wf" type="text" class="form-control col-md-11 mr-4"></b-form-input>
                </b-form-group>
                <b-button pill class="ps-btn">Añadir arcones a cotizacion</b-button>
            </div>
        </div>
        <div class="form-row" >
            <div class="form-check-inline">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="blue" class="bi bi-plus-circle-fill btn" viewBox="0 0 16 16" @click.prevent="otraDir()">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
                <b-form-group id="group3" label="Cantidad por CP" label-for="input3">
                    <b-form-input id="input3" v-model="wf" type="text" class="form-control col-md-11 mr-5"></b-form-input>
                </b-form-group>
                <b-form-group id="group4" label="CP (Direccion única)" label-for="input4">
                    <b-form-input id="input4" v-model="wf" type="text" class="form-control col-md-11 mr-4"></b-form-input>
                </b-form-group>
                <b-button pill class="ps-btn">Cargar archivo </b-button>
            </div>
        </div>
        <div class="form-grow">
            <div class="form-check-inline" >
                <label class="mr-5">Cantidad total arcones</label>
                <b-form-input placeholder="n" class="col-md-5" ></b-form-input>
            </div>
        </div>
        <div class="form-grow" align-self="center">
            <div class="form-check-inline">
                <label class="mr-7">Cantidad CP cargados</label>
                <b-form-input placeholder="n" class="col-md-5"></b-form-input>
            </div>
        </div>
        <!---
        <ArconesyCP :cotizacionarcon="cotizacionarcon" />
        -->
    </form>
    <p>

        {{cotizacionarcon}}
    </p>
    <p>armados: {{armados}}</p>
</div>
</template>

<script>
import { mapState } from 'vuex';
import ArconesyCP from '~/components/partials/account/modules/ArconesyCP';

export default {
    name: 'Cotizaciones',
    components: {
        ArconesyCP,
    },
    ...mapState({
        //cotizacionarcon: state => state.cotizacionarcon.cotizacionarcon
        armados: (state) => state.auth.armados,
        cartItems: (state) => state.cart.cartItems,
    }),
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
