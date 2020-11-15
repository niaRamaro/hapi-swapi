import { CommonRessourceFields } from './common'
import { FilmInfos } from './film'
import { PersonInfos } from './person'

export type FullPlanet = CommonRessourceFields & PlanetRelations & PlanetInfos

export type PlanetInfos = {
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
    residents: PersonInfos[]
    films: FilmInfos[]
}
