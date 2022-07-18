<template lang="html">
<div align="center">
    <form @submit.prevent="asignar">
        <div align="center">
            <div v-if="shipoptionselect == 2" class="form-check-inline">
                <b-form-group label="Cantidad" label-for="cantidad">
                    <b-form-input v-model="cant" style="text-align:center;" type="text" class="mb-2 mr-sm-2 mb-sm-0" id="cantidad" disabled></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <b-form-group label="Estado" label-for="est">
                    <b-form-input id="est" v-model="cotizacioncp.est" type="text" class="mb-2 mr-sm-2 mb-sm-0" disabled></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <b-form-group label="Ciudad" label-for="city">
                    <b-form-input id="city" v-model="cotizacioncp.city" type="text" class="mb-2 mr-sm-2 mb-sm-0" disabled></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <b-form-group label="Municipio" label-for="muni">
                    <b-form-input id="muni" v-model="cotizacioncp.muni" type="text" class="mb-2 mr-sm-2 mb-sm-0" disabled></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <div>
                </div>
                <b-button pill type="submit" class="ps-btn mr-4">Cotizar</b-button>
            </div>
            <div class="form-check-inline">
                <b-form-group v-if="shipoptionselect == 0 || shipoptionselect == 1 " label="Cantidad" label-for="cantidad">
                    <b-form-input v-model="cant" style="text-align:center;" type="text" class="mb-2 mr-sm-2 mb-sm-0" id="cantidad" disabled></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <b-form-group label="Arcon" label-for="nombre">
                    <b-form-select v-model="idcant" @change="getcant" class="form-control col-md-11 mr-4" id="nombre" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(arcon,index) in storage" :value="index" v-bind:key="index">{{arcon.nombre}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group label="Cantidad a enviar" label-for="cantidad">
                    <b-form-input v-model="cantdisc" type="text" id="cantidad" required></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <b-form-group label="Opcion de envio" label-for="shipop">
                    <b-form-select v-model="shipoptionselect" class="form-control col-md-11 mr-4" id="shipop" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(opcion,index) in shipoption" :value="opcion.value" v-bind:key="index">{{opcion.text}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>
                <b-form-group v-if="shipoptionselect == 2" label="C.P" label-for="codepost">
                    <b-form-input id="codepost" @change="getcpdata" v-model="cotizacioncp.cp" type="text" required></b-form-input>
                </b-form-group>
                <span></span> <span></span><span></span><span></span>
                <b-form-group v-if="shipoptionselect == 2" label="Colonia" label-for="estado">
                    <b-form-select v-model="cotizacioncp.col" class="form-control col-md-15 mr-10" id="nombre" required>
                        <template #first>
                            <b-form-select-option :value="null" disabled>Seleccione</b-form-select-option>
                            <b-form-select-option v-for="(colonia,index) in datacp.asentamiento" :value="colonia" v-bind:key="index">{{colonia}}</b-form-select-option>
                        </template>
                    </b-form-select>
                </b-form-group>

                <v-switch v-if="shipoptionselect == 2" v-model="checked" @click="instore($event)" label="Recoger en bodega" color="orange" value="si" hide-details></v-switch>
                <b-button pill type="submit" class="ps-btn mr-4">Cotizar</b-button>
                <!-- <p>{{checked}}</p> -->

            </div>
            <div>
                <b-form-group label="Comentarios">
                    <b-form-textarea v-model="cotizacioncp.comment">
                    </b-form-textarea>
                </b-form-group>

            </div>
        </div>
    </form>
    <!-- <p>{{info}}</p> -->
    <!-- <p>{{info}}</p>
    <p>{{storage}}</p>
    <P>{{cotizacioncp}}</P> -->

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
            info: (state) => state.cotizacionarcon.infocoti,
            postalcode: (state) => state.cotizacionarcon.infocp,
            direcload: (state) => state.cotizacionarcon.direcload,

        }),
    },
    data() {
        return {
            cpcya: '53398',
            shipoptionselect: null,
            checked: false,
            cotizacioncp: {
                cant: null,
                id: null,
                cp: null,
                est: null,
                city: null,
                muni: null,
                col: null,
                usermail: null,
                comment: 'Sin comentarios',

            },
            cotselect: {
                cotid: '',
                userid: ''
            },
            shipoption: [{
                    text: 'Tarifa única (Cdmx y AM)',
                    value: 0
                }, {
                    text: 'Tarifa única (Varios estados)',
                    value: 1
                }, {
                    text: 'Por codigo postal',
                    value: 2
                },
            ],

            storage: [],
            cant: '',
            idcant: '',
            cantdisc: '',
            states: [{
                    value: 'Aguascalientes (Aguascalientes)',
                    text: 'Aguascalientes'
                },
                {
                    value: 'Baja California (Mexicali)',
                    text: 'Baja California'
                },
                {
                    value: 'Baja California Sur (La Paz)',
                    text: 'Baja California Sur'
                },
                {
                    value: 'Campeche (Campeche)',
                    text: 'Campeche'
                },
                {
                    value: 'Chiapas (Tuxtla Gutiérrez)',
                    text: 'Chiapas'
                },
                {
                    value: 'Chihuahua (Chihuahua)',
                    text: 'Chihuahua'
                },
                {
                    value: 'Ciudad de México (Ciudad de México)',
                    text: 'Ciudad de México'
                },
                {
                    value: 'Coahuila de Zaragoza (Saltillo)',
                    text: 'Coahuila de Zaragoza'
                },
                {
                    value: 'Colima (Colima)',
                    text: 'Colima'
                },
                {
                    value: 'Durango (Victoria de Durango)',
                    text: 'Durango'
                },
                {
                    value: 'Guanajuato (Guanajuato)',
                    text: 'Guanajuato'
                },
                {
                    value: 'Guerrero (Chilpancingo de los Bravo)',
                    text: 'Guerrero'
                },
                {
                    value: 'Hidalgo (Pachuca de Soto)',
                    text: 'Hidalgo'
                },
                {
                    value: 'Jalisco (Guadalajara)',
                    text: 'Jalisco'
                },
                {
                    value: 'México (Edo. México)',
                    text: 'México'
                },
                {
                    value: 'Michoacán de Ocampo (Morelia)',
                    text: 'Michoacán de Ocampo'
                },
                {
                    value: 'Morelos (Cuernavaca)',
                    text: 'Morelos'
                },
                {
                    value: 'Nayarit (Tepic)',
                    text: 'Nayarit'
                },
                {
                    value: 'Nuevo León (Monterrey)',
                    text: 'Nuevo León'
                },
                {
                    value: 'Oaxaca (Oaxaca de Juárez)',
                    text: 'Oaxaca'
                },
                {
                    value: 'Puebla (H. Puebla de Zaragoza)',
                    text: 'Puebla'
                },
                {
                    value: 'Querétaro (Santiago de Querétaro)',
                    text: 'Querétaro'
                },
                {
                    value: 'Quintana Roo (Cd. Chetumal)',
                    text: 'Quintana Roo'
                },
                {
                    value: 'San Luis Potosí (San Luis Potosí)',
                    text: 'San Luis Potosí'
                },
                {
                    value: 'Sinaloa (Culiacán Rosales)',
                    text: 'Sinaloa'
                },
                {
                    value: 'Sonora (Hermosillo)',
                    text: 'Sonora'
                },
                {
                    value: 'Tabasco (Villahermosa)',
                    text: 'Tabasco'
                },
                {
                    value: 'Tamaulipas (Ciudad Victoria)',
                    text: 'Tamaulipas'
                },
                {
                    value: 'Tlaxcala (Tlaxcala de Xicohténcatl)',
                    text: 'Tlaxcala'
                },
                {
                    value: 'Veracruz de Ignacio de la Llave (Xalapa de Enríquez)',
                    text: 'Veracruz de Ignacio de la Llave'
                },
                {
                    value: 'Yucatán (Mérida)',
                    text: 'Yucatán'
                },
                {
                    value: 'Zacatecas (Zacatecas)',
                    text: 'Zacatecas'
                },
            ],
            datacp: [],
            localcol: [{
                asentamiento: ["El Parque", ]
            }]
            // localcol:[{asentamiento: [ "DBQmfBw1R0iVFr",
            // "RUfRcq6GlMM4OfY",
            // "fLKrSCpvaSTkp00",
            // "mzBEc9Y6"]}]
        };
    },

    methods: {
        instore(newValue) {
            console.log(newValue);
            console.log(this.checked)
            if (this.checked == 'si') {
                this.datacp = []
                this.cotizacioncp.cp = '53398'
                this.cotizacioncp.est = 'México (Edo. México)'
                this.cotizacioncp.city = 'México (Edo. México)'
                this.cotizacioncp.muni = 'Naucalpan de Juárez'
                let local = this.localcol[0]
                console.log(local)
                this.datacp = local
                console.log(this.datacp)
                this.cotizacioncp.col = this.datacp.asentamiento[0]
            } else {
                this.cotizacioncp.cp = ''
                this.cotizacioncp.est = ''
                this.cotizacioncp.city = ''
                this.cotizacioncp.muni = ''
                this.cotizacioncp.col = ''
            }
        },
        guardarCookie() {
            this.$store.dispatch(
                'cotizacionarcon/getCotArcon',
                this.cotizacionarcon
            );
        },
        async getcpdata() {
            this.datacp = []
            let msg = await this.$store.dispatch(
                'cotizacionarcon/cpset',
                this.cotizacioncp.cp
            );
            console.log("Obtuve esto")
            this.datacp = this.postalcode.response
            // console.log(this.postalcode)
            // for (let index = 0; index < this.postalcode.length; index++) {
            //     this.datacp.push(this.postalcode[index].response)
            // }
            console.log(this.datacp)
            this.cotizacioncp.est = this.datacp.estado
            this.cotizacioncp.muni = this.datacp.municipio
            this.cotizacioncp.city = this.datacp.ciudad
            let estado = this.states.filter(x => x.text == this.cotizacioncp.est)
            console.log(estado)
            this.cotizacioncp.est = estado[0].value
        },
        async asignar() {
            this.cotizacioncp.usermail = localStorage.getItem('correo');

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
                this.cotizacioncp.id = this.storage[this.idcant].id
                this.cotizacioncp.cant = this.cantdisc
                if (this.storage[this.idcant].cantidad == 0) {
                    this.storage.splice(this.idcant, 1)
                }
                // this.cotizacioncp.cp = ''
                console.log("Se tiene esto")
                console.log(this.storage)
                // this.cotizacioncp.id = this.storage[this.idcant].id
                // this.cotizacioncp.cant = this.cantdisc
                console.log(this.cotizacioncp)
                let msg = await this.$store.dispatch(
                    'cotizacionarcon/adddirecc',
                    this.cotizacioncp
                );
                this.$notify({
                    group: 'addCartSuccess',
                    title: '',
                    text: msg,
                    type: 'danger',
                });
                this.cantdisc = ''
                let data = {
                    id: this.$route.params.id,
                    user: localStorage.getItem('id')
                }
                await this.$store.dispatch('cotizacionarcon/getdirecc', data);
                console.log("Reinicio de valores")
                this.idcant = null
                this.cotizacioncp.cant = null
                this.cotizacioncp.id = null
                this.cotizacioncp.cp = null
                this.cotizacioncp.est = null
                this.cotizacioncp.city = null
                this.cotizacioncp.muni = null
                this.cotizacioncp.col = null
                this.cotizacioncp.usermail = null
                this.cant = ''
                this.checked = false
            }

        },
        getcant() {
            console.log(this.idcant)
            let aux = this.storage[this.idcant]
            this.cant = aux.cantidad
        },
        adjustcant() {
            for (let index = 0; index < this.direcload.armados.length; index++) {
                // console.log(this.direcload.armados[index])
                let id = null
                id = this.storage.findIndex(object => {
                    return object.nombre == this.direcload.armados[index].nom
                })
                console.log("Tiene el index: " + id)
                if (id >= 0) {
                    this.storage[id].cantidad = this.storage[id].cantidad - this.direcload.armados[index].cant
                    if (this.storage[id].cantidad == 0) {
                        this.storage.splice(id, 1)
                    }
                }
            }
        },
        async readjustcant() {
            this.storage = []
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
                let data2 = {
                    id: this.$route.params.id,
                    user: localStorage.getItem('id')
                }
                await this.$store.dispatch('cotizacionarcon/getdirecc', data2);
            }
            for (let index = 0; index < this.direcload.armados.length; index++) {
                // console.log(this.direcload.armados[index])
                let id = null
                id = this.storage.findIndex(object => {
                    return object.nombre == this.direcload.armados[index].nom
                })
                console.log("Tiene el index: " + id)
                if (id >= 0) {
                    this.storage[id].cantidad = this.storage[id].cantidad - this.direcload.armados[index].cant
                    if (this.storage[id].cantidad == 0) {
                        this.storage.splice(id, 1)
                    }
                }
            }
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
            let data2 = {
                id: this.$route.params.id,
                user: localStorage.getItem('id')
            }
            await this.$store.dispatch('cotizacionarcon/getdirecc', data2);
            this.adjustcant()
        }
        console.log("Te queda esto")
        console.log(this.storage)
    },
    watch: {
        '$store.state.cotizacionarcon.delaux': function () {
            // console.log(this.$store.state.cotizacionarcon.delaux)
            if (this.$store.state.cotizacionarcon.delaux == 1) {
                console.log("Se va a eliminar")
                this.readjustcant()
                this.$store.dispatch('cotizacionarcon/getaux', 0);
            } else {
                console.log("No se borrara")
            }
        }
    },
};
</script>

<style scoped>
span+span {
    margin-left: 10px;
}
</style>
