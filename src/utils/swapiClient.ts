import fetch from 'node-fetch'
import { stringify } from 'querystring'

import * as config from '../../config.json'
import { RESSOURCES } from '../constants/swapi'
import { SearchResult, SwapiDetail, SwapiResultItems } from '../types/search'

export async function searchSwapi(
    ressource: RESSOURCES,
    keyword: string
): Promise<SearchResult<SwapiResultItems> | null> {
    try {
        return (
            await fetch(
                `${config.api_url}/${ressource}?${stringify({
                    search: keyword
                })}`,
                {
                    redirect: 'follow'
                }
            )
        ).json()
    } catch (e) {
        return null
    }
}

export async function getDetailSwapi(
    ressource: RESSOURCES,
    id: number
): Promise<SwapiDetail | null> {
    try {
        return (
            await fetch(`${config.api_url}/${ressource}/${id}`, {
                redirect: 'follow'
            })
        ).json()
    } catch (e) {
        return null
    }
}
