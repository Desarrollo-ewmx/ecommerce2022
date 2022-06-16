<<template lang="html">
<div class="ps-product__shopping">
    <div>
        <h5>Cantidad: </h5>
        <figure>
            <div class="form-group--number">
                <button class="up" @click.prevent="handleIncreaseQuantity">
                    <i class="fa fa-plus"></i>
                </button>
                <div v-if="quantity > 1">
                    <button class="down" @click.prevent="handleDescreaseQuantity">
                        <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input v-model="quantity" class="form-control" type="text" min=1 style="display:block" @change="checkquantity" />
            </div>
        </figure>
        <!-- Seleccionar cotización y dar aceptar para la que se va a pintar en el carrito  -->
        <b-button class="ml-2 mt-2" variant="info" size="lg" @click.prevent="handleAddToCart">Agregar</b-button>
    </div>
    <div>
        <div>
            <nuxt-link size="lg" class="ps-btn mt-2 ml-2 float-right" to="/account/cotizaciones">
                Crear nueva cotizacion
            </nuxt-link>
        </div>
    </div>
    <figcaption>
        <v-btn v-if="incart > 0" color="success" class="mt-2" to="/account/shopping-cart">
            <i class="icon-bag2" style="font-size:2em"></i> <span class="" style="font-size:2em">{{ incart }}</span>
        </v-btn>
    </figcaption>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex';

