import fetch from 'node-fetch'
import { stringify } from 'querystring'

import * as config from '../../config.json'
import { RESSOURCES } from '../constants/swapi'

export async function searchSwapi<T>(
    ressource: RESSOURCES,
    keyword: string
): Promise<T | null> {
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
