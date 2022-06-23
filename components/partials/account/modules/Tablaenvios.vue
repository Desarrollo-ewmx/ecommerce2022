<template lang="html">
    <div>
        <div class="table-responsive-sm">
            <table class="table table-hover table-fixed ps-table--shopping-cart">
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Nombre-serie</th>
                        <th>Estado</th>
                        <th>Total</th>
                        <th>Costo de envio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(arcon, index) in cotizacionesactv.arcones"
                        :key="cotizacionesactv.index"
                    >
                        <td>{{ arcon.cantidad }}</td>
                        <td>{{ arcon.nombre }}</td>
                        <td>fondo de bikini</td>
                        <td class="price">${{ arcon.precio_unitario_sin_iva }}</td>
                        <td>pendiente</td>
                        <td>
                            <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        href="#"
                                        @click.prevent="passid(cotizacion.id, cotizacion.arcones_totales)"
                                        v-b-modal.modal-prevent-delete
                                        class="mx-2"
                                        fab
                                        dark
                                        small
                                        v-bind="attrs"
                                        v-on="on"
                                        color="red"
                                    >
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
            <b-button class="ps-btn" v-b-modal.modal-prevent-closing>Nueva Cotización</b-button>

            <!-- <pre>Store: {{ cotizaciones }}</pre> -->

            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Ingresa el nombre de la cotización"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
            >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                        label="Cotización"
                        label-for="name-input"
                        invalid-feedback="El nombre es un elemento requerido"
                        :state="nameState"
                    >
                        <b-form-input
                            id="name-input"
                            v-model="cotItem.name"
                            :state="nameState"
                            required
                        ></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
            <b-modal
                id="modal-prevent-delete"
                ref="modal"
                title="¿Desea eliminar esta cotizacion?"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleDetok"
            ></b-modal>
        </div>
        <!-- <vue-ip :ip="ip" :port="port" :on-change="change" theme="material"></vue-ip> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Tablaenvios',
    data() {
        return {
             ip: '127.0.0.1', // or null
            port: '8888', // or null
            nameState: null,
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
        };
    },

    computed: {
        ...mapState({
            // cotizaciones: (state) => state.cotizacion.cotizaciones,
            total: (state) => state.cart.total,
            amount: (state) => state.cart.amount,
            cotizaciones: (state) => state.cotizacionarcon.cotizaciones,
            cotizacionesactv: (state) => state.cotizacionarcon.cotizacionactv,
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
            console.log('Tengo el id: ' + this.cotid);
            this.deleteItem(this.cotid);
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
        passid(id, cant) {
            this.cotid = id;
            this.cotcant = cant;
            console.log('El arcon con id: ' + this.cotid + 'tiene ' + this.cotcant + 'arcones')
        },

        async deleteItem(id) {
            console.log('Borrare el id: ' + id);
            await this.$store.dispatch('cotizacionarcon/deletecot', id);
            await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
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
    },
};
</script>