export default {
    name: 'ModuleProductShopping',
    props: {
        product: {
            type: Object,
            default: () => {},
        },
        arcon: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
    computed: {
        incart() {
            let result = 0;
            this.cartItems.forEach((element) => {
                if (element.id == this.arcon.id) {
                    result = element.quantity;
                }
            });
            return result;
        },
        ...mapState({
            cartItems: (state) => state.cart.cartItems,
            cotizaciones: (state) => state.cotizacion.cotizaciones,
            cotact: (state) => state.cotizacionarcon.cotizacionactv,

        }),
    },
    data() {
        return {
            quantity: 1,
            arminfo: {
                idarm: '',
                cant: '',
                cantdirec: 0,
                constenv: 0,
                cotid: '',
                validflag: false,
            },
            listacot: '',
            idcotpoint: '',
            cotizacionarcon: {
                cantTotalArc: 0,
                constenv: 0.0,
                idcot: '',
                cantdirec: 0,
                id: null,
                id_registro: ''
            },
        };
    },
    methods: {
        checkquantity() {
            if (this.quantity < 1) {
                this.quantity = 1;
            }
        },
        handleIncreaseQuantity() {
            this.quantity++;
            this.$store.dispatch('cotizacion/addcantidad', this.quantity);
        },
        handleDescreaseQuantity() {
            this.quantity--;
            this.$store.dispatch('cotizacion/addcantidad', this.quantity);
        },
        async handleAddToCart(isBuyNow) {
            if (localStorage.getItem('idcot') == null) {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Error',
                    text: 'Seleccione o cree una cotizacion para añadir su arcon',
                    type: 'danger',
                });
            }
            // else if (localStorage.getItem('idcot') == null) {
            //     this.$notify({
            //         group: 'addCartSuccess',
            //         title: 'Error',
            //         text: 'Seleccione una cotizacion para agregar el arcon',
            //         type: 'danger',
            //     });
            // }
            else {
                this.listacot = this.cotact.arcones
                if (this.product == null) {
                    for (let index = 0; index < this.listacot.length; index++) {
                        if (this.listacot[index].id == this.$route.params.id) {
                            this.validflag = true
                            this.idcotpoint = index
                            console.log("El valor de la bandera es: " + this.validflag)
                            console.log("Lo encontre en: " + this.idcotpoint)
                        } 

                    }
                    if (this.validflag) {
                        console.log("No se puede agregar por que ya existe")
                        console.log(this.listacot[this.idcotpoint])
                        let cotizacion = this.listacot[this.idcotpoint]
                        console.log("Actualizare " + cotizacion.nombre + " de " + cotizacion.cantidad + " a " + this.quantity);
                        let activa = this.cotact
                        console.log("La cotizacion a editar es")
                        console.log(activa.serie)
                        this.cotizacionarcon.idcot = this.cotact.id
                        this.cotizacionarcon.id = cotizacion.id
                        this.cotizacionarcon.cantTotalArc = this.quantity + cotizacion.cantidad
                        this.cotizacionarcon.id_registro = cotizacion.id_registro
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
                        this.$notify({
                            group: 'addCartSuccess',
                            title: 'Listo',
                            text: "Arcones añadidos",
                            type: 'danger',
                        });
                        this.validflag = false
                    } else {
                        console.log("El arcon tiene el id: " + this.$route.params.id)
                        this.arminfo.idarm = this.$route.params.id
                        this.arminfo.cant = this.quantity
                        this.arminfo.cotid = localStorage.getItem('idcot')
                        console.log("Se enviara")
                        console.log(this.arminfo)
                        let msg = await this.$store.dispatch("cotizacionarcon/addtocot", this.arminfo)
                        await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
                        this.$notify({
                            group: 'addCartSuccess',
                            title: 'Listo',
                            text: msg,
                            type: 'danger',
                        });
                        this.validflag = false
                    }
                } else {
                    for (let index = 0; index < this.listacot.length; index++) {
                        if (this.listacot[index].id == this.$route.params.id) {
                            this.validflag = true
                            console.log("El valor de la bandera es: " + this.validflag)
                        }
                    }
                    if (this.validflag) {
                        console.log("No se puede agregar por que ya existe")
                        console.log(this.listacot[this.idcotpoint])
                        let cotizacion = this.listacot[this.idcotpoint]
                        console.log("Actualizare " + cotizacion.nombre + " de " + cotizacion.cantidad + " a " + this.quantity);
                        let activa = this.cotact
                        console.log("La cotizacion a editar es")
                        console.log(activa.serie)
                        this.cotizacionarcon.idcot = this.cotact.id
                        this.cotizacionarcon.id = cotizacion.id
                        this.cotizacionarcon.cantTotalArc = this.quantity
                        this.cotizacionarcon.id_registro = cotizacion.id_registro
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
                        this.$notify({
                            group: 'addCartSuccess',
                            title: 'Listo',
                            text: "Arcones añadidos",
                            type: 'danger',
                        });
                        this.validflag = false
                    } else {
                        console.log("El arcon tiene el id: " + this.product.id)
                        this.arminfo.idarm = this.product.id
                        this.arminfo.cant = this.quantity
                        this.arminfo.cotid = localStorage.getItem('idcot')
                        console.log("Se enviara")
                        console.log(this.arminfo)
                        let msg = await this.$store.dispatch("cotizacionarcon/addtocot", this.arminfo)
                        await this.$store.dispatch('cotizacionarcon/getCot', localStorage.id);
                        this.$notify({
                            group: 'addCartSuccess',
                            title: 'Listo',
                            text: msg,
                            type: 'danger',
                        });
                        this.validflag = false
                    }
                }
            }
            // else {
            //     const cartItemsOnCookie = this.$cookies.get('cart', {
            //         parseJSON: true,
            //     });
            //     let existItem;
            //     if (cartItemsOnCookie) {
            //         existItem = cartItemsOnCookie.cartItems.find(
            //             (item) => item.id === this.product.id
            //         );
            //         console.log(this.handleAddToCart);
            //     }
            //     let item = {
            //         id: this.product.id,
            //         quantity: this.quantity,
            //         price: this.product.price,
            //     };
            //     this.addItemToCart(item);
            // }
        },
        addItemToCart(payload) {
            this.quantity = 1;
            this.$store.dispatch('cart/addProductToCart', payload);
            this.getCartProduct(this.cartItems);
            console.log(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Agregado a su carrito',
                text: `${this.product.title} - añadido a la cotización!`,
            });
        },
        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach((item) => {
                listOfIds.push(item.id);
            });
            await this.$store.dispatch('product/getCartProducts', listOfIds);
        },
        async loadCartProducts() {
            const cartItemsOnCookie = this.$cookies.get('cart', {
                parseJSON: true,
            });
            let queries = [];
            cartItemsOnCookie.cartItems.forEach((item) => {
                queries.push(item.id);
            });
            if (this.cartItems.length > 0) {
                await this.$store.dispatch('product/getCartProducts', queries);
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
    },
    created() {
        console.log("tengo")
        console.log(this.product)
    },
};
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
