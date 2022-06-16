<template lang="html">
<div align="center">
    <form @submit.prevent="asignar">
        <div align="center">
            <div class="form-check-inline">
                <b-form-group label="Cantidad" label-for="cantidad">
                    <b-form-input v-model="cant" type="text" class="form-control col-md-8" id="cantidad" disabled></b-form-input>
                </b-form-group>
                <b-form-group label="Nombre" label-for="nombre">
                    <b-form-select v-model="idcant" @change="getcant" class="form-control col-md-11 mr-4" id="nombre" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(arcon,index) in storage" :value="index" v-bind:key="index">{{arcon.nombre}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="C.P" label-for="codepost">
                    <b-form-input id="codepost" v-model="cotizacioncp.cp" type="text" class="form-control col-md-11" required></b-form-input>
                </b-form-group>
               <b-form-group label="Cantidad x C.P" label-for="cantidad">
                    <b-form-input v-model="cantdisc" type="text" class="form-control col-md-8" id="cantidad" ></b-form-input>
                </b-form-group>
                <b-button pill type="submit" class="ps-btn mr-4">Crear</b-button>

            </div>
        </div>
    </form>
    <!-- <p>{{info}}</p> -->
    <p>{{info}}</p>
    <p>{{storage}}</p>
    
</div>
</template>



<script>
import {
    mapState
} from 'vuex';

export default {
    name: 'Cotizarcp',
    components: {
        // ArconesyCP,
    },
   computed: {
        ...mapState({
            info: (state) => state.cotizacionarcon.infocoti
        }),
    },
    data() {
        return {
            cotizacioncp: {
                cant: null,
                id: null,
                cantasig: null,
                cp: null,
            },
            cotselect: {
                cotid: '',
                userid: ''
            },
            storage: '',
            cant: '',
            idcant: '',
            cantdisc: ''
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
            // this.cotizacioncp.id = localStorage.id;
            // await this.$store.dispatch(
            //     'cotizacionarcon/setCotArcon',
            //     this.cotizacioncp
            // );
            // console.log('Volvere a recargar');
            // await this.$store.dispatch(
            //     'cotizacionarcon/getCot',
            //     localStorage.id
            // );
            let aux = this.storage[this.idcant].cantidad - this.cant
            this.storage[this.idcant].cantidad = aux
          
        },
        getcant() {
            console.log(this.idcant)
            let aux = this.storage[this.idcant]
            this.cant = aux.cantidad
        },

    },
    async beforeMount() {
        this.cotselect.cotid = this.$route.params.id;
        this.cotselect.userid = localStorage.getItem('id');
        let msg = await this.$store.dispatch('cotizacionarcon/infocot', this.cotselect);
        console.log("Termine de hacer la peticion para buscar la cotizacion")
        console.log(msg)
      console.log(this.info)
        this.storage = this.info[0].arcones
      console.log(this.storage)
    },
};
</script>
