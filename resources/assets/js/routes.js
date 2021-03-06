import Vue from 'vue'
import VueRouter from 'vue-router'

import Users from './components/Users.vue'
import Clientes from './components/Clientes.vue'
import Empresas from './components/Empresas.vue'
import Ads from './components/Ads.vue'
import Servicios from './components/Servicios.vue'
import Numero_telefonico from './components/Numero_telefonico.vue'
import Fallas from './components/Fallas.vue'
import Tablero from './components/Dashboard.vue'
import Mangas from './components/Manga.vue'
import Tanque from './components/Tanque.vue'
import Central from './components/CentralT.vue'
import Sector from './components/Sector.vue'
import Log from './components/Logs.vue'
import FallasE from './components/FallasE.vue'


Vue.use(VueRouter)
/* Rutas de acceso para el panel del menu */
const router = new VueRouter({
	routes: [
		{
			path:"/",
			component: Tablero
		},
		{
			path: "/tablero",
			component: Tablero
		},
		{
			path: "/users",
			component: Users
		},
		{
			path: "/clientes",
			component: Clientes
		},
		{
			path: "/empresas",
			component: Empresas
		},
		{
			path: "/ads",
			component: Ads
		},
		{
			path: "/servicios",
			component: Servicios
		},
		{
			path: "/numero_telefonico",
			component: Numero_telefonico
		},
		{
			path:"/fallas",
			component: Fallas
		},
		{
			path:"/mangas",
			component:Mangas
		},
		{
			path:"/tanque",
			component:Tanque
		},
		{
			path:"/central",
			component:Central
		},
		{
			path:"/sector",
			component:Sector
		},
		{
			path:"/log",
			component:Log
		},
		{
			path:"/fallasE",
			component:FallasE
		}
	],
	linkActiveClass: 'active' /* <---- proceso para que el menu quede selected activo */
})

export default router
