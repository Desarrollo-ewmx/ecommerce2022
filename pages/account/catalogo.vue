<template lang="html">
    <section class="ps-page--simple">
        <bread-crumb :breadcrumb="breadCrumb"/>
        <div class="ps-order-tracking">
            <div class="container">
                <div class="ps-section__header">
                    <p>
                        <h3>Catalogo</h3>
                    </p>
                </div>
                <div>
                    <b-container class="bv-example-row">
  <b-row>
    <b-col>
        <h2 class="md-3 mb-10 mr-2">Categoria</h2>
        <div></div>
        <div class="ps-list--link">
    <nuxt-link v-for="(value, index) in categorias" :to="value.url" :key="value.index">
        {{value.text}}
        <br>
    </nuxt-link>
    </div>
    </b-col>
    <b-col></b-col>
    <b-col>
        <h2 class="md-3 mb-10 mr-2">Subcategoria</h2>
        <b-container class="bv-example-row">
  <b-row cols="4">
    <nuxt-link class="mr-6" v-for="(value, index) in subcategorias" :to="value.url" :key="value.index">{{value.text}}</nuxt-link>
  </b-row>
</b-container>
    </b-col>
  </b-row>
</b-container>
                </div>
               <!--- <TablaCatalogo /> --->
                    <div class="container"  align="center">
         <div class="col-md-2 mb-12 mr-4" align="center" >
                <b-form-select v-model="imagetype" class="form-control" id="selectedproducts" v-on:change="loadimages">
                    <template #first>
                    <b-form-select-option :value="null" disabled>Filtrar</b-form-select-option>
                    <b-form-select-option v-for="(opcion,index) in selector" :value="opcion.value" v-bind:key="index">{{opcion.text}}</b-form-select-option>
                </template>
                </b-form-select>
                </div>
                </div>
                <div class="carousel-wrapper">
    <client-only>
      <carousel v-bind="options">
        <!----<slide v-for="i in 9" :key="i" class="img-wrapper">
          <img :src="`https://swiperjs.com/demos/images/nature-${i}.jpg`" /> --->
          
              <slide v-for="image in  arreglo" :key="image.index" class="img-wrapper" :navigationEnabled="true">
                  <nuxt-link :to="`/product/${image.ref}`">
                      <img :src="image.url"> 
                  </nuxt-link>
                  <div class="swiper-pagination"></div>
        </slide>
      </carousel>
    </client-only>
  </div>

  <br> 
            </div>
        </div>
<!----
             <vueper-slides 3d fixed-height="50px" arrows-outside bullets-outside>
  <vueper-slide v-for="i in 9" :key="i" :title="i.toString()" />
</vueper-slides>
--->
    </section>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';
import { getColletionBySlug } from '~/utilities/product-helper';
import TablaCatalogo from '~/components/partials/account/modules/TablaCatalogo';
import { baseUrl } from '~/repositories/Repository';

