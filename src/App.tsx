import { Button, Card, DatePicker, Form, Input, Layout, message } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { ReactElement, useEffect, useState } from "react"
import "./App.css"
import { Segnalazione } from "./models/Segnalazione"
import { creaSegnalazione, getFilteredSegnalazioni } from "./services/SegnalazioneService"
import Sider from "antd/es/layout/Sider"
import { format } from 'date-fns'
import { DeleteModal } from "./components/DeleteModal"
import { CreationModal } from "./components/CreationModal"

function App() {
  const [creaSegnalazioneModal, setCreaSegnalazioneModal] = useState<boolean>(false)
  const [confirmDeleteModal, setDeleteConfirmModal] = useState<boolean>(false)
  const [createForm] = Form.useForm()
  const [filterForm] = Form.useForm()
  const [segnalazioni, setSegnalazioni] = useState<Segnalazione[]>([])
  
  const resetFilters = async (): Promise<any> => {
    filterForm.resetFields()
    const response = await getFilteredSegnalazioni(null,null)
    setSegnalazioni(response.data)
  }

  useEffect(() => {
    const firstFetch = async () => {
      const cognome: string = filterForm.getFieldValue("cognomeCliente")
      const creazioneString = filterForm.getFieldValue("dataCreazione")
      const formattedDate: string | null = creazioneString ? format(new Date(creazioneString), 'yyyy-MM-dd') : null;
      const response = await getFilteredSegnalazioni(cognome, formattedDate)
      setSegnalazioni(response.data)
    }

    firstFetch()
  }, [filterForm])

  const openCreateModal = (): void => {
    setCreaSegnalazioneModal(true);
  }

  const closeCreateModal = (): void => {
    setCreaSegnalazioneModal(false);
  }

  const openConfirmDeleteModal = (): void => {
    setDeleteConfirmModal(true);
  }

  const closeDeleteConfirmModal = (): void => {
    setDeleteConfirmModal(false);
  }


  const handleFilter = async (): Promise<any> => {
    const emailCliente: string = filterForm.getFieldValue("emailCliente")
    const creazioneString = filterForm.getFieldValue("dataAssunzione")
    const formattedDate: string | null = creazioneString ? format(new Date(creazioneString), 'yyyy-MM-dd') : null
    const filterResponse = await getFilteredSegnalazioni(emailCliente, formattedDate)
    setSegnalazioni(filterResponse.data)
  }

  const confirmInsert = (): void => {
    message.info('Inserito correttamente')
  }


  const creaNuovaSegnalazione = async (): Promise<any> => {
    const createResponse = await creaSegnalazione({
      cliente: {
        nome: createForm.getFieldValue("nomeCliente"),
        cognome: createForm.getFieldValue("cognomeCliente"),
        email: createForm.getFieldValue("emailCliente"),
        telefono: createForm.getFieldValue("telefonoCliente")
      },
      tecnico: {
        nome: createForm.getFieldValue("nomeTecnico"),
        cognome: createForm.getFieldValue("cognomeTecnico"),
        email: createForm.getFieldValue("emailTecnico"),
        telefono: createForm.getFieldValue("telefonoTecnico"),
        specializzazione: createForm.getFieldValue("specializzazioneTecnico"),
        dataAssunzione: createForm.getFieldValue("assunzioneTecnico"),
      }
    })
    createForm.resetFields()
    if (createResponse) {
      confirmInsert()
    }
    handleFilter()
    closeCreateModal()
  }

  const formFilterHandler = (): ReactElement => {
    return (
      <div className="form-container">
        <Form
          form={filterForm}
          name="filter"
          layout="vertical"
          onFinish={handleFilter}
          className="filter-form-style"
        >
          <Form.Item
            name="dataAssunzione"
            label={<label className="filter-style"> Data assunzione</label>}
            className="form-item-style"
          >
            <DatePicker format="YYYY-DD-MM" allowClear className="form-item-style" />
          </Form.Item>
          <Form.Item
            name="emailCliente"
            label={<label className="filter-style"> Email cliente</label>}
            className="form-item-style"
          >
            <Input allowClear placeholder="Email" className="form-item-style" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className="filter-button-style">Filtra</Button>
          </Form.Item>
          <Form.Item>
            <Button className="filter-button-style delete-button" onClick={resetFilters}>Reset</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  return (
    <Layout className="layout-style">
      <Header className="header-style">
        <div> Segnalazioni </div>
      </Header>
      <Layout>
        <Content className="content-style">
          <div className="card-container">
            {
              segnalazioni && segnalazioni.map((segnalazione: Segnalazione) => (
                <Card title="Segnalazione" className="card-style" key={segnalazione.idSegnalazione}>
                  <p>Cliente: {segnalazione.cliente.nome} {segnalazione.cliente.cognome} </p>
                  <p>Email cliente: {segnalazione.cliente.email}</p>
                  <p>Telefono cliente: {segnalazione.cliente.telefono}</p>
                  <p>Email tecnico: {segnalazione.cliente.email}</p>
                  <p>Data assunzione tecnico: {segnalazione.tecnico.dataAssunzione}</p>
                  <p>Data segnalazione: {segnalazione.dataOra !== undefined ? segnalazione.dataOra.toString() : ""}</p>
                  <Button className='delete-button' onClick={openConfirmDeleteModal}>Cancella segnalazione</Button>
                  <DeleteModal 
                    idSegnalazione={segnalazione.idSegnalazione!}
                    segnalazioni={segnalazioni}
                    setSegnalazioni={setSegnalazioni}
                    closeDeleteConfirmModal={closeDeleteConfirmModal}
                    confirmDeleteModal={confirmDeleteModal}
                  />
                </Card>
              ))
            }
          </div>
        </Content>
        <Sider className="sider-style">
          <Button onClick={openCreateModal} className="button-style"> Crea nuova segnalazione</Button>
          <CreationModal
            creaSegnalazioneModal={creaSegnalazioneModal}
            closeCreateModal={closeCreateModal}
            createForm={createForm}
            creaNuovaSegnalazione={creaNuovaSegnalazione}
            />
          {formFilterHandler()}
        </Sider>
      </Layout>
    </Layout>
  )
}

export default App;
