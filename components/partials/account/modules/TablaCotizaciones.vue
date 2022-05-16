<template lang="html">
    <div>
        <div class="table-responsive-sm">
            <table class="table table-hover table-fixed ps-table--shopping-cart">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Serie</th>
                        <th>Total de arcones</th>
                        <th>Total - Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cotizacion, index) in cotizaciones" :key="cotizacion.index">
                        <td>{{ cotizacion.nom }}</td>
                        <td>{{ cotizacion.serie }}</td>
                        <td>{{ cotizacion.arcones_totales }}</td>
                        <td class="price">${{ cotizacion.total }}</td>
                        <td>
                            <v-tooltip left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn href="#" @click.prevent="editItem(index)" v-b-modal.modal-prevent-closing
                                        class="mx-2" fab dark small v-bind="attrs" v-on="on" color="indigo">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </template>
                                <span>Editar</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <nuxt-link to="/account/cotizarenvio">
                                        <v-btn class="mx-2" fab dark small v-bind="attrs" v-on="on" color="green">
                                            <v-icon>mdi-check</v-icon>
                                        </v-btn>
                                    </nuxt-link>
                                </template>
                                <span>Ingresar</span>
                            </v-tooltip>

                            <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn href="#" @click.prevent="passid(cotizacion.id, cotizacion.arcones_totales)"
                                        v-b-modal.modal-prevent-delete class="mx-2" fab dark small v-bind="attrs"
                                        v-on="on" color="red">
                                        <v-icon dark>mdi-minus</v-icon>
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

            <b-modal id="modal-prevent-closing" ref="modal" title="Ingresa el nombre de la cotización"
                @show="resetModal" @hidden="resetModal" @ok="handleOk">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group label="Cotización" label-for="name-input"
                        invalid-feedback="El nombre es un elemento requerido" :state="nameState">
                        <b-form-input id="name-input" v-model="cotname" :state="nameState" required></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
            <b-modal id="modal-prevent-delete" ref="modal" title="¿Desea eliminar esta cotizacion?" @show="resetModal"
                @hidden="resetModal" @ok="handleDetok"></b-modal>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'TablaCotizaciones',
    data() {
        return {
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
            cotname: '',
            changename: {
                id: '',
                nom: ''
            }
        };
    },

    computed: {
        ...mapState({
            // cotizaciones: (state) => state.cotizacion.cotizaciones,
            total: (state) => state.cart.total,
            amount: (state) => state.cart.amount,
            cotizaciones: (state) => state.cotizacionarcon.cotizaciones,
        }),
    },

    methods: {
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
            // this.handleSubmit();
            this.editcot(this.cotid, this.cotname)
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
            this.cotname = cotizacion.nom
            this.cotid = cotizacion.id
            this.indice = index; // Igualamos el indice del item que deseamos editar
            // this.name = cotizacion.serie; // Mandamos a hablar al nombre del item qu
            console.log("Editaras: " + this.cotItem.name)
            console.log(cotizacion.serie);
            // async changename({ commit, state }, payload) {

        },
        passid(id, cant) {
            this.cotid = id;
            this.cotcant = cant;
            console.log('El arcon con id: ' + this.cotid + 'tiene ' + this.cotcant + 'arcones')
        },

        async editcot(id, name) {
            console.log("Editare el nombre: " + name + " con id: " + id)
            this.changename.id = id
            this.changename.nom = name
            console.log(this.changename)
            const msg = await this.$store.dispatch('cotizacionarcon/changename', this.changename);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Hecho',
                text: msg,
                type: 'danger',
            });
            await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing');
            });
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
