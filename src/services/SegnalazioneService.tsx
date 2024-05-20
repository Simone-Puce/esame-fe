import axios from "axios"
import { Segnalazione } from "../models/Segnalazione"

const APP_CONTEXT_URI = "http://localhost:8080/api"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const SEGNALAZIONE_BASE_URI = VERSION_URI + "/segnalazioni"
const GET_ALL_SEGNALAZIONI = SEGNALAZIONE_BASE_URI + "/getall"
const CREATE_SEGNALAZIONE = SEGNALAZIONE_BASE_URI + "/create"
const DELETE_SEGNALAZIONE = SEGNALAZIONE_BASE_URI + "/delete"

export const getFilteredSegnalazioni = async (cognomeCliente: string, dataCreazione: string | null) => {
    const response = await axios.get(GET_ALL_SEGNALAZIONI, {
        params: {
            cognome: cognomeCliente ? cognomeCliente : null,
            creation: dataCreazione ? dataCreazione : null
        }
    })
    return response
}

export const creaSegnalazione = async (segnalazione: Segnalazione) => {
    const response = await axios.post(CREATE_SEGNALAZIONE, {
        descrizione: segnalazione.descrizione,
        cliente: segnalazione.cliente,
        tecnico: segnalazione.tecnico
    })
    return response;
}

export const deleteSegnalazione = async (id: number) => {
    await axios.delete(DELETE_SEGNALAZIONE, {
        params: {
            id: id
        }
    })
}