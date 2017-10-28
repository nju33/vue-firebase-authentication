import Vue, {CreateElement} from 'vue';
import Component from 'vue-class-component';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import template from './template.vue';
// import './style.less';

@Component({
  template,
  props: {
    twitter: Boolean,
    facebook: Boolean,
    github: Boolean,
    google: Boolean,
    email: Boolean,
    phone: Boolean,
    onLogged: Function,
  },
})
export class Authentication extends Vue {
  authenticated: boolean = false;
  twitter: boolean;
  facebook: boolean;
  google: boolean;
  github: boolean;
  email: boolean;
  phone: boolean;
  onLogged: () => void;

  get signInOptions(): string[] {
    const result: string[] = [];
    if (this.twitter) {
      result.push(firebase.auth.TwitterAuthProvider.PROVIDER_ID);
    }
    if (this.facebook) {
      result.push(firebase.auth.FacebookAuthProvider.PROVIDER_ID);
    }
    if (this.google) {
      result.push(firebase.auth.GoogleAuthProvider.PROVIDER_ID);
    }
    if (this.github) {
      result.push(firebase.auth.GithubAuthProvider.PROVIDER_ID);
    }
    if (this.email) {
      result.push(firebase.auth.EmailAuthProvider.PROVIDER_ID);
    }
    if (this.phone) {
      result.push(firebase.auth.PhoneAuthProvider.PROVIDER_ID);
    }
    return result;
  }

  mounted(): void {
    if (
      !(
        this.twitter ||
        this.facebook ||
        this.google ||
        this.github ||
        this.email ||
        this.phone
      )
    ) {
      throw new Error('Please specify at least one provider');
    }

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    const config = {
      signInOptions: this.signInOptions,
    };

    firebase.auth().onAuthStateChanged(async user => {
      if (user === null) {
        this.authenticated = false;
        await import('firebaseui/dist/firebaseui.css');
        ui.start('#vue-firebase-authentication-ui', config);
      }

      if (user) {
        this.authenticated = true;
        if (typeof this.onLogged === 'function') {
          this.onLogged();
        }
      }
    });
  }
}
