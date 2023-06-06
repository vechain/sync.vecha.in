<template>
  <div>
    <a v-if="$env.isIOS()" target="_blank" href="https://apps.apple.com/us/app/vechain-sync2/id6446363029">
      <img  width="155px" src="../assets/appstore.svg" />
    </a>
    <template v-if="$env.isAndroid()">
      <a href="http://" target="_blank">
        <img width="155px" src="../assets/googleplay.svg" />
      </a>
      <br/>
      or
      <br/>
      <a> Download Android APK </a>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

export default class Mobile extends Vue {

}
</script>