import { Boom } from '@hapi/boom'
import { Request, ResponseToolkit } from '@hapi/hapi'

import { RESSOURCES } from '../constants/swapi'
import { searchSwapi } from '../utils/swapiClient'

export async function searchHandler(request: Request, h: ResponseToolkit) {
    try {
        const { keyword, type } = request.query
        const ressources = Object.values(RESSOURCES)
        const response = ressources.reduce((responseObject, key) => {
            responseObject[key] = null

            return responseObject
        }, {} as { [key in RESSOURCES]: any })

        if (type) {
            response[<RESSOURCES>type] = await searchSwapi(type, keyword)
        } else {
            const searchRessource = async (ressource: RESSOURCES) => ({
                ressource,
                data: await searchSwapi(ressource, keyword)
            })
            const searches = await Promise.all(
                ressources.map((ressource) => searchRessource(ressource))
            )
            searches.forEach(
                ({ ressource, data }) => (response[ressource] = data)
            )
        }

        return response
    } catch (e) {
        return new Boom('An error occured')
    }
}
