<!-- FIXME: Modulo de producto individual -->
<template lang="html">
    <div class="ps-product__info">
        <module-product-info :arcon="arcon" />

        <module-product-detail-desc :product="product" :arcon="arcon" />

        <!-- <cotselect /> -->
        <!-- <div v-if="coti">

        </div>
        <h3>Cotizacion activar</h3>
        <h2>{{cotizacionesactv.nom}} - {{cotizacionesactv.serie}}</h2> -->
        <!-- Tabla de cotizaciones por producto -->
        <module-tabla-cotizaciones-producto />

        <module-product-shopping :product="product" :arcon="arcon" />

        <module-product-detail-specification />

        <!-- <module-product-detail-sharing /> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Cotselect from '~/components/shared/headers/modules/Cotselect';
import ModuleProductDetailSharing from '~/components/elements/detail/information/modules/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '~/components/elements/detail/information/modules/ModuleProductDetailSpecification';
import ModuleProductDetailDesc from '~/components/elements/detail/information/modules/ModuleProductDetailDesc';
import ModuleTablaCotizacionesProducto from '~/components/elements/detail/information/modules/ModuleTablaCotizacionesProducto';
import Rating from '~/components/elements/Rating';
import ModuleProductShopping from '~/components/elements/detail/information/modules/ModuleProductShopping';
import ModuleProductInfo from '~/components/elements/detail/information/modules/ModuleProductInfo';

export default {
    name: 'InformationDefault',
    components: {
        ModuleProductInfo,
        ModuleProductShopping,
        Rating,
        ModuleProductDetailDesc,
        ModuleTablaCotizacionesProducto,
        ModuleProductDetailSpecification,
        ModuleProductDetailSharing,
        Cotselect,
    },
    props: {
        arcon: {
            type: Object,
            require: true,
            default: () => { },
        },
    },
    computed: {
        ...mapState({
            product: (state) => state.product.product,
            cotizaciones: (state) => state.cotizacion.cotizaciones,
            cotizacionesactv: (state) => state.cotizacionarcon.cotizacionactv,
        }),
    },
};
</script>

<style lang="scss" scoped>
</style>
