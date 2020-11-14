import { Boom } from '@hapi/boom'
import { Request, ResponseToolkit } from '@hapi/hapi'

import { RESSOURCES } from '../constants/swapi'
import { SearchResult, SwapiResultItems } from '../types/search'
import { searchItemFormatters } from '../utils/swapiFormatter'
import { searchSwapi } from '../utils/swapiClient'

type ResultTree = {
    [key in RESSOURCES]: SearchResult<SwapiResultItems> | null
}

export async function searchHandler(request: Request, h: ResponseToolkit) {
    try {
        const { keyword, type } = request.query
        const ressourceTypes = Object.values(RESSOURCES)
        const response = ressourceTypes.reduce((resultPerType, type) => {
            resultPerType[type] = null

            return resultPerType
        }, {} as ResultTree)

        if (type) {
            response[type as RESSOURCES] = await searchSwapi(type, keyword)
        } else {
            const matches = await searchAllRessources(ressourceTypes, keyword)
            matches.forEach(
                ({ ressource, data }) => (response[ressource] = data)
            )
        }

        return formatResults(response)
    } catch (e) {
        return new Boom('An error occured')
    }

    async function searchAllRessources(
        ressourceTypes: RESSOURCES[],
        keyword: string
    ) {
        const searchRessource = async (ressource: RESSOURCES) => ({
            ressource,
            data: await searchSwapi(ressource, keyword)
        })

        return await Promise.all(
            ressourceTypes.map((ressource) => searchRessource(ressource))
        )
    }

    function formatResults(results: ResultTree): ResultTree {
        return Object.keys(results).reduce((formatedResultTree, key) => {
            const ressourceType = key as RESSOURCES
            const ressourceResults = results[ressourceType]
            formatedResultTree[ressourceType] = ressourceResults
                ? {
                      ...ressourceResults,
                      results: (ressourceResults.results as Array<
                          any
                      >).map((item: any) =>
                          searchItemFormatters[key as RESSOURCES](item)
                      )
                  }
                : null

            return formatedResultTree
        }, {} as ResultTree)
    }
}
