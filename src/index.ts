import Vue from 'vue';
import Router from 'vue-router';
import Component from 'vue-class-component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Authentication} from 'components/authentication';

Vue.use(Router);

const config = {
  apiKey: "AIzaSyBnvDDDmniFTwB8-GC3VUlWWhpfVigZ3f0",
  authDomain: "nju333333.firebaseapp.com",
  databaseURL: "https://nju333333.firebaseio.com"
};
firebase.initializeApp(config);

let router: Router;

@Component({
  template: '<router-view></router-view>'
})
class App extends Vue {}

@Component({
  // ここではすべてのコンポーネントオプションが許可されています
  template: '<div @click="onClick">{{msg}}</div>',
})
class A extends Vue {
  // 初期データはインスタンスプロパティとして宣言できます
  msg: string = 'hoge!';
  // コンポーネントメソッドはインスタンスメソッドとして宣言できます
  onClick (): void {
    console.log(9);
    router.push('/fuga');
  }
}

@Component({
  // ここではすべてのコンポーネントオプションが許可されています
  template: '<div @click="onClick">{{msg}}</div>',
})
class B extends Vue {
  // 初期データはインスタンスプロパティとして宣言できます
  msg: string = 'fuga!';
  // コンポーネントメソッドはインスタンスメソッドとして宣言できます
  onClick (): void {
    console.log(9);
    router.push('/');
    // router.push('/');
  }
}



router = new Router({
  routes: [
    {
      path: '/',
      component: A,
    },
    {
      path: '/fuga',
      component: B,
    },
    {
      path: '/auth',
      component: Authentication,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

console.log(router);

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

console.log(app);

// router.replace('/app');
