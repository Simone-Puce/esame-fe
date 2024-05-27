import axios from "axios"
import { Segnalazione } from "../models/Segnalazione"

const APP_CONTEXT_URI = "http://localhost:8080/api"
const VERSION_URI = APP_CONTEXT_URI + "/v1"
const SEGNALAZIONE_BASE_URI = VERSION_URI + "/segnalazioni"

export const getFilteredSegnalazioni = async (emailCliente: string, dataAssunzione: string | null) => {
    const response = await axios.get(SEGNALAZIONE_BASE_URI, {
        params: {
            emailCliente: emailCliente ? emailCliente : null,
            creation: dataAssunzione ? dataAssunzione : null
        }
    })
    return response
}

export const creaSegnalazione = async (segnalazione: Segnalazione) => {
    console.log(segnalazione)
    const response = await axios.post(SEGNALAZIONE_BASE_URI, segnalazione)
    return response;
}

export const deleteSegnalazione = async (id: number) => {
    const response = await axios.delete(`${SEGNALAZIONE_BASE_URI}/${id}`)
    return response
}