<template lang="html">
<section class="ps-page--simple">
    <bread-crumb :breadcrumb="breadCrumb" />
    <div class="ps-order-tracking">
        <div class="container">
            <div class="ps-section__header">
                <h3>Facturacion</h3>
            </div>
        </div>

        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <simple-stepper></simple-stepper>
                    </div>
                </div>
            </div>
        </section>
        
    </div>
</section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import SimpleStepper from '~/components/partials/account/modules/SimpleStepper';

// This components will have the content for each stepper step.

export default {
    transition: 'zoom',
    components: {
        BreadCrumb,
        SimpleStepper,
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/',
                },
                {
                    text: 'Facturacion',
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped></style>
