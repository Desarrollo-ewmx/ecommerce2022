<template lang="html">
    <div class="header__actions">
        <cotselect />
        <nuxt-link to="/account/shopping-cart">
            <mini-cart />
        </nuxt-link>
        <header-user-area />
    </div>
</template>

<script>
import MiniCart from './MiniCart';
import { mapState } from 'vuex';
import HeaderUserArea from '~/components/shared/headers/modules/HeaderUserArea';
import Cotselect from '~/components/shared/headers/modules/Cotselect';
export default {
    name: 'HeaderActions',
    components: { HeaderUserArea, MiniCart, Cotselect },
    computed: {
        ...mapState({
            total: state => state.cart.total,
            wishlistTotal: state => state.wishlist.total,
            compareTotal: state => state.compare.total
        })
    }
};
</script>

<style lang="scss" scoped></style>
