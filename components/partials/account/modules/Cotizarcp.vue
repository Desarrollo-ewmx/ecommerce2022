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
                <!-- <b-form-group label="C.P" label-for="codepost">
                    <b-form-input id="codepost" v-model="cotizacioncp.cp" type="text" class="form-control col-md-11" required></b-form-input>
                </b-form-group> -->
                <b-form-group label="Estado" label-for="estado">
                    <b-form-select v-model="cotizacioncp.cp" class="form-control col-md-11 mr-4" id="nombre" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(estado,index) in states" :value="estado.value" v-bind:key="index">{{estado.value}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Cantidad x C.P" label-for="cantidad">
                    <b-form-input v-model="cantdisc" type="text" class="form-control col-md-8" id="cantidad"></b-form-input>
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
                cp: null,
            },
            cotselect: {
                cotid: '',
                userid: ''
            },
            storage: [],
            cant: '',
            idcant: '',
            cantdisc: '',
            states: [
                { value: 'Aguascalientes (Aguascalientes)', text: 'Aguascalientes (Aguascalientes)	' },
                { value: 'Baja California (Mexicali)', text: 'Baja California (Mexicali)' },
                { value: 'Baja California Sur (La Paz)', text: 'Baja California Sur (La Paz)' },
                { value: 'Campeche (Campeche)', text: 'Campeche (Campeche)' },
                { value: 'Chiapas (Tuxtla Gutiérrez)', text: 'Chiapas (Tuxtla Gutiérrez)' },
                { value: 'Chihuahua (Chihuahua)', text: 'Chihuahua (Chihuahua)' },
                { value: 'Ciudad de México (Ciudad de México)', text: 'Ciudad de México (Ciudad de México)' },
                { value: 'Coahuila de Zaragoza (Saltillo)', text: 'Coahuila de Zaragoza (Saltillo)' },
                { value: 'Colima (Colima)', text: 'Colima (Colima)' },
                { value: 'Durango (Victoria de Durango)', text: 'Durango (Victoria de Durango)' },
                { value: 'Guanajuato (Guanajuato)', text: 'Guanajuato (Guanajuato)' },
                { value: 'Guerrero (Chilpancingo de los Bravo)', text: 'Guerrero (Chilpancingo de los Bravo)' },
                { value: 'Hidalgo (Pachuca de Soto)', text: 'Hidalgo (Pachuca de Soto)' },
                { value: 'Jalisco (Guadalajara)', text: 'Jalisco (Guadalajara)' },
                { value: 'México (Edo. México)', text: 'México (Edo. México)' },
                { value: 'Michoacán de Ocampo (Morelia)', text: 'Michoacán de Ocampo (Morelia)' },
                { value: 'Morelos (Cuernavaca)', text: 'Morelos (Cuernavaca)' },
                { value: 'Nayarit (Tepic)', text: 'Nayarit (Tepic)' },
                { value: 'Nuevo León (Monterrey)', text: 'Nuevo León (Monterrey)' },
                { value: 'Oaxaca (Oaxaca de Juárez)', text: 'Oaxaca (Oaxaca de Juárez)' },
                { value: 'Puebla (H. Puebla de Zaragoza)', text: 'Puebla (H. Puebla de Zaragoza)' },
                { value: 'Querétaro (Santiago de Querétaro)', text: 'Querétaro (Santiago de Querétaro)' },
                { value: 'Quintana Roo (Cd. Chetumal)', text: 'Quintana Roo (Cd. Chetumal)' },
                { value: 'San Luis Potosí (San Luis Potosí)', text: 'San Luis Potosí (San Luis Potosí)' },
                { value: 'Sinaloa (Culiacán Rosales)', text: 'Sinaloa (Culiacán Rosales)' },
                { value: 'Sonora (Hermosillo)', text: 'Sonora (Hermosillo)' },
                { value: 'Tabasco (Villahermosa)', text: 'Tabasco (Villahermosa)' },
                { value: 'Tamaulipas (Ciudad Victoria)', text: 'Tamaulipas (Ciudad Victoria)' },
                { value: 'Tlaxcala (Tlaxcala de Xicohténcatl)', text: 'Tlaxcala (Tlaxcala de Xicohténcatl)' },
                { value: 'Veracruz de Ignacio de la Llave (Xalapa de Enríquez)', text: 'Veracruz de Ignacio de la Llave (Xalapa de Enríquez)' },
                { value: 'Yucatán (Mérida)', text: 'Yucatán (Mérida)' },
                { value: 'Zacatecas (Zacatecas)', text: 'Zacatecas (Zacatecas)' },
            ],
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
            if (this.cantdisc > this.storage[this.idcant].cantidad) {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Error',
                    text: 'No puedes mandar mas arcones de los que estan en tu cotizacion, ingresa otra cantidad',
                    type: 'danger',
                });
            } else {
                console.log("Le restare: " + this.cantdisc + " a " + this.storage[this.idcant].cantidad)
                let aux = this.storage[this.idcant].cantidad - this.cantdisc
                console.log("Tiene ahora: " + aux)
                this.storage[this.idcant].cantidad = aux
                console.log(this.storage[this.idcant].cantidad)
                this.cant = aux
                // this.cotizacioncp.cp = ''
                this.cotizacioncp.id = this.storage[this.idcant].id
                this.cotizacioncp.cant = this.cantdisc
                console.log(this.cotizacioncp)
                this.cantdisc = ''
            }

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
        // this.storage = this.info[0].arcones
        let arcones = this.info[0].arcones
        if (arcones.length > 0) {
            for (let index = 0; index < arcones.length; index++) {
                this.storage.push({
                    id: arcones[index].id,
                    sku: arcones[index].sku,
                    nombre: arcones[index].nombre,
                    gama: arcones[index].gama,
                    cantidad: arcones[index].cantidad,
                    precio_unitario_sin_iva: arcones[index].precio_unitario_sin_iva,
                    total: arcones[index].total,
                    tipo: arcones[index].tipo,
                    img: arcones[index].img,

                })
            }
        }

        console.log(this.storage)
    },
};
</script>
