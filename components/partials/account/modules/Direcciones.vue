<template lang="html">
    <div>
        <form class="needs-validation"  @submit.prevent="agregardir(direccionarcon); otraDir()">
            <div class="form-row ">
                <div class="form-check form-check-inline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="blue" class="bi bi-plus-circle-fill btn" viewBox="0 0 16 16" @click.prevent="otraDir()">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg>
                </div>
                <div class="col-md-2 mb-4 mr-2">
                    <label  class="mb-6 text-center d-flex justify-content-center align-items-center">Alias de dir.</label>
                    <b-form-input v-model="direccionarcon.aliasArc" type="text" class="form-control" id="validacionDirec" required>
                        </b-form-input>
                </div>
                <div class="col-md-1 mb-10 mr-2">
                    <label class="mb-6  text-center d-flex justify-content-center align-items-center">CP</label>
                    <b-form-input v-model="direccionarcon.cpArc" type="text" class="form-control" id="validacioncpArcones" required>
                        </b-form-input>
                </div>
                <div class="col-md-2 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">Estado</label>
                    <b-form-input v-model="direccionarcon.estadoArc" type="text" class="form-control" id="validacionestadotArcones" required>
                        </b-form-input>
                </div>
                <div class="col-md-2 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">Municipio</label>
                    <b-form-input v-model="direccionarcon.municipioArc" type="text" class="form-control" id="validacionmunicipioArcones"  required>
                        </b-form-input>
                </div>
                <div class="col-md-2 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">Colonia</label>
                    <b-form-select v-model="direccionarcon.coloniaArc"  class="form-control" id="validacioncoloniaArcones" required>
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione su colonia</b-form-select-option>
                    <b-form-select-option v-for="(colonia,index) in arreglo" :value="colonia.Colonia" v-bind:key="index">{{colonia.Colonia}}</b-form-select-option>
                </template>
                </b-form-select>
                </div>
                <div class="col-md-2 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">Calle</label>
                    <b-form-input v-model="direccionarcon.calleArc" type="text" class="form-control" id="validacioncalleArcones" required>
                        </b-form-input>
                </div>
                <div class="col-md-1 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">N°Ext</label>
                    <b-form-input v-model="direccionarcon.nextArc" type="text" class="form-control" id="validacionnextArcones" required>
                        </b-form-input>
                </div>
                <div class="col-md-1 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">N°Int</label>
                    <b-form-input v-model="direccionarcon.nintArc" type="text" class="form-control" id="validacionnintArcones">
                        </b-form-input>
                </div>
                <div class="col-md-3 mb-10 mr-2">
                    <label class="mb-6 d-flex justify-content-center align-items-center">Referencias</label>
                    <b-form-input v-model="direccionarcon.referArc" type="text" class="form-control" id="validacionreferenciaArcones">
                        </b-form-input>
                </div>
                <div class="col-md-3 mb-20 mr-2 text-center" margin-right="20px">
                    <button class="ps-btn " @click.prevent="filtrar()">
                        Cargar direcciones
                    </button>
                </div>
                <div class="col-md-1 mb-10 mr-2">

                </div>
            </div>
            <div class="form-row ">
                <div class="col-md-2 mb-12 mr-4">
                    <label  class="mb-7 text-center d-flex justify-content-center align-items-center">Persona que recibe uno</label>
                    <b-form-input v-model="direccionarcon.perrunoArc" type="text" class="form-control" id="validacionPeruno" required>
                        </b-form-input>
                </div>
                <div class="col-md-2 mb-12 mr-4">
                    <label  class="mb-7 text-center d-flex justify-content-center align-items-center">Persona que recibe dos</label>
                    <b-form-input v-model="direccionarcon.perrdosArc" type="text" class="form-control" id="validacionPerdos">
                        </b-form-input>
                </div>
                <div class="col-md-2 mb-12 mr-4">
                    <label  class="mb-7 text-center d-flex justify-content-center align-items-center">Telefono fijo</label>
                    <b-form-input v-model="direccionarcon.telfArc" type="text" class="form-control" id="validacionTelf" required>
                        </b-form-input>
                </div>
                <div class="col-md-2 mb-12 mr-4">
                    <label  class="mb-7 text-center d-flex justify-content-center align-items-center">Telefono movil</label>
                    <b-form-input v-model="direccionarcon.telmArc" type="text" class="form-control" id="validacionTelm">
                    </b-form-input>
                </div>
                <div class="col-md-2 mb-20 mr-2 text-center" margin-right="20px">
                   <!--- <button class="ps-btn " @click="addDireccion(direccionarcon)">
                    Añadir
                    </button>-->

                   <!----  <b-button class="ps-btn" type="submit">Añadir</b-button --->
                   <input class="ps-btn" type="submit" value="Añadir">
                </div>
            </div>
        </form>
        <p>
            {{direccionarcon}}
        </p>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'Direcciones',
    components: {},
    data() {
        return {
            direccionarcon: {
                aliasArc: null,
                cpArc: null,
                estadoArc: null,
                municipioArc: null,
                coloniaArc: null,
                calleArc: null,
                nextArc: null,
                nintArc: null,
                referArc: null,
                perrunoArc: null,
                perrdosArc: null,
                telfArc: null,
                telmArc: null,
            },
            arreglo: null,
            selected: null,
            options: [
                { value: 'Juan de dios batiz', text: 'juan de dios batiz' },
                { value: 'Martinica', text: 'Martinica' },
            ],
        };
    },
    methods: {
        guardarCookie() {
            this.$store.dispatch(
                'direccionarcon/getdirecArcon',
                this.direccionarcon
            );
        },
        ...mapActions(['addDireccion']),
        agregardir(payload) {
            this.$store.commit('direccion/addtoDirecciones', payload);
            console.log('Añadido al sistema');
        },
        obtenerdir() {
            this.$store.dispatch('direcciones/getDirecciones');
            console.log('Obtuve esto');
        },
        filtrar() {
            if (this.direccionarcon.cpArc == null) {
                alert('Por favor ingrese un codigo postal');
            } else {
                this.$store.dispatch(
                    'direcciones/getpostalcode',
                    this.direccionarcon.cpArc
                );
                (this.arreglo =
                    this.$store.getters['direcciones/cpMunicipios']),
                    this.direccionarcon.cpArc;
                for (let i = 0; i < this.arreglo.length; i++) {
                    //const element =
                    console.log('Colonia: ' + this.arreglo[i].Colonia);
                    console.log('Entidad: ' + this.arreglo[i].Entidad);
                    console.log('Municipio: ' + this.arreglo[i].Municipio);
                    this.direccionarcon.municipioArc =
                        this.arreglo[i].Municipio;
                    this.direccionarcon.estadoArc = this.arreglo[i].Entidad;
                }
            }
        },
        otraDir() {
            this.direccionarcon.aliasArc = null;
            this.direccionarcon.cpArc = null;
            this.direccionarcon.estadoArc = null;
            this.direccionarcon.municipioArc = null;
            this.direccionarcon.coloniaArc = null;
            this.direccionarcon.calleArc = null;
            this.direccionarcon.nextArc = null;
            this.direccionarcon.nintArc = null;
            this.direccionarcon.referArc = null;
            this.direccionarcon.perrunoArc = null;
            this.direccionarcon.perrdosArc = null;
            this.direccionarcon.telfArc = null;
            this.direccionarcon.telmArc = null;
            this.arreglo = null;
        },
    },
    beforeMount() {
        this.obtenerdir();
    },
    computed: {
        obtenercp() {
            this.$store.dispatch('direcciones/');
        },
    },
};
</script>