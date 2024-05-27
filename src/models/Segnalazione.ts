import { Cliente } from "./Cliente"
import { Tecnico } from "./Tecnico"

export interface Segnalazione {
    idSegnalazione?: number
    cliente: Cliente
    tecnico: Tecnico
    dataOra?: Date
}