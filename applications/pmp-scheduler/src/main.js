import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'

import { firebaseApp } from './firebaseApp'

Vue.use(VueRouter)

import store from './store'

import Dashboard from './components/Dashboard.vue'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'
import Timeline from  './components/Timeline.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/timeline', component: Timeline}
  ]
})

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('signIn', user)
    router.push('/dashboard')
  } else {
    router.replace('/timeline')
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
