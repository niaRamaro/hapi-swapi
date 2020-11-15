import { CommonRessourceFields } from './common'
import { FullFilm } from './film'
import { FullSpecies } from './species'
import { FullStarship } from './starship'
import { FullVehicle } from './vehicle'

export type FullPerson = CommonRessourceFields &
    PersonRelations & {
        id: number
        name: string
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
