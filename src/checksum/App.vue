<template>
    <div>
        <ul>
            <li v-for="(item, i) in data" :key="i" style="margin-bottom: 15px">
                <strong>{{item.fileName}}</strong>
                <br />
                SHA512: <i> {{item.checksum}}</i>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class App extends Vue {
    get data () {
        return this.$env.syncReleases[0].assets.filter(item => { return !item.fileName.includes('android') })
    }
}
</script>