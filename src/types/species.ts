import { CommonRessourceFields } from './common'
import { FullFilm } from './film'
import { FullPerson } from './person'

export type FullSpecies = CommonRessourceFields &
    SpeciesRelations & {
        id: number
        name: string
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
