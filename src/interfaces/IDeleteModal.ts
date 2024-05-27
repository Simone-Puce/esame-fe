import { Dispatch } from "react";
import { Segnalazione } from "../models/Segnalazione";

export interface IDeleteModal {
    segnalazioni: Segnalazione[],
    setSegnalazioni: Dispatch<Segnalazione[]>,
    closeDeleteConfirmModal: () => void,
    confirmDeleteModal: boolean,
    idSegnalazione: number
}