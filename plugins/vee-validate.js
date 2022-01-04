import Vue from 'vue';
import {
    ValidationObserver,
    ValidationProvider,
    extend,
    configure
} from 'vee-validate';
import { required, email, confirmed } from 'vee-validate/dist/rules';

extend('required', required);

extend('email', email);

extend('confirmed', {
    ...confirmed,
    message: 'Passwords Don`t Match.'
});

configure({
    classes: {
        invalid: 'is-invalid'
    }
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
