<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Log In Your Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="username"
                    class="ps-text-field"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    placeholder="Usernamer or email"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    type="password"
                    class="ps-text-field"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Please enter password"
                    height="50"
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                />
            </div>
            <div class="form-group">
                <v-checkbox label="Remember me" color="warning" />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >Login</button>
            </div>
            <div align="right">
                <nuxt-link to="/account/forget">
                    <p style="color:blue;">Olvide mi contraseña</p>
                </nuxt-link>
            </div>
        </div>
        <div class="ps-form__footer">
            <p>Connect with:</p>
            <ul class="ps-list--social">
                <li>
                    <a href="#" class="facebook">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="google">
                        <i class="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="twitter">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="instagram">
                        <i class="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div>
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'Login',
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.required &&
                errors.push('Por favor ingrese su correo');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required &&
                errors.push('Por favor ingrese su contraseña');
            return errors;
        },
    },
    data() {
        return {
            log: {
                username: null,
                password: null,
            },
            username: null,
            password: null,
            show1: false,
        };
    },
    validations: {
        username: {
            required,
        },
        password: {
            required,
        },
    },
    methods: {
        handleSubmit() {
            this.$v.$touch();
            this.log.username = this.username;
            this.log.password = this.password;
            if (!this.$v.$invalid) {
                this.getusers();
            } else {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Error',
                    text: 'Por favor introduce tus datos',
                    type: 'danger',
                });
            }
        },

        async getusers() {
            var flag = await this.$store.dispatch('auth/setsesion', this.log);
            console.log(flag);
            this.getsession();
        },
        getsession() {
            const result = this.$store.getters['auth/getauth'];
            console.log('Iniciare a consultar la validacion');
            if (result != null) {
                this.$store.dispatch('auth/setAuthStatus', true);
                //this.$store.dispatch('auth/getarmados');
                this.$router.push('/');
            } else {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrecto',
                    type: 'danger',
                });
            }
        },
        /*
        beforeMount() {
            this.getusers();
        },*/
    },
};
</script>

<style lang="scss" scoped></style>
