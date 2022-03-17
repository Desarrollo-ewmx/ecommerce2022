<template lang="html">
    <div class="table-responsive" align="center">
        <table class="table table-bordered ps-table ps-table--specification" style="width:100px;">
            <tbody>
                <tr>
                    <td>Gama</td>
                    <td>{{arcon.gama}}</td>
                </tr>
                <tr>
                    <td>Tamaño</td>
                    <td>{{arcon.tamaño}}</td>
                </tr>
                <tr>
                    <td>Peso</td>
                    <td>{{arcon.peso}} Kg</td>
                </tr>
                <tr>
                    <td>Altura</td>
                    <td>{{arcon.altura}} cm</td>
                </tr>
                <tr>
                    <td>Ancho</td>
                    <td>{{arcon.ancho}} cm</td>
                </tr>
                <tr>
                    <td>Largo</td>
                    <td>{{arcon.largo}} cm</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'PartialSpecification',
    props: {
        arcon: {
            type: Object,
            require: true,
            default: () => {},
        },
    },
};
</script>

<style lang="scss" scoped></style>
