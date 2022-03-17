<template lang="html">
<ul>
    <template v-for="link in links">
        <li :key="link.text" :class="link.active ? 'active' : ''">
            <nuxt-link :to="link.url">
                <i :class="link.icon"></i>
                {{ link.text }}
            </nuxt-link>
        </li>
    </template>
    <li>

        <a href="#" @click.prevent="handleLogout">
            <i class="icon-power-switch"></i>
            Cerrar sesion
        </a>

    </li>
</ul>
</template>

<script>
export default {
    name: 'AccountLinks',
    props: {
        links: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        handleLogout() {
            this.$store.dispatch('auth/setAuthStatus', false);
            this.$store.dispatch('auth/deletesesion');
            location.reload();
        },
    },
};
</script>

<style lang="scss" scoped></style>
