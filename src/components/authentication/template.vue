<div>
  <BounceLoader id="hoge" />
  <div v-if="!inited"><BounceLoader :loading="true" :color="'orange'" :size="'5'" /></div>
  <div v-else-if="inited && authenticated">
    <button @click="githubLogout">logout</button>
  </div>
  <div v-else-if="inited">
    <button @click="githubLogin">login</button>
  </div>
</div>
