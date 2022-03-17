<template lang="html">
<section class="ps-my-account ps-page--account">
    <div class="container">
        <div class="row">
            <div class="col-lg-4">
                <div class="ps-section__left">
                    <aside class="ps-widget--account-dashboard">
                        <div class="ps-widget__header">
                            <img :src="img" />
                            <figure>
                                <figcaption>Bienvenido</figcaption>
                                <p>{{nombre}}</p>
                            </figure>
                        </div>
                        <div class="ps-widget__content">
                            <AccountLinks :links="accountLinks" />
                        </div>
                    </aside>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="ps-section--account-setting">
                    <div class="ps-section__content">
                        <!-- <div class="row">
                                <div class="col-md-6 col-12">
                                    <figure class="ps-block--address">
                                        <figcaption>
                                            Billing address 
                                        </figcaption>
                                        <div class="ps-block__content">
                                            <p>
                                                You Have Not Set Up This Type Of
                                                Address Yet.
                                            </p>
                                            <nuxt-link
                                                to="/account/edit-address"
                                            >
                                                <a>Edit</a>
                                            </nuxt-link>
                                        </div>
                                    </figure>
                                </div>
                                <div class="col-md-6 col-12">
                                    <figure class="ps-block--address">
                                        <figcaption>
                                            Shipping address
                                        </figcaption>
                                        <div class="ps-block__content">
                                            <p>
                                                You Have Not Set Up This Type Of
                                                Address Yet.
                                            </p>
                                            <nuxt-link
                                                to="/account/edit-address"
                                            >
                                                <a>Edit</a>
                                            </nuxt-link>
                                        </div>
                                    </figure>
                                </div>
                            </div> -->
                    </div>
                </div>

            </div>
        </div>
        <div class="container">
            <TablaDirecciones />
        </div>
    </div>
</section>
</template>

<script>
import AccountLinks from './modules/AccountLinks';
import TablaDirecciones from '~/components/partials/account/modules/TablaDirecciones';
export default {
    name: 'Addresses',
    components: {
        AccountLinks,
        TablaDirecciones,
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Informacion de cuenta',
                    url: '/account/user-information',
                },
                // {
                //     text: 'Notifications',
                //     url: '/account/notifications',
                // },
                // {
                //     text: 'Invoices',
                //     url: '/account/invoices',
                // },
                {
                    text: 'Direcciones',
                    url: '/account/addresses',
                },
                // {
                //     text: 'Recent Viewed Product',
                //     url: '/account/recent-viewed-product',
                // },
                // {
                //     text: 'Wishlist',
                //     url: '/account/wishlist',
                // },
            ],
            nombre: null,
            img: null,
        };
    },
    mounted() {
        if (localStorage.nombre) {
            this.nombre = localStorage.nombre;
        }
        if (localStorage.img) {
            this.img = localStorage.img;
        }
    },
    watch: {
        nombre(newName) {
            localStorage.nombre = newName;
        },
        img(newimg) {
            localStorage.img = newimg;
        },
    },
};
</script>

<style lang="scss" scoped></style>
