module.exports = {
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    devServer: {
        compress: true,
        disableHostCheck: true
    },
    modules: ['bootstrap-vue/nuxt']
};
