export default function({ store, redirect }) {
    if (store.state.auth.correo == null) {
        return redirect('/account/login');
    }
}
