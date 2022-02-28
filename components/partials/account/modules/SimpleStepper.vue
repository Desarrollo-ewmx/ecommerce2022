<template>
    <div>
        <div class="card-style">
            <b-progress :value="progress" variant="success"></b-progress>
        </div>
        <b-card
            v-if="current_step == 1"
            class="card-style"
            title="Datos generales"
        >
            <b-card-text>
                <form @submit.stop.prevent="onClickNext">
                    <div align="center">
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Pais</label
                                >
                                <b-form-input
                                    v-model="dirfac.pais"
                                    type="text"
                                    class="form-control"
                                    id="validacionPais"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >CP</label
                                >
                                <b-form-input
                                    v-model="dirfac.cp"
                                    type="text"
                                    class="form-control"
                                    id="validacionCP"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Ciudad</label
                                >
                                <b-form-input
                                    v-model="dirfac.city"
                                    type="text"
                                    class="form-control"
                                    id="validacionCiudad"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Delegacion o municipio</label
                                >
                                <b-form-input
                                    v-model="dirfac.municipio"
                                    type="text"
                                    class="form-control"
                                    id="validacionMunicipio"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Colonia</label
                                >
                                <b-form-input
                                    v-model="dirfac.colonia"
                                    type="text"
                                    class="form-control"
                                    id="validacionColonia"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Calle</label
                                >
                                <b-form-input
                                    v-model="dirfac.calle"
                                    type="text"
                                    class="form-control"
                                    id="validacionCalle"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Telefono fijo</label
                                >
                                <b-form-input
                                    v-model="dirfac.telf"
                                    type="tel"
                                    class="form-control"
                                    id="validacionTelf"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Telefono movil</label
                                >
                                <b-form-input
                                    v-model="dirfac.telm"
                                    type="tel"
                                    class="form-control"
                                    id="validacionTelm"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >No. exterior</label
                                >
                                <b-form-input
                                    v-model="dirfac.noext"
                                    type="text"
                                    class="form-control"
                                    id="validacionNoext"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >No. interior</label
                                >
                                <b-form-input
                                    v-model="dirfac.noint"
                                    type="text"
                                    class="form-control"
                                    id="validacionNoint"
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <b-button
                        class="float-right"
                        type="submit"
                        variant="primary"
                        >Siguiente</b-button
                    >
                </form>
            </b-card-text>
        </b-card>
        <b-card
            v-if="current_step == 2"
            class="card-style"
            title="Datos fiscales"
        >
            <b-card-text>
                <form @submit.stop.prevent="send">
                    <div align="center">
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Nombre o razon social</label
                                >
                                <b-form-input
                                    v-model="datafac.nameors"
                                    type="text"
                                    class="form-control"
                                    id="validacionrs"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >RFC</label
                                >
                                <b-form-input
                                    v-model="datafac.rfc"
                                    type="text"
                                    class="form-control"
                                    id="validacionrfc"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Concepto</label
                                >
                                <b-form-input
                                    v-model="datafac.concept"
                                    type="text"
                                    class="form-control"
                                    id="validacionconcept"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Uso de CFDI</label
                                >
                                <b-form-input
                                    v-model="datafac.cfdi"
                                    type="text"
                                    class="form-control"
                                    id="validacioncfdi"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Correo</label
                                >
                                <b-form-input
                                    v-model="datafac.email"
                                    type="email"
                                    class="form-control"
                                    id="validacionemail"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Codigo de facturacion</label
                                >
                                <b-form-input
                                    v-model="datafac.codefac"
                                    type="text"
                                    class="form-control"
                                    id="validacioncodefac"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Metodo de pago</label
                                >
                                <b-form-input
                                    v-model="datafac.pay"
                                    type="text"
                                    class="form-control"
                                    id="validacionpay"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Formas de pago</label
                                >
                                <b-form-input
                                    v-model="datafac.payform"
                                    type="text"
                                    class="form-control"
                                    id="validacionpayform"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                        <div></div>
                        <div class="form-check form-check-inline">
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Banco de cuenta de retiro</label
                                >
                                <b-form-input
                                    v-model="datafac.bank"
                                    type="text"
                                    class="form-control"
                                    id="validacionbank"
                                    required
                                >
                                </b-form-input>
                            </div>
                            <div class="col-md-7 mb-4 mr-2">
                                <label
                                    class="
                                        mb-6
                                        text-center
                                        d-flex
                                        justify-content-center
                                        align-items-center
                                    "
                                    >Ultimos 4 digitos de cuenta de
                                    retiro</label
                                >
                                <b-form-input
                                    v-model="datafac.last4n"
                                    type="text"
                                    class="form-control"
                                    id="validacionlast4n"
                                    maxlength="4"
                                    required
                                >
                                </b-form-input>
                            </div>
                        </div>
                    </div>
                    <b-button
                        class="float-right"
                        type="submit"
                        variant="primary"
                        >Siguiente</b-button
                    >
                </form>
                <b-button
                    class="float-left"
                    variant="secondary"
                    @click="onClickBack"
                    >Back</b-button
                >
            </b-card-text>
        </b-card>
        <b-card v-if="current_step == 3" class="card-style" title="STEP3">
            <b-card-text>For furthermore in 3rd step.</b-card-text>
            <b-button
                class="float-left"
                variant="secondary"
                @click="onClickBack"
                >Back</b-button
            >
            <b-button class="float-right" variant="primary" @click="onClickNext"
                >Next</b-button
            >
        </b-card>
        <b-card v-if="current_step == 4" class="card-style" title="STEP4">
            <b-card-text>Will soon finish.</b-card-text>
            <b-button
                class="float-left"
                variant="secondary"
                @click="onClickBack"
                >Back</b-button
            >
            <b-button class="float-right" variant="primary" @click="onClickNext"
                >Next</b-button
            >
        </b-card>
        <b-card v-if="current_step == 5" class="card-style" title="STEP5">
            <b-card-text>Finished!</b-card-text>
            <b-button
                class="float-left"
                variant="secondary"
                @click="onClickBack"
                >Back</b-button
            >
            <b-button
                class="float-center"
                variant="success"
                @click="onClickFirst"
                >Back to first</b-button
            >
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'SimpleStepper',
    data() {
        return {
            current_step: 1,
            max_step: 2,
            dirfac: {
                pais: null,
                cp: null,
                city: null,
                municipio: null,
                colonia: null,
                calle: null,
                telf: null,
                telm: null,
                noext: null,
                noint: null,
            },
            datafac: {
                nameors: null,
                rfc: null,
                concept: null,
                cfdi: null,
                email: null,
                codefac: null,
                pay: null,
                payform: null,
                bank: null,
                last4n: null,
            },
        };
    },
    computed: {
        progress: function () {
            return Math.round(100 / this.max_step) * this.current_step;
        },
    },
    methods: {
        send() {
            this.$notify({
                group: 'addCartSuccess',
                title: 'Succes',
                text: 'Su solicitud de facturacion se ha recibido',
                type: 'danger',
            });
        },
        onClickNext: function () {
            console.log(this.dirfac);
            console.log(this.datafac);
            this.current_step++;
        },
        onClickBack: function () {
            this.current_step--;
        },
        onClickFirst: function () {
            this.current_step = 1;
        },
    },
};
</script>

<style>
.card-style {
    width: 90%;
    margin: 0 auto;
}
</style>
