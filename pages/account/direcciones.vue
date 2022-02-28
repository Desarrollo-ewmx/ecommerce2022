<template lang="html">
<section class="ps-page--simple">
    <bread-crumb :breadcrumb="breadCrumb" />
    <div class="ps-order-tracking">
        <div class="container">
            <div class="ps-section__header">
                <p>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col">
                                <h3 class="col-md-2" align="center">Direcciones</h3>
                            </div>
                            <div class="col">
                                <div class="form-check form-check-inline">
                                    <button class="ps-btn mr-5">
                                        Importar direcciones
                                    </button>
                                    <button class="ps-btn ">
                                        Descargar ejemplo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </p>

            </div>
            <Direcciones />
            <TablaDirecciones />
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
    middleware: 'validation',
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
