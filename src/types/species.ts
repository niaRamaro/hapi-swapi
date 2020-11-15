import { CommonRessourceFields } from './common'
import { FilmInfos } from './film'
import { PersonInfos } from './person'
import { PlanetInfos } from './planet'

export type FullSpecies = CommonRessourceFields &
    SpeciesRelations &
    SpeciesInfos

export type SpeciesInfos = {
    id: number
    name: string
    classification: string
    designation: string
    average_height: string
    average_lifespan: string
    eye_colors: string
    hair_colors: string
    skin_colors: string
    language: string
}

export type SpeciesRelations = {
    homeworld: PlanetInfos
    people: PersonInfos[]
    films: FilmInfos[]
}
