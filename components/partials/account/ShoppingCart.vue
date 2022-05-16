<template lang="html">
    <div class="ps-section--shopping ps-shopping-cart">
        <div class="container">
            <div class="ps-section__header p-0" style="">
                <h1 v-if="cotizacionesactv.nom != null">Resumen de cotización: {{ cotizacionesactv.nom }}</h1>
                <h1 v-else>Resumen de cotización: {{ cotizacionesactv.serie }}</h1>
            </div>
            <div class="ps-section__content">
                <table-shopping-cart :cotizacion.sync="cotizacionesactv" v-if="cotizacionesactv != ''" />
                <p v-else>Carrito de compras vacio</p>
                <div class="ps-section__cart-actions">
                    <nuxt-link to="/shop" class="ps-btn">
                        <i class="icon-arrow-left mr-2"></i>
                        Volver a la tienda
                    </nuxt-link>
                </div>
            </div>
            <div class="ps-section__footer">
                <div class="row justify-content-end">
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <!-- <figure>
                            <figcaption>Cupón de descuento</figcaption>
                            <div class="form-group">
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                            <div class="form-group">
                                <button class="ps-btn ps-btn--outline">
                                    Apply
                                </button>
                            </div>
                        </figure> -->
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 "></div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <div class="ps-block--shopping-total">
                            <div class="ps-block__header">
                                <p>
                                    Subtotal <span> ${{ cotizacionesactv.sub_total }}</span>
                                </p>
                                <p>
                                    IVA <span> ${{ cotizacionesactv.iva }}</span>
                                </p>
                            </div>
                            <div class="ps-block__content">
                                <ul class="ps-block__product">
                                    <!-- <li v-for="(product, index) in cartProducts" :key="product.id">
                                        <span class="ps-block__estimate">
                                            <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                                                {{ product.title }}
                                                <br />
                                                x
                                                {{ cartItems[index].quantity }}
                                            </nuxt-link>
                                        </span>
                                    </li> -->

                                </ul>
                                <h3>
                                    Total <span>${{ cotizacionesactv.total }}</span>
                                </h3>
                            </div>
                        </div>
                        <nuxt-link to="/account/checkout" class="ps-btn ps-btn--fullwidth">
                            Proceed to checkout
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import TableShoppingCart from '~/components/partials/account/modules/TableShoppingCart';

export default {
    name: 'ShoppingCart',
    components: { TableShoppingCart, ProductShoppingCart },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems,
            total: state => state.cart.total,
            amount: state => state.cart.amount,
            cartProducts: state => state.product.cartProducts,
            cotizacionesactv: (state) => state.cotizacionarcon.cotizacionactv,
        })
    },
    methods: {

    },
    created() {
        if (localStorage.getItem('idcot') == null) {
            console.log("No hay nada")
            this.$notify({
                group: 'addCartSuccess',
                title: 'Error',
                text: 'Seleccione una cotizacion',
                type: 'danger',
            });
        }
        else {
            console.log("Seleccionaste la cotizacion")
            console.log(localStorage.getItem('idcot'))
            console.log(this.cotizacionesactv)
        }
    },
    // FIXME: Cannot read property 'quantity' of undefined
    quantity() {
        if (this.cartItems !== null) {
            const cartItem = this.cartItems.find(item => item.id === this.product.id);
            if (cartItem !== undefined) {
                return cartItem.quantity;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
};
</script>

<style lang="scss" scoped>
</style>
