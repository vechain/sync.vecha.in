<template>
    <div class="container grid-xl">
        <div class="columns">
            <div
                class="column col-4 col-mx-auto col-md-12 text-center"
                style="align-self: center; padding-top: 30px; padding-bottom: 30px"
            >
                <div class="text-center" style="margin-bottom:1rem;">
                    <img
                        width="64"
                        height="64"
                        src="../assets/sync2-logo.svg"
                        alt="Vechain Sync Logo"
                    />
                    <h2>Vechain Sync2</h2>
                </div>
                <div style="font-size:16px;">The next-generation Vechain wallet for all platforms</div>
                <br />
                <template v-if="$env.isAndroid() || $env.isIOS()">
                    <playBtn :androidUrl="androidUrl" />
                </template>
                <template v-else>
                  <div class="btn-group">
                      <template v-if="preferredAsset">
                          <a
                              :href="preferredAsset.url"
                              target="_blank"
                              class="btn btn-lg btn-primary"
                          >Download Sync2</a>
                          <a class="btn btn-lg btn-primary" @click="show = !show">
                              <i class="icon icon-arrow-down"></i>
                          </a>
                      </template>
                      <a
                          v-else
                          @click="show = !show"
                          class="btn btn-lg btn-primary"
                          tabindex="0"
                      >
                          Download Sync2
                          <i class="icon icon-arrow-down"></i>
                      </a>
                  </div>
                  <DownloadAssets style="max-width: 320px;" v-show="show" :assets="assets" />
                  <div
                      v-if="preferredAsset"
                      class="my-2 caption"
                  >{{$env.syncReleases[0].version}} for {{preferredAsset.platform | osName}} {{preferredAsset.arch | osArch(preferredAsset.platform)}} ({{preferredAsset.size | size}})</div>
                  <div>
                    <a href="/checksum.html" target="_blank" class="caption">SHA512 checknum</a>
                  </div>
                </template>
            </div>
            <div
                class="column col-6 col-mx-auto col-md-10 text-center"
                style="align-self: center; padding-top: 30px; padding-bottom: 30px"
            >
                <img width="100%" src="../assets/screenshot.png" />
            </div>
        </div>
        <div class="columns bg-gray">
            <div
                class="column col-4 col-mx-auto col-sm-12 text-center"
                style="padding-top: 30px; padding-bottom: 30px"
            >
                <img src="../assets/asset.svg" width="100" />
                <h5>Asset Management</h5>
                <div style="font-size:14px;">Send and receive assets in one place.</div>
            </div>
            <div
                class="column col-4 col-mx-auto col-sm-12 text-center"
                style="padding-top: 30px; padding-bottom: 30px"
            >
                <img src="../assets/dapps.svg" width="100" />
                <h5>DApps Interaction</h5>
                <div style="font-size:14px;">Sign transactions and certificates anytime, anywhere.</div>
            </div>
            <div
                class="column col-4 col-mx-auto col-sm-12 text-center"
                style="padding-top: 30px; padding-bottom: 30px"
            >
                <img src="../assets/platforms.svg" width="100" />
                <h5>All Platforms</h5>
                <div
                    style="font-size:14px;"
                >Designed to work with desktop, mobile devices and all mainstream web browsers.</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DownloadAssets from './DownloadAssets.vue'
import playBtn from './Mobile.vue'

const iosApp: Release.Asset = {
    size: 0,
    arch: 'arm64',
    url: '',
    platform: 'ios',
    fileName: 'Sync2app',
    checksum: ''
  }

@Component({
    components: {
        DownloadAssets,
        playBtn
    }
})
export default class SyncPage extends Vue {
    show = false

    get androidUrl() {
      const a = this.assets.find(i => i.platform === 'android')

      if (a) {
        return a.url
      } else {
        return ''
      }
    }
    
    get preferredAsset() {
        return this.$env.preferredAsset(this.$env.syncReleases[0].assets)
    }

    get assets() {
      this.$env.syncReleases[0].assets.push({
        ...iosApp,
        url: this.$env.AppStore
      })
      return this.$env.syncReleases[0].assets
    }
}
</script>
<style lang="scss" scoped>
.btn-download {
    padding: 0.4rem 1.5rem;
    height: auto;
    border-radius: 5px;
}
</style>
