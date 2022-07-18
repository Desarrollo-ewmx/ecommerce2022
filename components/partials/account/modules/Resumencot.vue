<template lang="html">
  <div class="container" align="center">
    <div class="table-responsive-sm tableFixHead" style="height: 500px;">
        <table class="table table-hover table-fixed ps-table--shopping-cart">
            <thead>
                <tr>
                    <th style="text-align:center">Nombre</th>
                    <th>Cantidad</th>
                    <th>Estado</th>
                    <th>C.P</th>
                    <th>Total</th>
                    <th>Costo de envio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(arcon, index) in direcload.armados" :key="direcload.index">
                    <td>{{ arcon.nom }}</td>
                    <td>{{ arcon.cant }}</td>
                    <td>{{arcon.est}}</td>
                    <td>{{arcon.cp}}</td>
                    <td class="price">${{ arcon.tot}}</td>
                    <td v-if="arcon.cost_por_env == null" v-b-tooltip.hover title="El área de ventas esta cotizando el envió a esta dirección, se actualizará en automático una vez se cotice.">pendiente por cotizar</td>
                    <td v-else class="price">${{ arcon.cost_por_env}}</td>
                    <td v-if="arcon.cost_por_env == null">
                        <v-tooltip right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn href="#" @click.prevent="passid(arcon)" v-b-modal.modal-prevent-delete class="mx-2" fab dark small v-bind="attrs" v-on="on" color="red">
                                    <v-icon dark>mdi-file-alert</v-icon>
                                </v-btn>
                            </template>
                            <span>Completar direccion</span>
                        </v-tooltip>
                    </td>
                </tr>
            </tbody>
        </table>
        <hr />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    name: 'Resumencot',
    computed: {
        ...mapState({
            direcload: (state) => state.cotizacionarcon.direcload,
        }),
    },
    data() {
        return {

        }
    },
    async created() {
        let data = {
            id: this.$route.params.id,
            user: localStorage.getItem('id')
        }
        await this.$store.dispatch('cotizacionarcon/getdirecc', data);
        // this.$root.$emit('bv::show::tooltip')
    },
}
</script>

<style>

</style>