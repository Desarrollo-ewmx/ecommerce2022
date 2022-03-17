<!--Esta esa la pagina que maneja el contenido del menu de hamburgesa de la pagina principal, lista las categorias de los productos-->
<template lang="html">
    <div class="ps-top-categories">
        <div class="ps-container">
            <h3>{{ $t('Categorias') }}</h3>
            <div class="row">
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Económica">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/8sC8p9utbbpVdPh13ONL1gDcVgkRoGZszDN4SsJC.jpeg"
                            alt="martfury"
                        />
                        <p>Económica</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Economico">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/2mjNttMTbNn64JobYHH6bIs4r2XdAnphgPHLysnW.jpeg"
                            alt="martfury"
                        />
                        <p>Economico</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Intermedia">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/UxNuaHGyY9oc7NAsdcZC8aVK62wN9AwgABIMXP3y.jpeg"
                            alt="martfury"
                        />
                        <p>Intermedia</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Ejecutiva">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/UxNuaHGyY9oc7NAsdcZC8aVK62wN9AwgABIMXP3y.jpeg"
                            alt="martfury"
                        />
                        <p>Ejecutiva</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Empresarial">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/TXYTiW2DL8hs2UJZMvAMnpPNsCIaSIgUjAGyn36R.jpeg"
                            alt="martfury"
                        />
                        <p>Empresarial</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Express">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/4YEk372GI2DRzo1wnLo0hTfwQGCGQBhM6NzKpmHw.jpeg"
                            alt="martfury"
                        />
                        <p>Express</p>
                    </div>
                </div>
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop?gama=Premium">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/o5aUbViTYu6zRv64hkw0MZGwkXswRXtwXVbpzddz.jpeg"
                            alt="martfury"
                        />
                        <p>Premium</p>
                    </div>
                </div>
                <!-- <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="https://s3-us-west-2.amazonaws.com/archivos.arconesycanastas/armados/2021/oqyTXWSoul5KshEZVXlApuqrJRQNsB80OLl1x60o.jpeg"
                            alt="martfury"
                        />
                        <p>cazo</p>
                    </div>
                </div>
                 <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/8.jpg"
                            alt="martfury"
                        />
                        <p>Media</p>
                    </div>
                </div>
                 <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div class="ps-block--category">
                        <nuxt-link to="/shop">
                            <a class="ps-block__overlay"></a>
                        </nuxt-link>
                        <img
                            src="~/static/img/categories/8.jpg"
                            alt="martfury"
                        />
                        <p>Top</p>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeDefaultTopCategories',
};
</script>

<style lang="scss" scoped></style>
