<template lang="html">
    <div> 
      <div class="table-responsive-sm">
                <table class="table table-hover table-fixed ps-table--shopping-cart">
            <thead>
                <tr>
                    <th>Alias</th>
                    <th>Total de productos</th>
                    <th>Total - Precio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(cotizacion, index) in cotizaciones" :key="cotizacion.index">
                    <td>{{ cotizacion.name }} {{ `(${index})` }}</td>
                    <td>{{ cotizacion.productsCot.length }}</td>
                    <td class="price">${{ amount }} </td>
                    <td>
                        <v-btn
                            href="#"
                            @click.prevent="editItem(index)"
                            v-b-modal.modal-prevent-closing
                            class="mx-2"
                            fab
                            dark
                            small
                            color="indigo"
                        >
                            <v-icon>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                        <v-btn
                            href="#"
                            @click.prevent="deleteItem(index)"
                            class="mx-2"
                            fab
                            dark
                            small
                            color="red"
                        >
                            <v-icon dark>
                                mdi-minus
                            </v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr>
      </div>        
        <div>
            <b-button 
                class="ps-btn"
                v-b-modal.modal-prevent-closing
            >
            Nueva Cotización
            </b-button>

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
                ]
            },
            indice: -1
        }
    },

    computed: {
      ...mapState({
        cotizaciones: state => state.cotizacion.cotizaciones,
        total: state => state.cart.total,
        amount: state => state.cart.amount
      })
    },
    
    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },

      resetModal() {
        this.cotItem.name = ''
        this.nameState = null
      },

      handleOk(bvModalEvt) {
        bvModalEvt.preventDefault()
        this.handleSubmit()
      },

      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        
        if (this.indice == -1) {
          this.$store.dispatch('cotizacion/addCotizacion', this.cotItem);
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
          })
        } else {
          this.cotItem.indice = this.indice
          this.$store.dispatch('cotizacion/editCotizacion', this.cotItem) 
          this.indice = -1
          this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
          })
        }
      },

      editItem(index) {
        let cotizacion = this.cotizaciones[index] // Mandamos a traer el item que deseamos editar
        this.indice = index // Igualamos el indice del item que deseamos editar
        this.name = cotizacion.name // Mandamos a hablar al nombre del item que deseamos editar
      },

      deleteItem(index) {
        this.$store.dispatch('cotizacion/deleteCotizacion', index)
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
    }
}
</script>
