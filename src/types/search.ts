import { BaseFilm, FullFilm } from './Film'
import { BasePerson, FullPerson } from './person'
import { BasePlanet, FullPlanet } from './planet'
import { BaseSpecies, FullSpecies } from './species'
import { BaseStarship, FullStarship } from './starship'
import { BaseVehicle, FullVehicle } from './Vehicle'

export type SearchResult<T> = {
    count: number
    next: string
    previous: string
    results: T
}

export type SwapiResultItems =
    | BaseFilm[]
    | BasePerson[]
    | BasePlanet[]
    | BaseSpecies[]
    | BaseStarship[]
    | BaseVehicle[]

export type SwapiDetail =
    | FullFilm
    | FullPerson
    | FullPlanet
    | FullSpecies
    | FullStarship
    | FullVehicle
