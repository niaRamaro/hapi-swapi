import { Boom } from '@hapi/boom'
import { Request, ResponseToolkit } from '@hapi/hapi'

import { RESSOURCES } from '../constants/swapi'
import { SearchResult } from '../types/search'
import { searchItemFormatters } from '../utils/swapiFormatter'
import { searchSwapi } from '../utils/swapiClient'

type ResultTree = {
    [key in RESSOURCES]: SearchResult | null
}

export async function searchHandler(request: Request, h: ResponseToolkit) {
    try {
        const { keyword, type, page } = request.query
        const ressourceTypes = Object.values(RESSOURCES)
        const response = ressourceTypes.reduce((resultPerType, type) => {
            resultPerType[type] = null

            return resultPerType
        }, {} as ResultTree)

        if (type) {
            response[type as RESSOURCES] = await searchSwapi(
                type,
                keyword,
                page
            )
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
                      previous: getPageFromUrl(
                          (ressourceResults.previous as string) || ''
                      ),
                      next: getPageFromUrl(
                          (ressourceResults.next as string) || ''
                      ),
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

    function getPageFromUrl(url: string) {
        if (url) {
            const { searchParams } = new URL(url)
            const page = searchParams.get('page')

            return page ? +page : null
        }

        return null
    }
}
