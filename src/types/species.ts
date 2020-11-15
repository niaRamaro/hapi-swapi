import { CommonRessourceFields } from './common'
import { FullFilm } from './film'
import { FullPerson } from './person'
import { FullPlanet } from './planet'

export type FullSpecies = CommonRessourceFields &
    SpeciesRelations & {
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
    homeworld: FullPlanet
    people: FullPerson[]
    films: FullFilm[]
}
