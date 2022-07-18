<template lang="html">
<div class="container" >
<table class="table ps-table--responsive ps-table--shopping-cart" v-if="listacot.length > 0">
    <thead>
        <tr>
            <th width="30%">Armado</th>
            <th width="2%">SKU</th>
            <th width="40%">Descripcion</th>
            <th>Cantidad</th>
            <th>Precio Unit.</th>
            <th>Costo Env.</th>
            <th>Subtotal</th>
            <th>IVA</th>
            <th>Total</th>
            <th>Acción</th>
        </tr>
    </thead>
    <tbody>
        <!---   <pre>{{ cartItems }}</pre> ---->
        <!-- FIXME: Cannot read property 'id' of undefined -->
        <tr v-for="(product, index) in listacot" :key="product.index">
            <!-- <pre>{{ product }}</pre> -->

            <td data-label="Product">
                <product-shopping-cart :product="product" />
            </td>
            <td>
                {{ product.sku }}
            </td>

            <td>
                <ul style="color:gray;font-size:12px">
                    <li v-for="(item, index) in product.productos" :key="item.index">{{
                                item.nombre
                        }}</li>
                </ul>
            </td>
            <td data-label="Quantity">
                <div class="form-group--number">
                    <!-- <button class="up" @click.prevent="product.cantidad + 1">+</button>
                        <button class="down" @click.prevent="RemoveQuantity(product.cantidad)">-</button> -->
                    <input v-model="product.cantidad" class="form-control" type="text" placeholder="1" @change="act(product, product.cantidad)" />
                </div>
            </td>

            <td data-label="Price" class="price">$ {{ product.precio_unitario_sin_iva }}</td>
            <td>Pendiente</td>
            <td>{{ product.precio_unitario_sin_iva }}</td>
            <td>{{ product.iva }}</td>
            <td data-label="Total">
                ${{
                            //(cartItems[index].quantity * product.price).toFixed(2)
                            product.total
                    }}
            </td>
            <td data-label="Action">
                <div>
                    <v-btn href="#" @click.prevent="deletearma(product.registro)" class="btn " fab dark small color="red">
                        <v-icon dark>
                            mdi-minus
                        </v-icon>
                    </v-btn>
                </div>
            </td>
        </tr>
    </tbody>
</table>    
<p v-else>Tu carrito esta vacio</p>
</div>

</template>

<script>
import {
    mapState
} from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';

