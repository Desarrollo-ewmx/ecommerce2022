<template lang="html">
    <header class="header header--mobile">
        <div class="header__top">
            <div class="header__left">
                <p>Bienvenido a Canastas y Arcones MX</p>
            </div>
            <div class="header__right">
                <ul class="navigation__extra">
                    <li>
                        <nuxt-link to="/account/cotizaciones">
                            Ver cotizaciones
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navigation--mobile">
            <div class="navigation__left">
                <nuxt-link to="/" class="ps-logo">
                    <img src="~/static/img/logo_light.png" alt="martfury" />
                </nuxt-link>
            </div>
            <mobile-header-actions />
        </div>
    </header>
</template>

<script>
import MobileHeaderActions from '~/components/shared/mobile/modules/MobileHeaderActions';
export default {
    name: 'HeaderMobile',
    components: { MobileHeaderActions }
};
</script>

<style lang="scss" scoped></style>
