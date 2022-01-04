<!-- FIXME: Modulo de producto individual -->
<template lang="html">
    <div class="ps-product__info">
        <module-product-info :product="product" />

        <module-product-detail-desc :product="product" />

        <!-- Tabla de cotizaciones por producto -->
        <module-tabla-cotizaciones-producto />

        <module-product-shopping :product="product" />

        <module-product-detail-specification />

        <module-product-detail-sharing />
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
        ModuleProductDetailSharing
    },
    computed: {
        ...mapState({
            product: state => state.product.product,
            cotizaciones: state => state.cotizacion.cotizaciones
        })
    }
};
</script>

<style lang="scss" scoped></style>
