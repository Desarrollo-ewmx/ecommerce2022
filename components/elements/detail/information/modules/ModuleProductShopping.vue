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
                    <input
                        v-model="quantity"
                        class="form-control"
                        type="text"
                        min=1
                        style="display:block"
                        @change="checkquantity"
                    />
                </div>
            </figure>
            <!-- Seleccionar cotización y dar aceptar para la que se va a pintar en el carrito  -->
            <b-button class="ml-2 mt-2" variant="info" size="lg" @click.prevent="handleAddToCart">Aceptar</b-button>
        </div>
        <div>
            <div>
                <nuxt-link 
                size="lg"
                class="ps-btn mt-2 ml-2 float-right"
                to="/account/cotizaciones">
                    Crear nueva cotizacion
                </nuxt-link>
            </div>
        </div>
            <figcaption>
                <v-btn v-if="incart > 0 " color="success" class="mt-2" to="/account/shopping-cart"> 
                    <i class="icon-bag2" style="font-size:2em"></i> <span class="" style="font-size:2em">{{ incart }}</span>
                </v-btn>
            </figcaption>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

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
        }),
    },
    data() {
        return {
            quantity: 1,
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
        handleAddToCart(isBuyNow) {
            if (this.cotizaciones.length == 0) {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Error',
                    text: 'No existe una cotizacion para agregar el producto, por favor cree una',
                    type: 'danger',
                });
            } else {
                const cartItemsOnCookie = this.$cookies.get('cart', {
                    parseJSON: true,
                });
                let existItem;
                if (cartItemsOnCookie) {
                    existItem = cartItemsOnCookie.cartItems.find(
                        (item) => item.id === this.product.id
                    );
                    console.log(this.handleAddToCart);
                }
                let item = {
                    id: this.product.id,
                    quantity: this.quantity,
                    price: this.product.price,
                };
                this.addItemToCart(item);
            }
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
};
</script>

<style lang="scss" scoped>
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
