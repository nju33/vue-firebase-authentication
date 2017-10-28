<div>
  <div v-if="authenticated">
    <slot/>
  </div>
  <div v-else id="vue-firebase-authentication-ui" />
</div>
