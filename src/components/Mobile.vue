<template>
  <div>
    <a v-if="$env.isIOS()" target="_blank" :href="appUrl">
      <img  width="155px" src="../assets/appstore.svg" />
    </a>
    <template v-if="$env.isAndroid()">
      <a :href="playUrl" target="_blank">
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
  
  get playUrl(): string {
    return this.$env.GooglePlay
  }

  get appUrl(): string {
    return this.$env.AppStore
  }
}
</script>