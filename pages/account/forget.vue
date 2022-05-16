<template lang="html">
    <div class="container">
        <br />
        <br />
        <div align="center">
            <h2>Ingrese el correo registrado en la cuenta</h2>
        </div>
        <br />
        <br />
        <Forgetpass />
    </div>
</template>

<script>
import Forgetpass from '~/components/partials/account/Forgetpass';
export default {
    components: {
        Forgetpass,
    }
}
</script>

<style>
</style>
