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
                        alt="VeChain Sync Logo"
                    />
                    <h2>VeChain Sync2</h2>
                </div>
                <div style="font-size:1rem;">The next-generation VeChain wallet for all platforms</div>
                <br />
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
                <DownloadAssets style="max-width: 320px;" v-show="show" :assets="$env.syncReleases[0].assets" />
                <div
                    v-if="preferredAsset"
                    class="my-2 caption"
                >{{$env.syncReleases[0].version}} for {{preferredAsset.platform | osName}} {{preferredAsset.arch | osArch(preferredAsset.platform)}} ({{preferredAsset.size | size}})</div>
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
                class="column col-3 col-mx-auto col-sm-12 text-center"
                style="padding-top: 30px; padding-bottom: 30px"
            >
                <img src="../assets/asset.svg" width="120" />
                <h4>Asset Management</h4>
                <div style="font-size:1rem;">Send and receive assets in one place.</div>
            </div>
            <div
                class="column col-3 col-mx-auto col-sm-12 text-center"
                style="padding-top: 30px; padding-bottom: 30px"
            >
                <img src="../assets/dapps.svg" width="120" />
                <h4>DApps Interaction</h4>
                <div style="font-size:1rem;">Sign transactions and certificates anytime, anywhere.</div>
            </div>
            <div
                class="column col-3 col-mx-auto col-sm-12 text-center"
                style="padding-top: 30px; padding-bottom: 30px"
            >
                <img src="../assets/platforms.svg" width="120" />
                <h4>All Platforms</h4>
                <div
                    style="font-size:1rem;"
                >Designed to work with desktop, mobile devices and all mainstream web browsers.</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import DownloadAssets from './DownloadAssets.vue'

@Component({
    components: {
        DownloadAssets
    }
})
export default class SyncPage extends Vue {
    show = false
    get preferredAsset() {
        return this.$env.preferredAsset(this.$env.syncReleases[0].assets)
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
