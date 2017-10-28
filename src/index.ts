import Vue from 'vue';
import Router from 'vue-router';
import Component from 'vue-class-component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Authentication} from 'components/authentication';

Vue.use(Router);

const config = {
  apiKey: 'AIzaSyBnvDDDmniFTwB8-GC3VUlWWhpfVigZ3f0',
  authDomain: 'nju333333.firebaseapp.com',
  databaseURL: 'https://nju333333.firebaseio.com',
};
firebase.initializeApp(config);

let router: Router;

@Component({
  template: '<router-view></router-view>',
})
class App extends Vue {}

@Component({
  template: '<button @click="logout">logout</button>',
})
class Logout extends Vue {
  async logout(): Promise<void> {
    try {
      await firebase.auth().signOut();
      /* something... */
    } catch (err) {
      throw err;
    }
  }
}

@Component({
  components: {
    Authentication,
    Logout,
  },
  template: `
<div>
  <Authentication :twitter="true" :github="true">
    <Logout />
  </Authentication>
</div>
  `,
})
class Main extends Vue {}

router = new Router({
  routes: [
    {
      path: '/',
      component: Main,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
