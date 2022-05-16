<template>
    <div class="container">
        <b-form @submit.prevent="sendemail">
            <b-form-group id="input-group-1" label="Correo electronico:" label-for="input-1">
                <b-form-input
                    id="input-1"
                    v-model="email"
                    type="email"
                    placeholder="Email"
                    required
                ></b-form-input>
            </b-form-group>
            <div class="form-group submit">
                <button type="submit" class="ps-btn ps-btn--fullwidth">Enviar</button>
            </div>
        </b-form>
    </div>
</template>

<script>
export default {
    name: 'Forgetpass',
    data() {
        return {
            email: '',
        }
    },
    methods: {
        async sendemail() {
            var flag = await this.$store.dispatch('auth/sendcode', this.email);
            console.log(flag);
            if (flag == 'Correo enviado con éxito') {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Exito',
                    text: 'Codigo enviado al correo ' + this.email,
                    type: 'danger',
                });
                this.$router.push('/account/login');

            }
            else {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Error',
                    text: flag,
                    type: 'danger',
                });
                this.email = ''
            }
        }
    },
}
</script>

<style>
</style>