export default {
    name: 'catalogo',
    middlewere: 'authentication',
    transition: 'zoom',
    components: {
        BreadCrumb,
        CarouselArrows,
        TablaCatalogo,
    },
    data: () => {
        return {
            options: {
                loop: true,
                perPage: 5,
                spaceBetween: 15,
                navigator: true,
                scrollbar: {
                    draggable: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.ps-deal-of-day .swiper-next',
                    prevEl: '.ps-deal-of-day .swiper-prev',
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 6,
                    },
                    1366: {
                        slidesPerView: 5,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                },
            },
            arreglo: null,
            imagetype: null,
            selector: [
                { value: 'Paisajes', text: 'Paisajes' },
                { value: 'Tecnologia', text: 'Tecnologia' },
                { value: 'Productos', text: 'Productos' },
            ],
            paisajes: [
                {
                    text: 'P1',
                    url: 'https://swiperjs.com/demos/images/nature-1.jpg',
                    ref: '1',
                },
                {
                    text: 'P2',
                    url: 'https://swiperjs.com/demos/images/nature-2.jpg',
                    ref: '2',
                },
                {
                    text: 'P3',
                    url: 'https://swiperjs.com/demos/images/nature-3.jpg',
                    ref: '3',
                },
                {
                    text: 'P4',
                    url: 'https://swiperjs.com/demos/images/nature-4.jpg',
                    ref: '4',
                },
                {
                    text: 'P5',
                    url: 'https://swiperjs.com/demos/images/nature-5.jpg',
                    ref: '5',
                },
                {
                    text: 'P6',
                    url: 'https://swiperjs.com/demos/images/nature-6.jpg',
                    ref: '6',
                },
                {
                    text: 'P7',
                    url: 'https://swiperjs.com/demos/images/nature-7.jpg',
                    ref: '7',
                },
                {
                    text: 'P8',
                    url: 'https://swiperjs.com/demos/images/nature-8.jpg',
                    ref: '8',
                },
                {
                    text: 'P9',
                    url: 'https://swiperjs.com/demos/images/nature-9.jpg',
                    ref: '9',
                },
            ],
            tecnologia: [
                {
                    text: 't1',
                    url: '/img/products/electronic/1.jpg',
                    ref: '3',
                },
                {
                    text: 't2',
                    url: '/img/products/electronic/2.jpg',
                    ref: '5',
                },
                {
                    text: 't3',
                    url: '/img/products/electronic/3.jpg',
                    ref: '5',
                },
                {
                    text: 't4',
                    url: '/img/products/electronic/4.jpg',
                    ref: '6',
                },
                {
                    text: 't5',
                    url: '/img/products/electronic/5.jpg',
                    ref: '7',
                },
                {
                    text: 't6',
                    url: '/img/products/electronic/6.jpg',
                    ref: '8',
                },
                {
                    text: 't7',
                    url: '/img/products/electronic/7.jpg',
                    ref: '9',
                },
                {
                    text: 't8',
                    url: '/img/products/electronic/8.jpg',
                    ref: '10',
                },
                {
                    text: 't9',
                    url: '/img/products/electronic/9.jpg',
                    ref: '11',
                },
            ],
            consumerElectric: [
                {
                    text: 'Air Conditioners',
                    url: '/shop',
                },
                {
                    text: 'Audios & Theaters',
                    url: '/shop',
                },
                {
                    text: 'Car Electronics',
                    url: '/shop',
                },
                {
                    text: 'Office Electronics',
                    url: '/shop',
                },
                {
                    text: 'TV Televisions',
                    url: '/shop',
                },
                {
                    text: 'Washing Machines',
                    url: '/shop',
                },
            ],
            categorias: [
                {
                    text: 'etiqueta arcones',
                    url: '/shop',
                },
                {
                    text: 'etiqueta productos',
                    url: '/shop',
                },
                {
                    text: 'precios',
                    url: '/shop',
                },
                {
                    text: 'tamaños',
                    url: '/shop',
                },
            ],
            subcategorias: [
                {
                    text: 'Empresarial',
                    url: '/shop',
                },
                {
                    text: 'Regalos',
                    url: '/shop',
                },
                {
                    text: 'Sin alcohol',
                    url: '/shop',
                },
                {
                    text: 'Colaborados',
                    url: '/shop',
                },
                {
                    text: 'Vinos',
                    url: '/shop',
                },
                {
                    text: 'Chocolates',
                    url: '/shop',
                },
                {
                    text: 'Galletas',
                    url: '/shop',
                },
                {
                    text: 'Etc',
                    url: '/shop',
                },
                {
                    text: 'Licores',
                    url: '/shop',
                },
                {
                    text: 'Papitas',
                    url: '/shop',
                },
                {
                    text: 'Refrescos',
                    url: '/shop',
                },
                {
                    text: 'Dulces',
                    url: '/shop',
                },
            ],
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/',
                },
                {
                    text: 'Catalogo',
                },
            ],
            slide: 0,
            sliding: null,
        };
    },
    methods: {
        loadimages() {
            if (this.imagetype == 'Paisajes') {
                this.arreglo = this.paisajes;
            } else if (this.imagetype == 'Tecnologia') {
                this.arreglo = this.tecnologia;
            } else if (this.imagetype == 'Productos') {
                this.arreglo = this.products;
            } else {
                this.arreglo = this.tecnologia;
            }
        },
        beforeMount() {
            this.loadimages();
        },
    },
    props: {
        collectionSlug: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapState({
            collections: (state) => state.collection.collections,
        }),
        baseUrl() {
            return baseUrl;
        },
        products() {
            return getColletionBySlug(this.collections, this.collectionSlug);
        },
    },
};
</script>

<style lang="scss" scoped>
.carousel-wrapper {
    padding: 40px;
    height: 200px;
    .VueCarousel-slide {
        text-align: center;
    }
}
.img-wrapper img {
    margin: auto;
    width: 200px;
    height: 200px;
    background-image: linear-gradient(gray 100%, transparent 0);
}

#homepage-1 {
    .ps-deal-of-day {
        .ps-carousel {
            .swiper-pagination {
                position: relative;
                top: 0;
                left: 0;
                transform: translate(0, 0);
                margin-top: 10px;
                display: block !important;
                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
