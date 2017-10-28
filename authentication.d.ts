declare namespace vueFirebaseAuthentication {
  class Authentication {
    authenticated: boolean;
    twitter: boolean;
    facebook: boolean;
    google: boolean;
    github: boolean;
    email: boolean;
    phone: boolean;
    onLoggled: () => void;
  }
}
