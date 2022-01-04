<template lang="html">
    <div>
        <div class="table-responsive-sm">
            <table
                class="table table-hover table-fixed ps-table--shopping-cart"
            >
                <thead>
                    <tr>
                        <th>CP</th>
                        <th>Estado</th>
                        <th>Municipio</th>
                        <th>Colonia</th>
                        <th>Calle</th>
                        <th>N°Ext</th>
                        <th>N°Int</th>
                        <th>Referencias</th>
                        <th>Persona que recibe uno</th>
                        <th>Persona que recibe dos</th>
                        <th>Telefono fijo</th>
                        <th>Telefono movil</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in direcciones" :key="item.index">
                        <td>{{ item.cpArc }} {{ `(${index})` }}</td>
                        <td>{{ item.estadoArc }}</td>
                        <td>{{ item.municipioArc }}</td>
                        <td>{{ item.coloniaArc }}</td>
                        <td>{{ item.calleArc }}</td>
                        <td>{{ item.nextArc }}</td>
                        <td>{{ item.nintArc }}</td>
                        <td>{{ item.referArc }}</td>
                        <td>{{ item.perrunoArc }}</td>
                        <td>{{ item.perrdosArc }}</td>
                        <td>{{ item.telfArc }}</td>
                        <td>{{ item.telmArc }}</td>
                        <td class="form-check form-check-inline">
                            <v-btn
                                href="#"
                                @click.prevent="editItem(index); passItem(item); ;filtrar(item.cpArc)"
                                v-b-modal.modal-prevent-closing
                                class="mx-2"
                                fab
                                dark
                                small
                                color="indigo"
                            >
                                <v-icon>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>
                            <v-btn
                                href="#"
                                @click.prevent="deleteItem(index)"
                                class="mx-2"
                                fab
                                dark
                                small
                                color="red"
                            >
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Ingresa tus datos"
                @show="resetModal"
                @hidden="resetModal"
                @ok="handleOk"
            >
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                        label="CP"
                        label-for="cp-input"
                        invalid-feedback="El cp es un elemento requerido"
                        :state="vcp"
                    >
                        <b-form-input
                            id="cp-input"
                            v-model="dirItem.cpArc"
                            :state="vcp"
                            v-on:change="filtrar"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Estado"
                        label-for="estado-input"
                        invalid-feedback="El estado es un elemento requerido"
                        :state="vestado"
                    >
                        <b-form-input
                            id="estado-input"
                            v-model="dirItem.estadoArc"
                           :state="vestado"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Municipio"
                        label-for="municipio-input"
                        invalid-feedback="El municipio es un elemento requerido"
                        :state="vmunicipio"
                    >
                        <b-form-input
                            id="municipio-input"
                            v-model="dirItem.municipioArc"
                            :state="vmunicipio"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Colonia"
                        label-for="colonia-input"
                        invalid-feedback="La colonia es un elemento requerido"
                        :state="vcolonia"
                    >
                    <b-form-select v-model="dirItem.coloniaArc"  class="form-control" id="colonia-input" required>
                <template #first>
                    <b-form-select-option :value="null" disabled>Seleccione su colonia</b-form-select-option>
                    <b-form-select-option v-for="(colonia,index) in arreglo" :value="colonia.Colonia" v-bind:key="index">{{colonia.Colonia}}</b-form-select-option>
                </template>
                </b-form-select>
                    </b-form-group>
                    <b-form-group
                        label="Calle"
                        label-for="calle-input"
                        invalid-feedback="La calle es un elemento requerido"
                        :state="vcalle"
                    >
                        <b-form-input
                            id="calle-input"
                            v-model="dirItem.calleArc"
                            :state="vcalle"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="N°ext"
                        label-for="next-input"
                        invalid-feedback="El N°ext es un elemento requerido"
                        :state="vnext"
                    >
                        <b-form-input
                            id="next-input"
                            v-model="dirItem.nextArc"
                           :state="vnext"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="N°int"
                        label-for="nint-input"
                    >
                        <b-form-input
                            id="nint-input"
                            v-model="dirItem.nintArc"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Referencias"
                        label-for="refer-input"
                    >
                        <b-form-input
                            id="refer-input"
                            v-model="dirItem.referArc"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Persona que recibe uno"
                        label-for="peruno-input"
                        invalid-feedback="Ingrese un nombre"
                        :state="vperuno"
                    >
                        <b-form-input
                            id="peruno-input"
                            v-model="dirItem.perrunoArc"
                            :state="vperuno"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Persona que recibe dos"
                        label-for="perdos-input"
                    >
                        <b-form-input
                            id="perdos-input"
                            v-model="dirItem.perrdosArc"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Telefono fijo"
                        label-for="telf-input"
                        invalid-feedback="Su numero fijo es un elemento requerido"
                        :state="vtelf"
                    >
                        <b-form-input
                            id="telf-input"
                            v-model="dirItem.telfArc"
                            :state="vtelf"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group
                        label="Telefono movil"
                        label-for="telm-input"
                    >
                        <b-form-input
                            id="telm-input"
                            v-model="dirItem.telmArc"
                        ></b-form-input>
                    </b-form-group>
                </form>
            </b-modal>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
    name: 'TablaDirecciones',
    data() {
        return {
            nameState: null,
            vcp: null,
            vestado: null,
            vmunicipio: null,
            vcolonia: null,
            vcalle: null,
            vnext: null,
            vperuno: null,
            vtelf: null,

            dirItem: {
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
            indice: -1,
            arreglo: null,
            options: [
                { value: 'Juan de dios batiz', text: 'juan de dios batiz' },
                { value: 'Martinica', text: 'Martinica' },
            ],
        };
    },
    computed: {
        ...mapState({
            direcciones: (state) => state.direccion.direcciones,
            //cotizaciones: state => state.cotizacion.cotizaciones,
        }),
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            if (this.dirItem.cpArc.length > 1) {
                this.vcp = true;
            } else {
                this.vcp = false;
            }
            if (this.dirItem.estadoArc.length > 1) {
                this.vestado = true;
            } else {
                this.vestado = false;
            }
            if (this.dirItem.municipioArc.length > 1) {
                this.vmunicipio = true;
            } else {
                this.vmunicipio = false;
            }
            if (this.dirItem.coloniaArc.length > 1) {
                this.vcolonia = true;
            } else {
                this.vcolonia = false;
            }
            if (this.dirItem.calleArc.length > 1) {
                this.vcalle = true;
            } else {
                this.vcalle = false;
            }
            if (this.dirItem.nextArc.length > 1) {
                this.vnext = true;
            } else {
                this.vnext = false;
            }
            if (this.dirItem.perrunoArc.length > 1) {
                this.vperuno = true;
            } else {
                this.vperuno = false;
            }
            if (this.dirItem.telfArc.length > 1) {
                this.vtelf = true;
            } else {
                this.vtelf = false;
            }
            return valid;
        },

        resetModal() {
            this.vcp = null;
            this.vestado = null;
            this.vmunicipio = null;
            this.vcolonia = null;
            this.vcalle = null;
            this.vnext = null;
            this.vperuno = null;
            this.vtelf = null;
        },

        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },

        handleSubmit() {
            if (!this.checkFormValidity()) {
                return;
            } else {
                this.dirItem.indice = this.indice;
                this.$store.dispatch('direccion/editDireccion', this.dirItem);
                this.indice = -1;
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing');
                });
            }
        },

        obtenerdir() {
            this.$store.dispatch('direcciones/getDirecciones');
            console.log('Obtuve esto');
        },
        filtrar(postalcode) {
            if (postalcode == null) {
                alert('Por favor ingrese un codigo postal');
            } else {
                this.$store.dispatch('direcciones/getpostalcode', postalcode);
                (this.arreglo =
                    this.$store.getters['direcciones/cpMunicipios']),
                    postalcode;
                for (let i = 0; i < this.arreglo.length; i++) {
                    console.log('Colonia: ' + this.arreglo[i].Colonia);
                    console.log('Entidad: ' + this.arreglo[i].Entidad);
                    console.log('Municipio: ' + this.arreglo[i].Municipio);
                    this.dirItem.municipioArc = this.arreglo[i].Municipio;
                    this.dirItem.estadoArc = this.arreglo[i].Entidad;
                }
            }
        },

        passItem(direc) {
            this.dirItem = direc;
        },

        editItem(index, direc) {
            let direccion = this.direcciones[index]; // Mandamos a traer el item que deseamos editar
            this.indice = index; // Igualamos el indice del item que deseamos editar
            this.name = direccion.aliasArc; // Mandamos a hablar al nombre del item que deseamos editar
        },

        deleteItem(index) {
            this.$store.dispatch('direccion/deleteToDirecciones', index);
        },

        /**
         * * Volver a cargar cotizaciones desde una cookie
         */
        // async loadCotizaciones() {
        //   const cotItemsOnCookie = this.$cookies.get('cotizacion', {
        //     parseJSON: true
        //   });

        //   let queries = [];
        //   cotItemsOnCookie.cotizaciones.forEach(item => {
        //     queries.push(item.index)
        //   })

        //   if (queries.length > 0) {
        //     await this.$store.dispatch('cotizacion/getCotizaciones', queries)
        //   }
        // }
    },
};
</script>
