import { CommonRessourceFields } from './common'
import { FullFilm } from './Film'
import { FullPerson } from './person'

export type BasePlanet = {
    name: string
    id: number
}

export type FullPlanet = BasePlanet &
    CommonRessourceFields &
    PlanetRelations & {
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
