import { Button, Modal } from "antd"
import { deleteSegnalazione } from "../services/SegnalazioneService"
import { Segnalazione } from "../models/Segnalazione"
import { ReactElement } from "react"
import { IDeleteModal } from "../interfaces/IDeleteModal"

export const DeleteModal = ({segnalazioni,setSegnalazioni,closeDeleteConfirmModal,confirmDeleteModal,idSegnalazione}: IDeleteModal): ReactElement => {

    const deleteSegnalazioneHandler = async (id: number) => {
        const response = await deleteSegnalazione(id)
        console.log(response)
        const newSegnalazioni = segnalazioni.filter((segnalazione: Segnalazione) =>
            segnalazione.idSegnalazione !== id
        )
        setSegnalazioni(newSegnalazioni)
        closeDeleteConfirmModal()
    }

    return (
        <Modal title="Conferma eliminazione" open={confirmDeleteModal} onCancel={closeDeleteConfirmModal} footer="">
            <div className="modal-div-body">
                <Button className="button-style" onClick={() => deleteSegnalazioneHandler(idSegnalazione)}> Conferma eliminazione</Button>
                <Button className="button-style delete-button" onClick={() => closeDeleteConfirmModal()}> Annulla eliminazione</Button>
            </div>
        </Modal>
    )
}