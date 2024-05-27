import { FormInstance } from "antd"

export interface ICreationModal {
    creaSegnalazioneModal: boolean
    closeCreateModal: () => void
    createForm: FormInstance<any>
    creaNuovaSegnalazione: () => Promise<any>
}