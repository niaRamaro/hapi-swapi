import { CommonRessourceFields } from './common'
import { FullFilm } from './film'
import { FullPerson } from './person'

export type FullVehicle = CommonRessourceFields &
    VehicleRelations & {
        id: number
        name: string
        model: string
        vehicle_class: string
        manufacturer: string
        length: string
        cost_in_credits: string
        crew: string
        passengers: string
        max_atmosphering_speed: string
        cargo_capacity: string
        consumables: string
    }

export type VehicleRelations = {
    films: FullFilm[]
    pilots: FullPerson[]
}
