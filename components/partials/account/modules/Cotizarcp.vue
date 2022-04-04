<template lang="html">
    <div align="center">
        <form @submit.prevent="asignar">
            <div align="center">
                <div class="form-check-inline">
                    <b-form-group label="Cantidad" label-for="cantidad">
                        <b-form-input
                            v-model="cotizacioncp.cant"
                            type="text"
                            class="form-control col-md-8"
                            id="cantidad"
                            disabled
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-select
                            v-model="cotizacioncp.id"
                            class="form-control col-md-11 mr-4"
                            id="nombre"
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                                <!-- <b-form-select-option v-for="(colonia,index) in arreglo" :value="colonia.Colonia" v-bind:key="index">{{colonia.Colonia}}</b-form-select-option> -->
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="C.P" label-for="codepost">
                        <b-form-input
                            id="codepost"
                            v-model="cotizacioncp.cp"
                            type="text"
                            class="form-control col-md-11"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label="Cantidad x C.P" label-for="cantidad">
                        <b-form-select
                            v-model="cotizacioncp.cantasig"
                            class="form-control col-md-11 mr-6"
                            id="cantidad"
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                                <!-- <b-form-select-option
                                    v-for="(colonia, index) in arreglo"
                                    :value="colonia.Colonia"
                                    v-bind:key="index"
                                >{{ colonia.Colonia }}</b-form-select-option>-->
                            </template>
                        </b-form-select>
                    </b-form-group>
                    <b-button pill type="submit" class="ps-btn mr-4">Crear</b-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Cotizarcp',
    components: {
        // ArconesyCP,
    },
    ...mapState({
        //cotizacionarcon: state => state.cotizacionarcon.cotizacionarcon
        // cartItems: (state) => state.cart.cartItems,
    }),
    data() {
        return {
            cotizacioncp: {
                cant: null,
                id: null,
                cantasig: null,
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
        async asignar() {
            this.cotizacioncp.id = localStorage.id;
            await this.$store.dispatch(
                'cotizacionarcon/setCotArcon',
                this.cotizacioncp
            );
            console.log('Volvere a recargar');
            await this.$store.dispatch(
                'cotizacionarcon/getCot',
                localStorage.id
            );
            // console.log('Actualice la tabla');
            // this.cotizacionarcon.nombreCot = '';
        },
    },
};
</script>
