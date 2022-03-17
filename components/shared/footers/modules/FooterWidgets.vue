<template lang="html">
    <div class="ps-footer__widgets">
        <aside class="widget widget_footer widget_contact-us">
            <h4 class="widget-title">
                {{ $t('Contáctanos') }}
            </h4>
            <div class="widget_content">
                <h3>{{info.tel}} ext {{info.ext}}</h3>
                <p>
                    {{info.direccion}} <br />
                    <a :href="sendm">{{info.correo_ventas}}</a>
                </p>
                <ul class="ps-list--social">
                    <li>
                        <a class="facebook" :href="info.face">
                            <i class="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a class="twitter" :href="info.twitter">
                            <i class="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a class="linkedin" :href="info.link">
                            <i class="fa fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a class="youtube" :href="info.youtube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
</svg>
                        </a>
                    </li>
                    <li>
                        <a class="instagram" :href="info.insta">
                            <i class="fa fa-instagram"></i>
                        </a>
                    </li>
                    
                </ul>
            </div>
        </aside>
        <aside class="widget widget_footer">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.quickLink') }}
            </h4>
            <ul class="ps-list--link">
                <li>
                    <a href="#">Policy</a>
                </li>
                <li>
                    <a href="#">Term & Condition</a>
                </li>
                <li>
                    <a href="#">Shipping</a>
                </li>
                <li>
                    <a href="#">Return</a>
                </li>
                <li>
                    <a href="faqs.html">FAQs</a>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_footer">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.company') }}
            </h4>
            <ul class="ps-list--link">
                <li>
                    <a href="about-us.html">About Us</a>
                </li>
                <li>
                    <a href="#">Affilate</a>
                </li>
                <li>
                    <a href="#">Career</a>
                </li>
                <li>
                    <a href="contact-us.html">Contact</a>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_footer">
            <h4 class="widget-title">
                {{ $t('footer.widgetHeading.bussiness') }}
            </h4>
            <ul class="ps-list--link">
                <li>
                    <a href="#">Our Press</a>
                </li>
                <li>
                    <a href="checkout.html">Checkout</a>
                </li>
                <li>
                    <a href="my-account.html">My account</a>
                </li>
                <li>
                    <a href="shop-default.html">Shop</a>
                </li>
            </ul>
        </aside>
    </div>
</template>

<script>
export default {
    name: 'FooterWidgets',
    data() {
        return {
            info: [],
            sendm: '',
        };
    },
    methods: {
        async getcontact() {
            var resp = await this.$store.dispatch('info/setinfonet');
            const result = this.$store.getters['info/getsn'];
            this.info = result[0];
            this.sendm = 'mailto:' + this.info.correo_ventas;
            console.log(this.info.empresa);
        },
    },
    beforeMount() {
        this.getcontact();
    },
};
</script>

<style lang="scss" scoped></style>