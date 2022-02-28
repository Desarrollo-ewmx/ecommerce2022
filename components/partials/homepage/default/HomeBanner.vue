<template lang="html">
    <div class="ps-home-banner ps-home-banner--1">
        <div class="ps-container">
            <div class="ps-section__left">
                <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <!-- <div
                                class="ps-banner"
                                :style="{
                                    backgroundImage: `url(img)`
                                }"
                            ></div> -->
                            <img :src="img"/>
                        </div>
                        <div class="swiper-slide">
                            <!-- <div
                                class="ps-banner"
                                :style="{
                                    backgroundImage: `url(/img/slider/home-1/slide-2.jpg)`
                                }"
                            ></div> -->
                            <img :src="img2"/>
                        </div>
                        <div class="swiper-slide">
                            <!-- <div
                                class="ps-banner"
                                :style="{
                                    backgroundImage: `url(/img/slider/home-1/slide-3.jpg)`
                                }"
                            ></div> -->
                            <img :src="img3"/>
                        </div>
                    </div>
                    <!--Carousel controls-->
                    <div class="swiper-nav">
                        <span class="swiper-arrow swiper-prev"
                            ><i class="icon-chevron-left"></i
                        ></span>
                        <div class="swiper-arrow swiper-next">
                            <i class="icon-chevron-right"></i>
                        </div>
                    </div>
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
            </div>
            <div class="ps-section__right">
                <nuxt-link to="/shop" class="ps-collection">
                    <img
                        src="/img/slider/home-1/promotion-1.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop" class="ps-collection">
                    <img
                        src="/img/slider/home-1/promotion-2.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeBanner',
    data() {
        return {
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev',
                },
            },
            cya: [],
            img: '',
            img2: '',
            img3: '',
            img4: '',
            img5: '',
        };
    },
    methods: {
        async getproducts() {
            var resp = await this.$store.dispatch('arcones/setarmados');
            const result = this.$store.getters['arcones/getproducts'];
            this.cya = result;
            console.log(this.cya[5].ruta_Completa);
            this.img = this.cya[0].ruta_Completa;
            this.img2 = this.cya[1].ruta_Completa;
            this.img3 = this.cya[2].ruta_Completa;
        },
    },
    beforeMount() {
        this.getproducts();
    },
};
</script>

<style lang="scss" scoped></style>
