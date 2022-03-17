<template lang="html">
    <form @submit.prevent="handleSubmit" novalidate>
        <div class="ps-form__content">
            <h5>Ingrese sus datos</h5>

            <div class="form-group">
                <v-text-field
                    v-model="firstname"
                    :error-messages="firstnameErrors"
                    @input="$v.firstname.$touch()"
                    placeholder="Ingrese nombre(s)"
                    class="ps-text-field"
                    outlined
                    height="50"
                    prepend-icon="icon-user"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="lastname"
                    :error-messages="lastnameErrors"
                    @input="$v.lastname.$touch()"
                    placeholder="Ingrese apellidos"
                    class="ps-text-field"
                    outlined
                    height="50"
                    prepend-icon="icon-users"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Correo electronico"
                    class="ps-text-field"
                    outlined
                    type="email"
                    height="50"
                    prepend-icon="icon-envelope"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="phone"
                    :error-messages="phoneErrors"
                    @input="$v.phone.$touch()"
                    placeholder="Telefono"
                    class="ps-text-field"
                    outlined
                    height="50"
                    prepend-icon="icon-telephone"
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Password"
                    class="ps-text-field"
                    outlined
                    height="50"
                    prepend-icon="icon-key"
                    type="password"
                />
            </div>
            <div class="form-group">
                <v-text-field v-model="confirmpass" :error-messages="samepasswordErrors" @input="$v.confirmpass.$touch()" placeholder="confirm password" class="ps-text-field" outlined height="50" prepend-icon="icon-key" type="password">
                </v-text-field>
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                >
                    Registrar usuario
                </button>
                <div align="right">
                    <nuxt-link to="/#">
                        <p style="color:blue;">Olvide mi contraseña</p>
                    </nuxt-link>
                </div>
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
import { email, required, sameAs } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'Register',
    computed: {
        firstnameErrors() {
            const errors = [];
            if (!this.$v.firstname.$dirty) return errors;
            !this.$v.firstname.required &&
                errors.push('Por favor ingrese su nombre(s)');
            return errors;
        },
        lastnameErrors() {
            const errors = [];
            if (!this.$v.lastname.$dirty) return errors;
            !this.$v.lastname.required &&
                errors.push('Por favor ingrese sus apellidos');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            (!this.$v.email.required && errors.push('Ingrese un correo')) ||
                (!this.$v.email.email && errors.push('correo invalido'));
            return errors;
        },
        phoneErrors() {
            const errors = [];
            if (!this.$v.phone.$dirty) return errors;
            !this.$v.phone.required && errors.push('Ingrese un telefono');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('Ingrese una contraseña');
            return errors;
        },
        samepasswordErrors() {
            const errors = [];
            if (!this.$v.confirmpass.$dirty) return errors;
            (!this.$v.confirmpass.required &&
                errors.push('Ingrese una contraseña')) ||
                (!this.$v.confirmpass.sameAsPassword &&
                    errors.push('La contraseña no coincide'));
            return errors;
        },
    },
    data() {
        return {
            firstname: null,
            lastname: null,
            email: null,
            phone: null,
            password: null,
            confirmpass: null,
            log: {
                nombre: null,
                apellido: null,
                email: null,
                tel: null,
                password: null,
            },
        };
    },
    validations: {
        firstname: { required },
        lastname: { required },
        email: { required, email },
        phone: { required },
        password: { required },
        confirmpass: { required, sameAsPassword: sameAs('password') },
    },
    methods: {
        handleSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.log.nombre = this.firstname;
                this.log.apellido = this.lastname;
                this.log.email = this.email;
                this.log.password = this.password;
                this.log.tel = this.phone;
                this.setusers();
            }
        },

        async setusers() {
            var flag = await this.$store.dispatch('auth/setusuario', this.log);
            // console.log(flag);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Error',
                text: flag,
                type: 'danger',
            });
            this.$router.push('/account/login');
        },
    },
};
</script>

<style lang="scss" scoped></style>
