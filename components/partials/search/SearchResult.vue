<template lang="html">
    <div class="ps-shopping">
        <div class="ps-shopping__header">
            <p>
                <strong class="mr-2">{{
                    arcones !== null ? arcones.length : 0
                }}</strong>
                productos encontrados
            </p>
        </div>
        <div class="ps-shopping__content">
            <template v-if="arcones && arcones.length > 0">
                <div class="row">
                    <div
                        v-for="product in pageOfItems"
                        class="col-md-3"
                        :key="product.id"
                    > 
                        <product-default :product="product" />
                    </div>
                </div>
                <div class="ps-shopping__footer text-center pt-40">
                    <jw-pagination :items="arcones" :pageSize="24" @changePage="onChangePage"></jw-pagination>
                </div>
            </template>
            <template v-else>
    <span>Sin resultados</span>
</template>
        </div> 
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'SearchResult',
    components: { ProductDefault },
    computed: {
        ...mapState({
            searchResults: (state) => state.product.searchResults,
            arcones: (state) => state.arcones.arcones,
        }),
    },
    data() {
        return {
            listView: false,
            page: 1,
            pageSize: 12,
            pageOfItems: [],
        };
    },
    methods: {
        onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        },
    },
};
</script>

<style lang="scss" scoped></style>
