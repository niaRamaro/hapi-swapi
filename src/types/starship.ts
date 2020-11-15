import { CommonRessourceFields } from './common'
import { FilmInfos } from './film'
import { PersonInfos } from './person'

export type FullStarship = CommonRessourceFields &
    StarshipRelations &
    StarshipInfos

export type StarshipInfos = {
    id: number
    name: string
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
    films: FilmInfos[]
    pilots: PersonInfos[]
}
