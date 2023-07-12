<template>
    <div class="container">
        <div class="d-inline-block links-container" style="justify-content: center;">
            <div v-for="(group, i) in groupedAssets" :key="i">
                <div class="columns" style="margin: 0 15px;">
                    <img width="30em" :src="group[0].platform | osLogo" />
                    <span
                        class="ml-1"
                        style="align-self: center; font-size: 1.2em"
                    >{{group[0].platform | osName}}</span>

                    <template v-for="item in group">
                      <a v-if="item.platform === 'ios'" style="align-self: center; font-size: 0.6em" class="label label-primary ml-1"
                       :href="appUrl">App Store</a>
                      <a v-if="item.platform === 'android'" style="align-self: center; font-size: 0.6em" class="label label-primary ml-1"
                       :href="playUrl">Google Play</a>
                       <a
                          :key="item.checknum"
                          :href="item.url"
                          target="_blank"
                          class="label label-primary ml-1"
                          style="align-self: center; font-size: 0.6em"
                      >{{item.arch | osArch(item.platform)}}</a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

@Component
export default class DownloadAssets extends Vue {
    @Prop(Array)
    private assets!: Release.Asset[]

    get playUrl(): string {
      return this.$env.GooglePlay
    }

    get appUrl(): string {
      return this.$env.AppStore
    }

    get groupedAssets() {
        const orderP = ['win32', 'darwin', 'linux', 'android', 'ios']
        const orderA = ['x86', 'arm64', 'universal']

        let result: Release.Asset[][] = []
        orderP.forEach(item => {
            result = [
                ...result,
                this.assets
                    .filter(asset => {
                        return asset.platform === item
                    })
                    .sort((ra, rb) => {
                        return orderA.indexOf(ra.arch) - orderA.indexOf(rb.arch)
                    })
            ]
        })

        return result
    }
}
</script>
<style scoped>
.links-container > div {
    margin: 15px 0;
}
</style>
