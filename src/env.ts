import UAParser from 'ua-parser-js'
// tslint:disable-next-line:no-var-requires
const syncReleases = require('./assets/sync-releases') as Release[]

const ua = new UAParser(navigator.userAgent, {
    browser: [[/(sync)\/([\w\.]+)/i], [UAParser.BROWSER.NAME, UAParser.BROWSER.VERSION]]
})

const target = (() => {
    const hash = decodeURIComponent(window.location.hash)
    return (hash && hash.includes(':')) ?
        hash.slice(1) : ''
})()

const isAppleSilicon = () => {
  let result = false
  if (typeof document !== 'undefined') {
    let w = document.createElement('canvas').getContext('webgl')
    let d = w!.getExtension('WEBGL_debug_renderer_info')
    let g = d && w!.getParameter(d.UNMASKED_RENDERER_WEBGL) || '';
    let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    //Detect if the user is using a Apple GPU (M1)
    if (isSafari || (g.match(/Apple/) && !g.match(/Apple GPU/))) {
      result = true
    }
  }

  return result
}
const GooglePlay = 'https://play.google.com/store/apps/details?id=org.vechain.sync2'
const AppStore = 'https://apps.apple.com/app/6446363029'
const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

const isAndroid = () => {
  return /Android/.test(navigator.userAgent) && !window.MSStream
}

const env = {
    get prerender() {
        return !!(window as any).$PRERENDER
    },
    get platform(): NodeJS.Platform | undefined {
        if (this.prerender) {
            return undefined
        }
        switch (ua.getOS().name) {
            case 'Mac OS':
                return 'darwin'
            case 'Windows':
                return 'win32'
            case 'CentOS':
            case 'Fedora':
            case 'Debian':
            case 'Gentoo':
            case 'Linux':
            case 'Mandriva':
            case 'Mint':
            case 'RedHat':
            case 'Slackware':
            case 'SUSE':
            case 'Ubuntu':
                return 'linux'
        }
    },
    get target() {
        if (target.startsWith('/')) {
            const i = target.indexOf('/', 1)
            return {
                href: i > 0 ? target.slice(i + 1) : target,
                network: i > 0 ? target.slice(1, i) : ''
            }
        }
        return {
            href: target,
            network: ''
        }
    },
    syncReleases,
    isIOS,
    isAndroid,
    preferredAsset(assets: Release.Asset[]) {
      const isM1 = isAppleSilicon()
      console.log(this.platform, isM1)
        return assets.find(a => {
          if (this.platform === 'darwin' && isM1) {
            return a.platform === this.platform && a.arch === 'arm64'
          } else {
            return a.platform === this.platform && a.arch !== 'arm64'
          }
        })
    },
    GooglePlay,
    AppStore
}

export default env
