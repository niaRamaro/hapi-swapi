import { CommonRessourceFields } from './common'
import { FullPerson } from './person'
import { FullPlanet } from './planet'
import { FullSpecies } from './species'
import { FullStarship } from './starship'
import { FullVehicle } from './Vehicle'

export type BaseFilm = {
    title: string
    id: number
}

export type FullFilm = BaseFilm &
    CommonRessourceFields &
    FilmRelations & {
        episode_id: number
        opening_crawl: string
        director: string
        producer: string
        release_date: string
    }

export type FilmRelations = {
    characters: FullPerson[]
    planets: FullPlanet[]
    starships: FullStarship[]
    vehicles: FullVehicle[]
    species: FullSpecies[]
}
