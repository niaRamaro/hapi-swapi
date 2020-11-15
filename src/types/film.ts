import { SpeciesInfos } from './species'
import { StarshipInfos } from './starship'
import { VehicleInfos } from './vehicle'
import { CommonRessourceFields } from './common'
import { PersonInfos } from './person'
import { PlanetInfos } from './planet'

export type FullFilm = CommonRessourceFields & FilmRelations & FilmInfos

export type FilmInfos = {
    id: number
    title: string
    episode_id: number
    opening_crawl: string
    director: string
    producer: string
    release_date: string
}

export type FilmRelations = {
    characters: PersonInfos[]
    planets: PlanetInfos[]
    starships: StarshipInfos[]
    vehicles: VehicleInfos[]
    species: SpeciesInfos[]
}
