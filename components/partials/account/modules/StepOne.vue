<template>
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
                    id="validacionDirec"
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
                    id="validacionDirec"
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
                    id="validacionDirec"
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
                    id="validacionDirec"
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
                    id="validacionDirec"
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
                    id="validacionDirec"
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
                    type="text"
                    class="form-control"
                    id="validacionDirec"
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
                    type="text"
                    class="form-control"
                    id="validacionDirec"
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
                    id="validacionDirec"
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
                    id="validacionDirec"
                    required
                >
                </b-form-input>
            </div>
        </div>
        <div></div>
        <button @click="canContinue">Can continue</button>
    </div>
</template>

<script>
export default {
    props: ['clickedNext', 'currentStep'],
    data() {
        return {
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
            flag: null,
        };
    },
    methods: {
        canContinue() {
            console.log('tiene este valor: ' + Object.keys(this.dirfac));
            var values = Object.keys(this.dirfac);
            console.log(values);
            console.log(values[5]);
            for (
                let index = 0;
                index < Object.keys(this.dirfac).length;
                index++
            ) {
                if (
                    this.dirfac.values[index] != null ||
                    this.dirfac[index] != ''
                ) {
                    this.flag = 1;
                    console.log('tiene este valor: ' + this.flag);
                } else {
                    this.flag = 0;
                    console.log('tiene este valor: ' + this.flag);
                }
            }
            if (this.flag == 1) {
                this.$emit('can-continue', { value: true });
            }
        },
    },
};
</script>