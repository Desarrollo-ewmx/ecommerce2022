<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <user-information />
    </section>
</template>
<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import UserInformation from '~/components/partials/account/UserInformation';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    middleware: 'authentication',
    transition: 'zoom',
    components: {
        HeaderMobile,
        UserInformation,
        BreadCrumb,
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/',
                },
                {
                    text: 'Menu usuario',
                },
            ],
        };
    },
    methods: {
        beforeMount() {
            const user = this.$cookies.get('user');
            if ((user = null)) {
                this.$router.push('/account/login');
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
