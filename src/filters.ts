import Vue from 'vue'


Vue.filter('osName', (platform: NodeJS.Platform) => {
    switch (platform) {
        case 'win32':
            return 'Windows'
        case 'darwin':
            return 'MacOS'
        case 'linux':
            return 'Linux'
        case 'android':
            return 'Android'
    }
    return ''
})

Vue.filter('osLogo', (platform: NodeJS.Platform) => {
    switch (platform) {
        case 'win32':
            return require('@/assets/windows.svg')
        case 'darwin':
            return require('@/assets/macOS.svg')
        case 'linux':
            return require('@/assets/linux.svg')
        case 'android':
            return require('@/assets/android.svg')
    }
    return ''
})

Vue.filter('osArch', (arch: 'x86' | 'arm64' | 'universal', platform: NodeJS.Platform) => {
    switch (arch) {
        case 'x86':
            return platform === 'darwin' ? 'Intel Chip' :'64 bit'
        case 'arm64':
            return platform === 'darwin' ? 'Apple Silicon' :'ARM 64'
        case 'universal':
            return 'Universal'
    }
    return ''
})

Vue.filter('size', (size: number) => {
    if (size > 10 ** 9) {
        return Math.round(size / 10 ** 9) + ' GB'
    }
    if (size > 10 ** 6) {
        return Math.round(size / 10 ** 6) + ' MB'
    }
    if (size > 10 ** 3) {
        return Math.round(size / 10 ** 3) + ' KB'
    }
    return size + ' B'
})
