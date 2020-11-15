import { FilmInfos, FullFilm } from './film'
import { FullPerson, PersonInfos } from './person'
import { FullPlanet, PlanetInfos } from './planet'
import { FullSpecies, SpeciesInfos } from './species'
import { FullStarship, StarshipInfos } from './starship'
import { FullVehicle, VehicleInfos } from './vehicle'

export type SearchQuery = {
    type: string
    keyword: string
}

export type SearchResult = {
    count: number
    next: string
    previous: string
    results: SwapiResultItem
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

export type SwapiInfos =
    | FilmInfos
    | PersonInfos
    | PlanetInfos
    | SpeciesInfos
    | StarshipInfos
    | VehicleInfos
