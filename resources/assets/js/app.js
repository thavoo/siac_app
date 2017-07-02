/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the body of the page. From here, you may begin adding components to
 * the application, or feel free to tweak this setup for your needs.
 */

 /*var VueResource = require('vue-resource');*/
 var axios = require('axios');


 

 import Users from './components/Users.vue';
 import Dashboard from './components/Dashboard.vue';
 import Modal from './components/Modal.vue';
 import VueRouter from 'vue-router'


import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

 
 import Router from './routes.js'


 Vue.component('dashboard', Dashboard)
 Vue.component('users', Users)
 Vue.component('modal', Modal)


 axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



const app = new Vue({
    el: '#app',
    router : Router,
    components: {
        Users,
        Modal
     },
     data:{
     	showModal:false,
     	newUser:{
     		name:'',
     		pass:'',
     		email:''
     	}
     }
});
