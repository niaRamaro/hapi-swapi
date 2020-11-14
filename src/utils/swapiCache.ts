import * as config from '../../config.json'

type CacheData = {
    createdAt: number
    data: Object
}

const swapiCache = new Map<string, CacheData>()

export function hasCache(key: string): boolean {
    if (swapiCache.has(key)) {
        const { createdAt } = swapiCache.get(key) as CacheData
        const isCacheValid = createdAt + config.cache_duration * 1000 > getNow()
        if (!isCacheValid) {
            swapiCache.delete(key)
        }

        return isCacheValid
    }

    return false
}

export function getCache(key: string) {
    return getCopy((swapiCache.get(key) as CacheData).data)
}

export function setCache(key: string, value: Object) {
    if (value) {
        swapiCache.set(key, {
            createdAt: getNow(),
            data: getCopy(value)
        })
    }
}

function getNow(): number {
    return new Date().getTime()
}

function getCopy(data: any) {
    return JSON.parse(JSON.stringify(data))
}
