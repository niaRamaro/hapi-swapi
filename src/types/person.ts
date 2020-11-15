import { PlanetInfos } from './planet'
import { SpeciesInfos } from './species'
import { StarshipInfos } from './starship'
import { VehicleInfos } from './vehicle'
import { CommonRessourceFields } from './common'
import { FilmInfos } from './film'

export type FullPerson = CommonRessourceFields & PersonRelations & PersonInfos

export type PersonInfos = {
    id: number
    name: string
    birth_year: string
    eye_color: string
    gender: string
    hair_color: string
    height: string
    mass: string
    skin_color: string
}

export type PersonRelations = {
    films: FilmInfos[]
    homeworld: PlanetInfos
    species: SpeciesInfos[]
    starships: StarshipInfos[]
    vehicles: VehicleInfos[]
}
