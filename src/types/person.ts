import { CommonRessourceFields } from './common'
import { FullFilm } from './Film'
import { FullSpecies } from './species'
import { FullStarship } from './starship'
import { FullVehicle } from './Vehicle'

export type BasePerson = {
    name: string
    id: number
}

export type FullPerson = BasePerson &
    CommonRessourceFields &
    PersonRelations & {
        birth_year: string
        eye_color: string
        gender: string
        hair_color: string
        height: string
        mass: string
        skin_color: string
        homeworld: string
    }

export type PersonRelations = {
    films: FullFilm[]
    starships: FullStarship[]
    vehicles: FullVehicle[]
    species: FullSpecies[]
}
