<template lang="html">
<div>
    <div class="table-responsive-sm tableFixHead" style="height: 500px;">
        <table class="table table-hover table-fixed ps-table--shopping-cart">
            <thead>
                <tr>
                    <th style="text-align:center">Nombre</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>C.P</th>
                    <th>Total</th>
                    <th>Costo de envio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(arcon, index) in direcload.armados" :key="direcload.index">
                    <td>{{ arcon.nom }}</td>
                    <td>{{ arcon.cant }}</td>
                    <td>{{arcon.est}}</td>
                    <td>{{arcon.cp}}</td>
                    <td class="price">${{ arcon.tot}}</td>
                    <td v-if="arcon.cost_por_env == null" v-b-tooltip.hover title="El área de ventas esta cotizando el envió a esta dirección, se actualizará en automático una vez se cotice.">pendiente por cotizar</td>
                    <td v-else class="price">${{ arcon.cost_por_env}}</td>
                    <td>
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn href="#" @click.prevent="passid(arcon)" v-b-modal.modal-prevent-delete class="mx-2" fab dark small v-bind="attrs" v-on="on" color="red">
                                    <v-icon dark>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Borrar</span>
                        </v-tooltip>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
    </div>
    <div>
        <!-- <pre>Store: {{ cotizaciones }}</pre> -->

        <b-modal id="modal-prevent-closing" ref="modal" title="Ingresa el nombre de la cotización" @show="resetModal" @hidden="resetModal" @ok="handleOk">
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group label="Cotización" label-for="name-input" invalid-feedback="El nombre es un elemento requerido" :state="nameState">
                    <b-form-input id="name-input" v-model="cotItem.name" :state="nameState" required></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
        <b-modal id="modal-prevent-delete" ref="modal" title="¿Deseas eliminar la cotización de este costo de envió?" @show="resetModal" @hidden="resetModal" @ok="handleDetok"></b-modal>
    </div>
    <!-- <vue-ip :ip="ip" :port="port" :on-change="change" theme="material"></vue-ip> -->
</div>
</template>

<script>
import {
    mapState
} from 'vuex';

export default {
    name: 'Tablaenvios',
    data() {
        return {
            ip: '127.0.0.1', // or null
            port: '8888', // or null
            nameState: null,
            storage: [],
            cotItem: {
                name: '',
                total: 0,
                productsCot: [
                    //{ id: 12, quantity: 10, price: 1000 },
                    //{ id: 13, quantity: 3, price: 10 },
                    //{ id: 14, quantity: 40, price: 120 },
                    //{ id: 15, quantity: 33, price: 230 },
                    //{ id: 16, quantity: 22, price: 685 }
                ],
            },
            indice: -1,
            cotid: null,
            cotcant: null,
            armdata: null,
            deleteflag: null,
        };
    },

    computed: {
        ...mapState({
            // cotizaciones: (state) => state.cotizacion.cotizaciones,
            total: (state) => state.cart.total,
            amount: (state) => state.cart.amount,
            cotizaciones: (state) => state.cotizacionarcon.cotizaciones,
            cotizacionesactv: (state) => state.cotizacionarcon.cotizacionactv,
            direcload: (state) => state.cotizacionarcon.direcload,
            info: (state) => state.cotizacionarcon.infocoti,
            todelete: (state) => state.cotizacionarcon.delaux,
        }),
    },

    methods: {
        change(ip, port, valid) {
            console.log(ip, port, valid);
        },
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.nameState = valid;
            return valid;
        },

        resetModal() {
            this.cotItem.name = '';
            this.nameState = null;
        },

        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        handleDetok(bvModalEvt) {
            bvModalEvt.preventDefault();
            // console.log('Tengo el id: ' + this.cotid);
            this.deleteItem(this.armdata);
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return;
            }

            if (this.indice == -1) {
                this.$store.dispatch('cotizacion/addCotizacion', this.cotItem);
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing');
                });
            } else {
                this.cotItem.indice = this.indice;
                this.$store.dispatch('cotizacion/editCotizacion', this.cotItem);
                this.indice = -1;
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing');
                });
            }
        },

        editItem(index) {
            let cotizacion = this.cotizaciones[index]; // Mandamos a traer el item que deseamos editar
            this.indice = index; // Igualamos el indice del item que deseamos editar
            // this.name = cotizacion.serie; // Mandamos a hablar al nombre del item qu
            console.log(cotizacion.serie);
        },
        passid(armado) {
            this.armdata = armado
            console.log("esta es la cotizacion que se va a eliminar")
            console.log(armado)

        },

        async deleteItem(armado) {
            // let arcones = this.info[0].arcones
            //      for (let index = 0; index < arcones.length; index++) {
            //     this.storage.push({
            //         id: arcones[index].id,
            //         sku: arcones[index].sku,
            //         nombre: arcones[index].nombre,
            //         gama: arcones[index].gama,
            //         cantidad: arcones[index].cantidad,
            //         precio_unitario_sin_iva: arcones[index].precio_unitario_sin_iva,
            //         total: arcones[index].total,
            //         tipo: arcones[index].tipo,
            //         img: arcones[index].img,
            //     })
            // }
            // let ida = this.storage.findIndex(object => { return object.nombre == armado.nom })
            // console.log(ida)
            let infoarma = {
                reg: armado.id,
            }
           await this.$store.dispatch('cotizacionarcon/deletearmcot', infoarma);
            let data = {
            id: this.$route.params.id,
            user: localStorage.getItem('id')
                }
            await this.$store.dispatch('cotizacionarcon/getdirecc', data);
        this.$store.dispatch('cotizacionarcon/getaux', 1);
            // this.deleteflag = this.todelete
            // console.log("El auxiliar tiene este valor: " + this.deleteflag)
            // console.log('Borrare el id: ' + id);
            // await this.$store.dispatch('cotizacionarcon/deletecot', id);
            // await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-delete');
            });
        },

        /**
         * * Volver a cargar cotizaciones desde una cookie
         */
        // async loadCotizaciones() {
        //   const cotItemsOnCookie = this.$cookies.get('cotizacion', {
        //     parseJSON: true
        //   });

        //   let queries = [];
        //   cotItemsOnCookie.cotizaciones.forEach(item => {
        //     queries.push(item.index)
        //   })

        //   if (queries.length > 0) {
        //     await this.$store.dispatch('cotizacion/getCotizaciones', queries)
        //   }
        // }
    },
    async created() {
        await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
        let data = {
            id: this.$route.params.id,
            user: localStorage.getItem('id')
        }
        await this.$store.dispatch('cotizacionarcon/getdirecc', data);
        this.$root.$emit('bv::show::tooltip')

    },
};
</script>

<style scoped>
.tableFixHead {
    overflow: auto;
    height: 100px;
}

.tableFixHead thead th {
    position: sticky;
    top: 0;
    z-index: 1;
}
</style>
