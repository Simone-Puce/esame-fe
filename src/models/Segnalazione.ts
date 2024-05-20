import { Cliente } from "./Cliente"
import { Tecnico } from "./Tecnico"

export interface Segnalazione {
    id?: number
    descrizione: string
    cliente: Cliente
    tecnico: Tecnico
    creation?: Date
}