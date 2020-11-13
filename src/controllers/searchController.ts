import { Boom } from '@hapi/boom'
import { Request, ResponseToolkit } from '@hapi/hapi'

import { RESSOURCES } from '../constants/swapi'
import { SearchResult, SwapiResultItems } from '../types/search'
import { searchItemFormatters } from '../utils/swapiFormatter'
import { searchSwapi } from '../utils/swapiClient'

export async function searchHandler(request: Request, h: ResponseToolkit) {
    try {
        const { keyword, type } = request.query
        const ressources = Object.values(RESSOURCES)
        const results = ressources.reduce((responseObject, key) => {
            responseObject[key] = null

            return responseObject
        }, {} as { [key in RESSOURCES]: SearchResult<SwapiResultItems> | null })

        if (type) {
            results[type as RESSOURCES] = await searchSwapi(type, keyword)
        } else {
            const searchRessource = async (ressource: RESSOURCES) => ({
                ressource,
                data: await searchSwapi(ressource, keyword)
            })
            const searches = await Promise.all(
                ressources.map((ressource) => searchRessource(ressource))
            )
            searches.forEach(
                ({ ressource, data }) => (results[ressource] = data)
            )
        }

        return Object.keys(results).reduce((formatedResults, key) => {
            const ressource = key as RESSOURCES
            const ressourceResults = results[ressource]
            if (ressourceResults) {
                formatedResults[ressource] = {
                    ...ressourceResults,
                    results: (ressourceResults.results as Array<
                        any
                    >).map((item: any) =>
                        searchItemFormatters[key as RESSOURCES](item)
                    )
                }
            } else {
                formatedResults[ressource] = null
            }

            return formatedResults
        }, {} as { [key in RESSOURCES]: SearchResult<SwapiResultItems> | null })
    } catch (e) {
        return new Boom('An error occured')
    }
}
