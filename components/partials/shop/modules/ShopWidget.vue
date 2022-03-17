<template lang="html">
    <div id="shop-widgets">
        <aside class="widget widget_shop">
            <h4 class="widget-title">
                {{ $t('Categorias') }}
            </h4>
            <ul v-if="categories !== undefined" class="ps-list--categories">
                <li>
                    <a href="#" @click.prevent="handleGotoCategory(null)">
                        Todos los productos
                    </a>
                </li>
                <li v-for="category in categories" :key="category.id">
                    <a
                        href="#"
                        @click.prevent="handleGotoCategory(category)"
                    >
                        {{ category }}
                    </a>
                </li>
            </ul>
        </aside>
        <aside class="widget widget_shop">
            <!-- <h4 class="widget-title">
                {{ $t('shop.widget.byBrands') }}
            </h4>
            <figure>
                <v-checkbox
                    v-for="brand in brands"
                    v-model="selectedBrands"
                    :value="brand.slug"
                    :label="brand.name"
                    :key="brand.id"
                    @click="handleFilterByBrand"
                />
            </figure> -->
            <figure>
                <h4 class="widget-title">
                    {{ $t('Filtrar precios') }}
                </h4>
                <v-range-slider
                    v-model="priceRange"
                    color="warning"
                    min="200"
                    max="6300"
                    track-color="#dddddd"
                    @end="handleFilterByPriceRagne"
                />
                <p>
                    Precio: ${{ priceRange[0].toFixed(2) }} - ${{
                        priceRange[1].toFixed(2)
                    }}
                </p>
            </figure>
        </aside>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import { serializeQuery } from '~/repositories/Repository';

export default {
    name: 'ShopWidget',
    computed: {
        ...mapState({
            // categories: (state) => state.product.categories,
            brands: (state) => state.product.brands,
            products: (state) => state.product.products,
        }),
        categorySlug() {
            console.log(this.$route);
            return this.$route;
        },
    },
    data() {
        return {
            priceRange: [200, 6300],
            selectedBrands: [],
            categories: [
                'Económica',
                'Economico',
                'Intermedia',
                'Ejecutiva',
                'Empresarial',
                'Express',
                'Premium',
            ],
        };
    },
    mounted() {
        if (this.$route.query.gama) {
            this.$store.dispatch(
                'arcones/getArconbygama',
                this.$route.query.gama
            );
            this.$store.commit('collection/setQueries', [
                this.$route.query.gama,
            ]);
        }
    },
    methods: {
        async handleGotoCategory(slug) {
            if (slug) {
                // for (let index = 0; index < this.categories2.length; index++) {
                //     console.log(this.categories2[index]);
                // }
                // const url = `/shop?category=${slug}`;
                // const products = getColletionBySlug(this.categories, slug);
                // this.$store.commit('product/setProducts', products);
                // this.$store.commit('product/setProducts', products);
                // this.$store.commit('product/setTotal', products.length);
                this.$store.dispatch('arcones/getArconbygama', slug);
                this.$store.commit('collection/setQueries', [slug]);
                // this.$router.push(url);
            } else {
                const params = {
                    _start: 1,
                    _limit: 12,
                };
                await this.$store.commit('collection/setQueries', null);
                await this.$store.dispatch('arcones/setarmados');
                // await this.$store.dispatch('product/getTotalRecords', params);
                // await this.$store.dispatch('product/getProducts', params);
                // this.$router.push('/shop');
            }
        },

        async handleFilterByBrand() {
            if (this.selectedBrands) {
                await this.$store.commit(
                    'collection/setQueries',
                    this.selectedBrands
                );

                await this.$store.dispatch(
                    'product/getProductsByBrands',
                    this.selectedBrands
                );
            } else {
                const params = {
                    _start: 1,
                    _limit: 12,
                };
                await this.$store.commit('collection/setQueries', null);
                // await this.$store.dispatch('product/getTotalRecords', params);
                await this.$store.dispatch('product/getProducts', params);
            }
        },

        async handleFilterByPriceRagne() {
            const params = {
                price_gt: this.priceRange[0],
                price_lt: this.priceRange[1],
            };
            // console.log(this.priceRange);
            await this.$store.dispatch('arcones/getArconByPriceRange', params);
            // await this.$store.dispatch(
            //     'product/getProductsByPriceRange',
            //     params
            // );
            this.priceRange[0] = 200;
            this.priceRange[1] = 6300;
            // await this.$router.push(`/search?${serializeQuery(params)}`);
        },
    },
};
</script>

<style lang="scss" scoped></style>
