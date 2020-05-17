require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import moment from 'moment';
import VueProgressBar from 'vue-progressbar';
import swal from 'sweetalert2';
import { Form, HasError, AlertError } from 'vform'
import Profile from './components/Profile.vue';
import Dashboard from './components/Dashboard.vue';
import Users from './components/Users.vue';
import Devloper from './components/Devloper.vue';



Vue.use(VueRouter);

window.Form = Form;
window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', swal.stopTimer)
      toast.addEventListener('mouseleave', swal.resumeTimer)
    }
})

window.toast = toast;

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.filter('upText', (text) => {
    if(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
    } else {
        return
    }
});

Vue.filter('myDate', (date) => {
    return moment(date).format('MMMM Do YYYY')
});

window.Fire = new Vue();

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})

const routes = [
    {path: '/dashboard', component: Dashboard},
    {path: '/profile', component: Profile},
    {path: '/users', component: Users},
    {path: '/devloper', component: Devloper},
];

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

const app = new Vue({
    el: '#app',
    router
});
