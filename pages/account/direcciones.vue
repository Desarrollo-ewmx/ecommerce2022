<template lang="html">
    <section class="ps-page--simple">
        <bread-crumb :breadcrumb="breadCrumb"/>
        <div class="ps-order-tracking">
            <div class="container">
                <div class="ps-section__header">
                    <p>
                        <h3>Direcciones</h3>
                    </p>
                </div>
                <Direcciones/>
                <TablaDirecciones/>
                <div margin-right="20px" align="right"> 
                    <button class="ps-btn" @click.prevent="guardarCookie()">
                        Ligar tipo arcon de cotizacion
                    </button>
                    <button class="ps-btn" @click.prevent="guardarCookie()">
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Direcciones from '~/components/partials/account/modules/Direcciones';
import BreadCrumb from '~/components/elements/BreadCrumb';
import TablaDirecciones from '~/components/partials/account/modules/TablaDirecciones';
export default {
    name: 'direciones',
    middlewere: 'authentication',
    transition: 'zoom',
    components: {
        BreadCrumb,
        TablaDirecciones,
        Direcciones,
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Inicio',
                    url: '/',
                },
                {
                    text: 'Direcciones',
                },
            ],
        };
    },
};
</script>