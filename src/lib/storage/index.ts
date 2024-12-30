import { AssetType } from './enum'
import Asset from 'scratch-storage/src/Asset'
import type { ScratchStorage } from 'scratch-storage/src/ScratchStorage'

export interface StorageInitializer {
  loadAsset(): void
}
const caches = new Map<string, Asset>()
export class Storage {
  AssetType = AssetType as unknown as ScratchStorage['AssetType']
  constructor() {
    
  }
  scratchFetch = {
    scratchFetch: globalThis.fetch.bind(globalThis),
    RequestMetadata: {
      ProjectId: 'X-Project-ID',
      RunId: 'X-Run-ID'
    },
    setMetadata(name: string, value: string) {}
  }
  get(id: string) {
    return caches.get(id) ?? null
  }
  async load(assetType: ScratchStorage.AssetType, assetId: string, dataFormat: ScratchStorage.DataFormat): Promise<Asset | null> {
    if (caches.has(assetId)) {
      return caches.get(assetId) ?? null
    }
    const ext = assetType.name ==  'ImageBitmap' ? 'png' : assetType.name === 'ImageVector' ? 'svg' : 'wav'
    const url = `https://cdn.assets.scratch.mit.edu/internalapi/asset/${assetId}.${ext}/get/`
    const buff = await fetch(url).then(res => res.arrayBuffer())
    const arr = new Uint8Array(buff)
    const asset = new Asset(assetType, assetId, dataFormat, arr)
    caches.set(assetId, asset)
    return asset
  }
  defaultAssetId = 'cd21514d0531fdffb22204e0ec5ed84a'
}