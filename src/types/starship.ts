import { CommonRessourceFields } from './common'
import { FullFilm } from './Film'
import { FullPerson } from './person'

export type BaseStarship = {
    name: string
    id: number
}

export type FullStarship = BaseStarship &
    CommonRessourceFields &
    StarshipRelations & {
        model: string
        starship_class: string
        manufacturer: string
        cost_in_credits: string
        length: string
        crew: string
        passengers: string
        max_atmosphering_speed: string
        hyperdrive_rating: string
        MGLT: string
        cargo_capacity: string
    }

export type StarshipRelations = {
    films: FullFilm[]
    pilots: FullPerson[]
}
