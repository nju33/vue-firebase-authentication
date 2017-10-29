import Vue, {CreateElement, VNode} from 'vue';
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

@Component
class App extends Vue {
  public render(h: CreateElement): VNode {
    return <router-view />;
  }
}

@Component({
  template: '',
})
class Logout extends Vue {
  private logout: () => Promise<void> = async () => {
    try {
      await firebase.auth().signOut();
      /* something... */
    } catch (err) {
      throw err;
    }
  };

  public render(h: CreateElement): VNode {
    return <button onClick={this.logout}>logout</button>;
  }
}

@Component
class Main extends Vue {
  render(h: CreateElement): VNode {
    return (
      <div>
        <Authentication twitter={true} github={true}>
          <Logout />
        </Authentication>
      </div>
    );
  }
}

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
