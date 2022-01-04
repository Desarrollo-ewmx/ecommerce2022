<template lang="html">
    <div>
        <div class="form-row">
            <div class="col-md-4 mb-3">
                <b-form-select v-model="selected" :options="options" class="form-control">
                <!-- This slot appears above the options from 'options' prop -->
                <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                </template>
                </b-form-select>
                <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
            </div>
            <div class="col-md-4 mb-3">
                <b-form-select v-model="selected" :options="options" class="form-control">
                <!-- This slot appears above the options from 'options' prop -->
                <template #first>
                    <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
                </template>
                </b-form-select>
                <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
            </div>

        </div>
    </div>    
</template>

<script>
    export default {
        name: 'TablaCatalogo',
        data() {
        return {
            selected: null,
            options: [
            { value: 'A', text: 'Option A (from options prop)' },
            { value: 'B', text: 'Option B (from options prop)' }
            ]
        }
        }
    }
</script>