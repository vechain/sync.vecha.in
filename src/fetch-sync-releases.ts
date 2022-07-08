#!/usr/bin/env node

import _https from 'https'
import http from 'http'
// tslint:disable-next-line:no-var-requires
const https = require('follow-redirects').https as typeof _https
import { writeFileSync } from 'fs'
import * as Path from 'path'
import * as URL from 'url'
import JSYaml from 'js-yaml'

function getArch(appUrl: string): 'arm64' | 'x86' | 'universal' {
    if (appUrl.includes('-win-')) {
        return 'universal'
    }

    if (appUrl.includes('arm64') || appUrl.includes('android')) {
        return 'arm64'
    }

    return 'x86'
}

function getPlatform(ymlUrl: string): NodeJS.Platform {
    if (ymlUrl.endsWith('-linux.yml') || ymlUrl.endsWith('-linux-arm64.yml')) {
        return 'linux'
    }
    if (ymlUrl.endsWith('-mac.yml')) {
        return 'darwin'
    }
    return 'win32'
}
async function fetchReleases() {
    const releases: Release[] = []
    const header: http.OutgoingHttpHeaders = {}
    if (process.env.GH_TOKEN) {
        header.Authorization = 'token ' + process.env.GH_TOKEN
    }
    const data = await httpGet('https://api.github.com/repos/vechain/sync2/releases', header)
    const items = JSON.parse(data) as any[]
    for (const item of items) {
        const assets: Release.Asset[] = []
        releases.push({
            version: item.name,
            releaseDate: item.created_at,
            assets
        })
        // const apps = (item.assets as any[])
        //     .filter(asset => asset.browser_download_url.startsWith('Sync2') && !asset.browser_download_url.endsWith('blockmap'))
        const ymlAssets = (item.assets as any[])
            .filter(asset => asset.browser_download_url.endsWith('.yml'))
        const apks = (item.assets as any[])
        .filter(asset => asset.browser_download_url.endsWith('.apk'))

        for (const asset of ymlAssets) {
            const yml = JSYaml.safeLoad(await httpGet(asset.browser_download_url))
            const files = (yml.files as any[])
                .filter(f =>
                    f.url.endsWith('.exe') || f.url.endsWith('.dmg') || f.url.endsWith('.AppImage')
                )
            
            if (files.length) {
                files.forEach(file => {
                    assets.push({
                        fileName: file.url,
                        url: URL.resolve(asset.browser_download_url, file.url),
                        size: file.size,
                        checksum: file.sha512,
                        platform: getPlatform(asset.browser_download_url),
                        arch: getArch(file.url)
                    })
                })
            }
        }
        apks.forEach(apk => {
            assets.push({
                fileName: apk.name,
                url: apk.browser_download_url,
                size: apk.size,
                checksum: '',
                platform: 'android',
                arch: getArch(apk.name)
            })
        })
    }
    return releases
}

function httpGet(url: string, header = {}) {
    return new Promise<string>((resolve, reject) => {
        https.get(url,
            { headers: { 'User-Agent': 'Mozilla}/5.0', ...header } },
            res => {
                if (res.statusCode !== 200) {
                    reject(new Error('Invalid response code: ' + res.statusCode))
                }
                const chunks: Buffer[] = []
                res.on('data', chunk => {
                    chunks.push(chunk)
                })
                res.on('end', () => {
                    resolve(Buffer.concat(chunks).toString('utf8'))
                })
            }).on('error', err => {
                reject(err)
            })
    })
}

fetchReleases().then(assets => {
    writeFileSync(Path.resolve(__dirname, 'assets', 'sync-releases.json'), JSON.stringify(assets), 'utf8')
}).catch(err => {
    // tslint:disable-next-line:no-console
    console.error(err)
    process.exit(1)
})

