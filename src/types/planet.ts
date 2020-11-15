import { CommonRessourceFields } from './common'
import { FullFilm } from './film'
import { FullPerson } from './person'

export type FullPlanet = CommonRessourceFields &
    PlanetRelations & {
        id: number
        name: string
        diameter: string
        rotation_period: string
        orbital_period: string
        gravity: string
        population: string
        climate: string
        terrain: string
        surface_water: string
    }

export type PlanetRelations = {
    residents: FullPerson[]
    films: FullFilm[]
}
