import { CommonRessourceFields } from './common'
import { FullFilm } from './Film'
import { FullPerson } from './person'

export type BaseSpecies = {
    name: string
    id: number
}

export type FullSpecies = BaseSpecies &
    CommonRessourceFields &
    SpeciesRelations & {
        classification: string
        designation: string
        average_height: string
        average_lifespan: string
        eye_colors: string
        hair_color: string
        skin_colors: string
        language: string
        homeworld: string
    }

export type SpeciesRelations = {
    people: FullPerson[]
    films: FullFilm[]
}
