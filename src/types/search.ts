import { BaseFilm } from './Film'
import { BasePerson } from './person'
import { BasePlanet } from './planet'
import { BaseSpecies } from './species'
import { BaseStarship } from './starship'
import { BaseVehicle } from './Vehicle'

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
