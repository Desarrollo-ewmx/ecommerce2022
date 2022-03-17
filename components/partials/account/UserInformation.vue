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
                    <section class="ps-section--account-setting">
                        <div class="ps-section__content">
                            <p>No product here.</p>
                        </div>
                        <iframe src="https://www.retrogames.cc/embed/10441-the-simpsons-4-players-world-set-1.html" width="600" height="450" frameborder="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import AccountLinks from './modules/AccountLinks';
export default {
    name: 'UserInformation',
    components: { AccountLinks },
    computed: {
        ...mapState({
            // name: (state) => state.auth.nombre,
            // img: (state) => state.auth.img,
        }),
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Informacion de cuenta',
                    url: '/account/user-information',
                    icon: 'icon-user',
                },
                // {
                //     text: 'Notifications',
                //     url: '/account/notifications',
                //     icon: 'icon-alarm-ringing',
                // },
                // {
                //     text: 'Invoices',
                //     url: '/account/invoices',
                //     icon: 'icon-papers',
                // },
                {
                    text: 'Direcciones',
                    url: '/account/addresses',
                    icon: 'icon-map-marker',
                },
                // {
                //     text: 'Recent Viewed Product',
                //     url: '/account/recent-viewed-product',
                //     icon: 'icon-store',
                //     active: true,
                // },
                // {
                //     text: 'Wishlist',
                //     url: '/account/wishlist',
                //     icon: 'icon-heart',
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
    // beforeMount() {
    //     document.getElementById("nombre").innerHTML = localStorage.getItem("nombre");
    //     document.getElementById("img").innerHTML = localStorage.getItem("img");
    // },
};
</script>

<style lang="scss" scoped></style>
