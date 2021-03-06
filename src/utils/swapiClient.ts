import fetch from 'node-fetch'
import { stringify } from 'querystring'

import * as config from '../../config.json'
import { RESSOURCES } from '../constants/swapi'
import { SearchResult, SwapiDetail } from '../types/search'
import { hasCache, getCache, setCache } from './swapiCache'

export async function getSwapi<T>(url: string): Promise<T> {
    if (hasCache(url)) {
        return getCache(url) as any
    } else {
        const result = await (
            await fetch(url, {
                redirect: 'follow'
            })
        ).json()
        setCache(url, result)

        return result
    }
}

export async function searchSwapi(
    ressource: RESSOURCES,
    keyword: string,
    page: number = 1
): Promise<SearchResult | null> {
    try {
        const url = `${config.api_url}/${ressource}?${stringify({
            search: keyword,
            page: page >= 1 ? page : 1
        })}`

        return await getSwapi(url)
    } catch (e) {
        return null
    }
}

export async function getDetailSwapi(
    ressource: RESSOURCES,
    id: number
): Promise<SwapiDetail | null> {
    try {
        const url = `${config.api_url}/${ressource}/${id}`

        return await getSwapi(url)
    } catch (e) {
        return null
    }
}
