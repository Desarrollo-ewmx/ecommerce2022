<template>
    <div>
        <div class="form-row">
            <div class="col-md-1 mb-3"></div>
            <div class="col-md-3 mb-3">
                <label>Cantidad por tipo de arcon</label>
                <div class="input-group">
                    <input
                        v-model="cotizacionarcon.cantxTipoArc"
                        type="text"
                        class="form-control"
                        id="validationCantXTipoArcon"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <label>Tipo de arcon</label>
                <input
                    v-model="cotizacionarcon.tipoArcon"
                    type="text"
                    class="form-control"
                    id="validacionTipoArcon"
                    required
                />
            </div>
            <div class="col-md-1 mb-3"></div>
            <div class="col-md-3 mb-3 mt-6 text-center">
                <button class="ps-btn">Añadir cotización</button>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-2 mb-3"></div>
            <div class="col-md-3 mb-3">
                <label>Cantidad por CP</label>
                <input
                    v-model="cotizacionarcon.cantxCP"
                    type="text"
                    class="form-control"
                    id="validacionXCP"
                    required
                />
            </div>
            <div class="col-md-3 mb-3">
                <label>CP</label>
                <input
                    v-model="cotizacionarcon.cp"
                    type="text"
                    class="form-control"
                    id="validationCP"
                    required
                />
            </div>
            <div class="col-md-3 mb-3 text-center"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArconesyCP',
    props: {
        cotizacionarcon: Object
    }
};
</script>

<style>
</style>