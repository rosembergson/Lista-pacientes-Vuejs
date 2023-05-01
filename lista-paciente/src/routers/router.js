import {createRouter, createWebHistory} from 'vue-router'  
import Login from '../components/login-comp/login-comp.vue'
import ListPacientes from '../components/pacientes/list-pacientes/list-pacientes.vue'

const routes = [{
    path: '',
    name: 'Login',
    component: Login,
  }, {
    path: '/home',
    name:"Home",
    component: ListPacientes,
    // beforeEnter: () => {
    //   return false
    // },
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router