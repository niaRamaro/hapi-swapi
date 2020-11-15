import { FullFilm } from './film'
import { FullPerson } from './person'
import { FullPlanet } from './planet'
import { FullSpecies } from './species'
import { FullStarship } from './starship'
import { FullVehicle } from './vehicle'

export type SearchResult = {
    count: number
    next: string
    previous: string
    results: SwapiResultItem[]
}

export type SwapiResultItem = {
    name: string
    id: number
}

export type SwapiDetail =
    | FullFilm
    | FullPerson
    | FullPlanet
    | FullSpecies
    | FullStarship
    | FullVehicle
