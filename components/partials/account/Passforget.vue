<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Cambio de contraseña</h5>
            <div class="form-group">
                <v-text-field
                    v-model="email"
                    class="email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    placeholder="Ingrese el correo asociado a su cuenta"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="code"
                    class="ps-text-field"
                    :error-messages="codeErrors"
                    @input="$v.code.$touch()"
                    placeholder="Ingrese su clave unica de acceso"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    class="ps-text-field"
                    @click:append="show1 = !show1"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Ingrese su nueva contraseña"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="confirmpass"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show2 ? 'text' : 'password'"
                    class="ps-text-field"
                    @click:append="show2 = !show2"
                    :error-messages="confirmErrors"
                    @input="$v.confirmpass.$touch()"
                    placeholder="Confirme su contraseña"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >Enviar</button>
            </div>
        </div>
    </form>
</template>

<script>
import {
    email,
    required
} from 'vuelidate/lib/validators';
import {
    validationMixin
} from 'vuelidate';

export default {
    name: 'Passforget',
    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.required &&
                errors.push('Por favor ingrese su correo');
            return errors;
        },
        codeErrors() {
            const errors = [];
            if (!this.$v.code.$dirty) return errors;
            !this.$v.code.required &&
                errors.push('Por favor ingrese su codigo ');
            return errors;
        },
        confirmErrors() {
            const errors = [];
            if (!this.$v.confirmpass.$dirty) return errors;
            !this.$v.confirmpass.required &&
                errors.push('Repita la contraseña');
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
                email: null,
                code: null,
                password: null,

            },
            email: null,
            code: null,
            password: null,
            confirmpass: null,
            show1: false,
            show2: true,
        };
    },
    validations: {
        email: {
            required,
        },
        password: {
            required,
        },
        code: {
            required,
        },
        confirmpass: {
            required,
        },
    },
    methods: {
        handleSubmit() {
            this.$v.$touch();
            this.log.email = this.email;
            this.log.code = this.code;
            this.log.password = this.password;
            if (!this.$v.$invalid) {
                if (this.password == this.confirmpass) {
                    console.log("Compare : " + this.confirmpass + " con: " + this.password)
                    this.getusers();
                }
                else {
                    this.$notify({
                        group: 'addCartSuccess',
                        title: 'Error',
                        text: 'La contraseña no coincide',
                        type: 'danger',
                    });
                }

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
            console.log("Ya pase")
            var flag = await this.$store.dispatch('auth/changepass', this.log);
            console.log(flag);
            if (flag == 'Contraseña actualizada con éxito') {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Exito',
                    text: flag,
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
