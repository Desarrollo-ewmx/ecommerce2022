<template lang="html">
<section class="ps-page--simple">
    <bread-crumb :breadcrumb="breadCrumb" />
    <div class="ps-order-tracking">
        <div class="container">
            <div class="ps-section__header">
                <h3>Pago</h3>
                <h3>Total</h3>
            </div>
            <Pago />
        </div>
    </div>
</section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Pago from '~/components/partials/account/modules/Pago';

export default {
    transition: 'zoom',
    components: {
        BreadCrumb,
        Pago,
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/',
                },
                {
                    text: 'Pago',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
