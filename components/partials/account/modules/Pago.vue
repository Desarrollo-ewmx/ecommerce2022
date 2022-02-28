<template lang="">
<div class="ps-section__content">
  <UploadFiles></UploadFiles>
    <form class="ps-form--order-tracking" action="/" method="get">
        <div class="form-group">
            <label>Forma de pago</label>
            <input class="form-control" type="text" placeholder="" v-model="paidinfo.fpago" />
        </div>
        <div class="form-group">
            <label>Comentarios ventas</label>
            <textarea v-model="paidinfo.coment" class="form-control" placeholder=""></textarea>
        </div>
        <div class="form-group">
            <button class="ps-btn ps-btn--fullwidth">
                Registrar
            </button>
            {{paidinfo}}
        </div>
    </form>
</div>
</template>

<script>
import SelectFiles from '~/components/partials/account/modules/SelectFiles';
import UploadFiles from '~/components/partials/account/modules/UploadFiles';
export default {
    name: 'Pago',
    components: {
        SelectFiles,
        UploadFiles,
    },
    setup() {},
    data() {
        return {
            paidinfo: {
                comprobante: null,
                fpago: null,
                coment: null,
            },
        };
    },
    methods: {},
};
</script>

<style lang="scss" scoped></style>
