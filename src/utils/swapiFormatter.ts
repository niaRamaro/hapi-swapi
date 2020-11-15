import { RESSOURCES } from '../constants/swapi'
import { SwapiResultItem } from '../types/search'

export const searchItemFormatters: {
    [key in RESSOURCES]: (item: any) => SwapiResultItem
} = {
    [RESSOURCES.FILMS]: ({ title, url }) => ({
        name: title,
        id: getIdFromUrl(url)
    }),
    [RESSOURCES.PEOPLE]: ({ name, url }) => ({ name, id: getIdFromUrl(url) }),
    [RESSOURCES.PLANETS]: ({ name, url }) => ({ name, id: getIdFromUrl(url) }),
    [RESSOURCES.SPECIES]: ({ name, url }) => ({ name, id: getIdFromUrl(url) }),
    [RESSOURCES.STARSHIPS]: ({ name, url }) => ({
        name,
        id: getIdFromUrl(url)
    }),
    [RESSOURCES.VEHICLES]: ({ name, url }) => ({ name, id: getIdFromUrl(url) })
}

export function getIdFromUrl(url: string): number {
    const urlParts = url.split('/').filter((part) => part)

    return +urlParts[urlParts.length - 1]
}
