<template>
    <div>
        <div class="bg-dark px-2 py-2">
            <header class="navbar">
                <section class="navbar-section ml-2">
                    <img width="30" src="../assets/vechain-logo.svg" alt />
                    <a class="text-light mx-2">VeChain Sync</a>
                    <a
                        href="https://docs.vechain.org/sync2/user-guide/"
                        target="_blank"
                        class="hide-md btn text-light btn-link"
                    >User Guide</a>
                </section>
                <section class="navbar-section">
                    <a class="hide-md nav-link" href="https://github.com/vechain">
                        <img src="../assets/github-logo.svg" width="20" />
                    </a>

                    <i class="icon-menu icon show-md" @click="shoeMenu = !shoeMenu" />
                </section>
            </header>
            <div v-if="shoeMenu">
                <ul class="menu bg-dark text-left">
                    <li class="menu-item">
                        <a
                            href="https://docs.vechain.org/sync2/user-guide/"
                            target="_blank"
                            class="nav-link text-light"
                        >User Guide</a>
                    </li>
                    <li class="menu-item">
                        <a class="nav-link" target="_blank" href="https://github.com/vechain">
                            <img src="../assets/github-logo.svg" width="20" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <SyncPage v-show="hash !== '#thor-wallet'" />
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SyncPage from './SyncPage.vue'
import { print } from 'util';

@Component({
    components: {
        SyncPage
    }
})
export default class Home extends Vue {
    private hash = location.hash
    private shoeMenu = false

    private created() {
        this.$ga.page('/sync.vecha.in/home')
    }

    private switchTab(hash: string) {
        location.href = hash
        this.hash = hash
    }
}
</script>
<style lang="scss" scoped>
.nav-link {
    padding: 0.25rem 0.4rem;
    color: currentColor;
}

.tab-item {
    padding: 0.1rem 0.6rem;
    margin: 0rem 0.5rem;
    color: currentColor;
    text-decoration: none;
}
.tab-item.active {
    font-size: 1rem;
    border-bottom: 2px solid white;
}
</style>
