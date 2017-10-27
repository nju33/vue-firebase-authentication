import Vue from 'vue';
import Component from 'vue-class-component';
import * as firebase from 'firebase';
import * as BounceLoader from 'vue-spinner/src/BounceLoader.vue';
// import Asset from 'decorators/asset';
import template from './template.vue';
import './style.less';

interface Auth {
  // providers: firebase.auth.AuthProvider[];

  googleLogin(): void;
  twitterLogin(): void;
  facebookLogin(): void;
  githubLogin(): void;
}

@Component({
  components: {
    BounceLoader: BounceLoader.default,
  },
  template,
  props: {
    // mailAndPassword: Boolean,
    twitter: Boolean,
    facebook: Boolean,
    github: Boolean,
    google: Boolean,
  },
})
export class Authentication extends Vue implements Auth {
  provider = new firebase.auth.GithubAuthProvider();
  inited: boolean = false;
  authenticated: boolean = false;
  twitter: boolean;
  facebook: boolean;
  github: boolean;
  google: boolean;

  // get providers(): firebase.auth.AuthProvider[] {
  //   const result: firebase.auth.AuthProvider[] = [];
  //
  //   if (this.twitter) {
  //     result.push(new firebase.auth.TwitterAuthProvider());
  //   }
  //   if (this.facebook) {
  //     result.push(new firebase.auth.FacebookAuthProvider());
  //   }
  //   if (this.github) {
  //     result.push(new firebase.auth.GithubAuthProvider());
  //   }
  //   if (this.google) {
  //     result.push(new firebase.auth.GoogleAuthProvider());
  //   }
  //
  //   return result;
  // }

  login = () => {};

  googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  twitterLogin = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  facebookLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  githubLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  githubLogout = () => {
    firebase.auth().signOut();
  };

  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (!this.inited) {
        this.inited = true;
      }

      if (user) {
        this.authenticated = true;
      }
    });
  }
}
