<template>
    <div class="table-responsive-sm tableFixHead" style="height: 500px;">
        <!-- <h1>Cotizaciones existentes</h1>
        <p>
            * Cada cotización puede contener diferentes tipos de arcones y
            direcciones
        </p>
        <p>* Solo es necesario crear una cotización por pedido</p> -->
        <!--<table class="table ps-table--responsive ps-table--shopping-cart">-->
        <table class="table table-hover table-fixed ps-table--shopping-cart">
            <thead style=" position: sticky;">
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Cantidad Actual</th>
                    <th>Cantidad a añadir</th>
                    <th>Cantidad total</th>
                </tr>
            </thead>
            <tbody overflow="scroll">
                <tr v-for="item in cotact.arcones" :key="item.index">
                    <img :src="item.img"/>
                    <!-- <td>{{ item.img }}</td> -->
                    <td>{{ item.nombre }}</td>
                    <td>{{ item.cantidad }}</td>
                    <td v-if="item.id == productId">{{ quantity }}</td>
                    <td v-else>0</td>
                    <td v-if="item.id == productId">
                        {{ item.cantidad + quantity }}
                    </td>
                    <td v-else>{{ item.cantidad }}</td>
                    <!-- <button class="ps-btn">Añadir</button> -->
                    <!-- <td>
                        <div class="form-check form-check-inline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="blue"
                                class="bi bi-plus-circle-fill btn"
                                viewBox="0 0 16 16"
                                @click.prevent="otraDir()"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="red"
                                class="bi bi-dash-circle-fill btn"
                                viewBox="0 0 16 16"
                                @click.prevent="otraDir()"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                                />
                            </svg>
                        </div>
                    </td> -->
                </tr>
                <!---
                <tr
                    class="table-info"
                    v-for="(cotizacion, index) in cotizaciones"
                    :key="index"
                >
                    <td data-level="New Quantity">{{ total }}</td>
                    <td data-level="Idon´tknow">
                        {{ cartItems[index].quantity }}
                    </td>
                    <td data-level="Identificate">COT - {{ index }}</td>
                    <td data-level="New Quantity could">-</td>
                    <td data-level="Add">-</td>
                    <td data-level="New Action">
                        <v-container class="px-0" fluid>
                            <div class="form-check form-check-inline">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                />
                            </div>
                        </v-container>
                    </td>
                </tr>
                --->
            </tbody>
            <!--<tbody>
          <tr v-for="(cartItem,index) in cartItems" :key="index">
            <td data-label="Quantity"> {{cartItem.quantity}} </td>
            <td data-label="Quantity"> - </td>
            <td data-label="Quantity"> - </td>
            <td data-label="Quantity"> - </td>
            <td data-label="Quantity"> - </td>
            <td data-label="Quantity"> - </td>
            <td data-label="Quantity"> - </td>
          </tr>
        </tbody>-->
        </table>
        <!-- <p>{{cotact}}</p> -->

        <!-- <table class="table table-hover table-fixed ps-table--shopping-cart">
            <thead>
                <tr>
                    <th>Cantidad Actual</th>
                    <th>Cantidad a añadir</th>
                    <th>Cotización</th>
                    <th>Alias</th>
                    <th>Cantidad total deseada</th>
                    <th>Añadir</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cartItems" :key="item.index">
                    <td>{{ item.quantity }}</td>
                    <td v-if="item.id == productId">{{ quantity }}</td>
                    <td v-else>1</td>
                    <td v-if="cotizaciones.length == 0"></td>
                    <td v-else>{{ cotizaciones[0].name }}</td>
                    <td>Alias</td>
                    <td v-if="item.id == productId">
                        {{ item.quantity + quantity }}
                    </td>
                    <td v-else>{{ item.quantity }}</td>
                    <button class="ps-btn">Añadir</button>
                    <td>
                        <div class="form-check form-check-inline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="blue"
                                class="bi bi-plus-circle-fill btn"
                                viewBox="0 0 16 16"
                                @click.prevent="otraDir()"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="50"
                                fill="red"
                                class="bi bi-dash-circle-fill btn"
                                viewBox="0 0 16 16"
                                @click.prevent="otraDir()"
                            >
                                <path
                                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"
                                />
                            </svg>
                        </div>
                    </td>
                </tr>
            </tbody>
          
        </table> -->
        <hr />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ModuleTableCotizacionesProducto',
    data() {
        return {
            productId: this.$route.params.id,
            eleccion: {
                //nombreCot:[]
            },
        };
    },
    components: {},
    computed: {
        ...mapState({
            cotizaciones: (state) => state.cotizacion.cotizaciones,
            total: (state) => state.cart.total,
            cartItems: (state) => state.cart.cartItems,
            quantity: (state) => state.cotizacion.cantidad,
            cotact: (state) => state.cotizacionarcon.cotizacionactv,
        }),
    },
    methods: {
        //  cantidadTotalDeseada(quantity){
        //    var quantity= this.quantity; 
        //    for(var i=0; i>=quantity.length;i++){
        //
        //    }
        //  }

        obtenerID() {
            const existeID = this.cartItems.map(
                (producto) => producto.quantity
            );
            this.getCartProduct(this.cartItems);
        },
        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach((item) => {
                listOfIds.push(item.id);
                console.log(item.id);
            });
            await this.$store.dispatch('product/getCartProducts', listOfIds);
        },
    },
};
</script>
<style scoped>
.tableFixHead          { overflow: auto; height: 100px; }
.tableFixHead thead th { position: sticky; top: 0; z-index: 1; }
</style>