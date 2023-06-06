
type Release = {
    version: string
    releaseDate: string
    assets: Release.Asset[]
}

declare namespace Release {
    type Asset = {
        fileName: string
        url: string
        size: number
        checksum: string
        platform: NodeJS.Platform | 'ios',
        arch: 'arm64' | 'x86' | 'universal'
    }
}
