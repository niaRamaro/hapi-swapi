import { RESSOURCES } from '../constants/swapi'

export const searchItemFormatters: {
    [key in RESSOURCES]: (item: any) => any
} = {
    [RESSOURCES.FILMS]: ({ title, url }) => ({ title, id: getIdFromUrl(url) }),
    [RESSOURCES.PEOPLE]: ({ name, url }) => ({ name, id: getIdFromUrl(url) }),
    [RESSOURCES.PLANETS]: ({ name, url }) => ({ name, id: getIdFromUrl(url) }),
    [RESSOURCES.SPECIES]: ({ name, url }) => ({ name, id: getIdFromUrl(url) }),
    [RESSOURCES.STARSHIPS]: ({ name, url }) => ({
        name,
        id: getIdFromUrl(url)
    }),
    [RESSOURCES.VEHICLES]: ({ name, url }) => ({ name, id: getIdFromUrl(url) })
}

function getIdFromUrl(url: string): number {
    const urlParts = url.split('/').filter((part) => part)

    return +urlParts[urlParts.length - 1]
}
