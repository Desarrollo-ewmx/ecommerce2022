export const state = () => ({
    cotizacionarcon: {   
        nombreCot:null,
        cantTotalArc:null,
        cantxTipoArc:null,
        tipoArcon:null,
        cantxCP:null,
        cp:null
    }
});

export const mutations ={
    init(state,payload){
        console.log("Entra a la mutations",state);
        state.cotizacionarcon.nombreCot = payload.nombreCot;
        state.cotizacionarcon.cantTotalArc = payload.cantTotalArc;
        state.cotizacionarcon.cantxTipoArc = payload.cantxTipoArc;
        state.cotizacionarcon.tipoArcon = payload.tipoArcon ;
        state.cotizacionarcon.cantxCP = payload.cantxCP;
        state.cotizacionarcon.cp = payload.cp;
    },
    addcot(state, payload){
        payload = JSON.parse(JSON.stringify(payload));
        console.log("Desde mutation",{payload});
        state.cotizacionarcon.push(payload)
    }
    //---------------------Referencia que puede ayudar--------------------
    //AddQuantityRandom(state, payload) {
    //    let selectedItem = state.cartItems.find(item => item.id === payload.id);
    //    if (selectedItem) {
    //        state.total = parseInt((state.total - selectedItem.quantity) + payload.cantidad,10);
    //        selectedItem.quantity = payload.cantidad;
    //        state.amount = calculateAmount(state.cartItems);
    //    }
    //},
    //------------------Referencia que puede ayudar termina------------------
    //setCotArcon(state,payload){
    //    console.log("Desde set",payload);
        //state.nombreCot = payload.nombreCot,
        //state.cantTotalArc = payload.cantTotalArc,
        //state.setCantxTipoarc = payload.setCantxTipoarc,
        //state.tipoArcon = payload.tipoArcon,
        //state.cantxCP = payload.cantxCP,
        //state.cp = payload.cp
    //},

    //setNombreCot(state,payload){
    //    state.nombreCot = payload;
    //},
    //setCantTotal(state,payload){
    //    state.cantTotalArc =payload;
    //},
    //setCantxTipoarc(state,payload){
    //    state.setCantxTipoarc = payload;
    //},
    //setArc(state,payload){
    //    state.tipoArcon = payload;
    //},
    //setCantxCP(state,payload){
    //    state.cantxCP = payload;
    //},
    //setCP(state,payload){
    //    state.cp = payload;
    //}
};

export const actions = {
    //jalardatos({commit},payload){
    //    commit('init',payload);
    //    console.log("Desde actions",payload);
    //}
    getCotArcon({ commit,state }, payload) {
        console.log("Esta llegando a getCotarcon");
        commit('init',payload);
        const cookieParams = {
            nombreCot: state.nombreCot,
            cantTotalArc: state.cantTotalArc,
            cantxTipoArc: state.cantxTipoArc,
            tipoArcon: state.tipoArcon,
            cantxCP: state.cantxCP,
            cp: state.cp
        }
        
        this.$cookies.set('cotizacionarcon', cookieParams, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });
        console.log("Esta es la cookie",cookieParams);
    },
};