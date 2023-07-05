<template>
  <div>
    <a v-if="$env.isIOS()" target="_blank" href="https://apps.apple.com/app/6446363029">
      <img  width="155px" src="../assets/appstore.svg" />
    </a>
    <template v-if="$env.isAndroid()">
      <a href="https://play.google.com/store/apps/details?id=org.vechain.sync2" target="_blank">
        <img width="155px" src="../assets/googleplay.svg" />
      </a>
      <br/>
      or
      <br/>
      <a target="_blank" :href="androidUrl"> Download Android APK </a>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class Mobile extends Vue {
  @Prop(String)
  private androidUrl!: string
  
}
</script>