export default {
    name: 'TableShoppingCart',
    components: {
        ProductShoppingCart
    },
    props: {
        cotizacion: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            cot: {
                ...this.cotizacion.arcones
            },
            listacot: [],
            cotizacionarcon: {
                cantTotalArc: 0,
                constenv: 0.0,
                idcot: '',
                cantdirec: 0,
                id: null,
                id_registro: ''
            },
        }
    },
    computed: {
        ...mapState({
            total: (state) => state.cart.total,
            cartItems: (state) => state.cart.cartItems,
            cartProducts: (state) => state.product.cartProducts,
            amount: (state) => state.cart.amount,
            cotizaciones: (state) => state.cotizacionarcon.cotizaciones,
            cotizacionesactv: (state) => state.cotizacionarcon.cotizacionactv,
        }),

        quantity() {
            if (this.cartItems !== null) {
                const cartItem = this.cartItems.find(
                    (item) => item.id === this.product.id
                );
                if (cartItem !== undefined) {
                    return cartItem.quantity;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },

        baseUrl() {
            return baseUrl;
        },
    },

    methods: {
        async act(cotizacion, cant) {
            console.log("Actualizare " + cotizacion.nombre + " de " + cotizacion.cantidad + " a " + cant);
            let activa = this.cotizacionesactv
            console.log("La cotizacion a editar es")
            console.log(activa.serie)
            this.cotizacionarcon.idcot = this.cotizacion.id
            this.cotizacionarcon.id = cotizacion.id
            this.cotizacionarcon.cantTotalArc = cant
            this.cotizacionarcon.id_registro = cotizacion.registro
            console.log("Enviare")
            console.log(this.cotizacionarcon)
            let msg = await this.$store.dispatch(
                'cotizacionarcon/editarm',
                this.cotizacionarcon
            );
            await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
            let cotacti = this.cotizaciones.filter(x => x.id == localStorage.getItem('idcot'))
            console.log(cotacti)
            this.$store.dispatch('cotizacionarcon/getactiva', cotacti[0]);
            console.log("Se actualizo")
            // console.log(cotacti)
            this.$notify({
                group: 'addCartSuccess',
                title: 'Cantidad de arcon',
                text: msg,
                type: 'danger',
            });
        },
        
        updateTotal(index, cantidad) {
            let busca = true;
            for (let a = 0; a < cantidad.length; a++) {
                if (
                    cantidad.charAt(a) == '1' ||
                    cantidad.charAt(a) == '2' ||
                    cantidad.charAt(a) == '3' ||
                    cantidad.charAt(a) == '4' ||
                    cantidad.charAt(a) == '5' ||
                    cantidad.charAt(a) == '6' ||
                    cantidad.charAt(a) == '7' ||
                    cantidad.charAt(a) == '8' ||
                    cantidad.charAt(a) == '9' ||
                    cantidad.charAt(a) == '0'
                ) {} else {
                    busca = false;
                    break;
                }
            }
            if (busca) {
                this.cartItems[index].cantidad = cantidad;
                this.$store.dispatch(
                    'cart/AddItemQuantity',
                    this.cartItems[index]
                );
            } else {
                document.getElementById(
                    'icart' + this.cartItems[index].id
                ).value = this.cartItems[index].quantity;
            }
        },

        RemoveQuantity(index) {
            this.$store.dispatch(
                'cart/decreaseCartItemQuantity',
                this.cartItems[index]
            );
            // this.loadCartProducts();
        },

        AddQuantity(index) {
            this.$store.dispatch(
                'cart/increaseCartItemQuantity',
                this.cartItems[index]
            );
            // this.loadCartProducts();
        },

        async loadCartProducts() {
            console.log('otener cookies');
            const cookieCart = this.$cookies.get('cart', {
                parseJSON: true
            });
            let queries = [];
            console.log('recorriendo carrito');
            cookieCart.cartItems.forEach((item) => {
                queries.push(item.id);
            });
            console.log('en caso de carrito no vacio');
            location.reload();
            if (this.cartItems.length > 0) {
                // Comparar con productMiniCart
                console.log('empezamos ciclo');
                const response = await this.$store.dispatch(
                    // <----- fix this
                    'product/getCartProducts',
                    queries
                );
                console.log('obtenemos carrito');
                console.log('carrito actualizado');
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                console.log('carrito no actualizado');
                this.$store.commit('product/setCartProducts', null);
            }
        },

       async deletearma(registro){
         let msg =   await this.handleRemoveProductFromCart(registro)
           await this.handleRemoveProductFromCart(registro)
                this.$notify({
                group: 'addCartSuccess',
                title: 'Eliminacion de arcon',
                text: msg,
                type: 'danger',
            });
        },

        async handleRemoveProductFromCart(registro) {
            console.log("Vas a borrar: " + registro);
            let msg = this.$store.dispatch('cotizacionarcon/deletearm', registro);
            let noti= ''
            msg.then(value => {
            //     this.$notify({
            //     group: 'addCartSuccess',
            //     title: 'Eliminacion de arcon',
            //     text: value,
            //     type: 'danger',
            // });
            noti = value
            }).catch(err => {
            //      this.$notify({
            //     group: 'addCartSuccess',
            //     title: 'Aviso',
            //     text: err,
            //     type: 'danger',
            // });
            noti = value
            }); 
             await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
            let cotacti = this.cotizaciones.filter(x => x.id == localStorage.getItem('idcot'))
            console.log(cotacti)
            this.$store.dispatch('cotizacionarcon/getactiva', cotacti[0]);
            console.log("Se actualizo")
            return noti;
            //  await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
            //  let cotacti = this.cotizaciones.filter(x => x.id == localStorage.getItem('idcot'))
            // console.log(cotacti)
            // this.$store.dispatch('cotizacionarcon/getactiva', cotacti[0]);
            // console.log("Se actualizo")
            // console.log(cotacti)

            // const cartItem = this.cartItems.find(
            //     (item) => item.id === product.id
            // );
            // console.log({
            //     cartItem
            // });
            // this.$store.dispatch('cart/removeProductFromCart', cartItem);
            // this.$store.commit('cart/setLoading', true);
            // this.loadCartProducts();
            //location.reload();

        },
        parseData() {
            // this.cot = this.cotizacion.arcones
            // for (let index = 0; index < this.cot.length; index++) {
            //     console.log(this.cot[index])
            // }
            this.listacot.length = 0
            let cotlist = this.cotizacion.arcones
            console.log("Tengo: " + cotlist.length)
            if (cotlist.length > 0) {
                for (let index = 0; index < cotlist.length; index++) {
                this.listacot.push({
                    cantidad: cotlist[index].cantidad,
                    gama: cotlist[index].gama,
                    id: cotlist[index].id,
                    registro: cotlist[index].id_registro,
                    img: cotlist[index].img,
                    iva: cotlist[index].iva,
                    nombre: cotlist[index].nombre,
                    precio_unitario_sin_iva: cotlist[index].precio_unitario_sin_iva,
                    productos: cotlist[index].productos,
                    sku: cotlist[index].sku,
                    sub_total: cotlist[index].sub_total,
                    tipo: cotlist[index].tipo,
                    total: cotlist[index].total,
                    cantact: ''
                })
            }
            console.log(this.listacot) 
            }
            else {
                this.listacot = []
            }
           
        },
    },
    watch: {
        $props: {
            handler() {
                this.parseData();
            },
            deep: true,
            immediate: true,
        },
    },

};
</script>

<style lang="scss" scoped>
</style>
