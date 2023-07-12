import Vue from 'vue'


Vue.filter('osName', (platform: NodeJS.Platform | 'ios') => {
    switch (platform) {
        case 'win32':
            return 'Windows'
        case 'darwin':
            return 'MacOS'
        case 'linux':
            return 'Linux'
        case 'android':
            return 'Android'
        case 'ios':
            return 'iOS'
    }
    return ''
})

Vue.filter('osLogo', (platform: NodeJS.Platform | 'ios') => {
    switch (platform) {
        case 'win32':
            return require('@/assets/windows.svg')
        case 'darwin':
            return require('@/assets/macOS.svg')
        case 'linux':
            return require('@/assets/linux.svg')
        case 'android':
            return require('@/assets/android.svg')
        case 'ios':
            return require('@/assets/ios.svg')
    }
    return ''
})

Vue.filter('osArch', (arch: 'x86' | 'arm64' | 'universal', platform: NodeJS.Platform | 'ios') => {
    switch (arch) {
        case 'x86':
            return platform === 'darwin' ? 'Intel Chip' :'x64'
        case 'arm64':
            if (platform === 'android') {
                return 'apk'
            } if (platform === 'ios') {
              return 'App Store'
            } else {
                return platform === 'darwin' ? 'Apple Silicon' :'Arm64'
            }

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
