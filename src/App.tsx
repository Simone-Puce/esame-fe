import { Button, Card, DatePicker, Form, Input, Layout, Modal, message } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { ReactElement, useEffect, useState } from "react"
import "./App.css"
import { Segnalazione } from "./models/Segnalazione"
import { creaSegnalazione, deleteSegnalazione, getFilteredSegnalazioni } from "./services/SegnalazioneService"
import Sider from "antd/es/layout/Sider"
import { Rule } from "antd/es/form"
import { format } from 'date-fns'

function App() {
  const [creaSegnalazioneModal, setCreaSegnalazioneModal] = useState<boolean>(false)
  const [confirmDeleteModal, setDeleteConfirmModal] = useState<boolean>(false)
  const [createForm] = Form.useForm()
  const [filterForm] = Form.useForm()
  const [segnalazioni, setSegnalazioni] = useState<Segnalazione[]>([])
  const generalRules: Rule[] = [{ required: true, message: "This field is required fill it!" }]
  const emailRules: Rule[] = [
    { required: true, message: "Please input a valid email!", type: "email" }
  ]

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

  const openCreateModal = () => {
    setCreaSegnalazioneModal(true);
  }

  const closeCreateModal = () => {
    setCreaSegnalazioneModal(false);
  }

  const openConfirmDeleteModal = () => {
    setDeleteConfirmModal(true);
  }

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmModal(false);
  }

  const handleFilter = async () => {
    const emailCliente: string = filterForm.getFieldValue("emailCliente")
    const creazioneString = filterForm.getFieldValue("dataAssunzione")
    const formattedDate: string | null = creazioneString ? format(new Date(creazioneString), 'yyyy-MM-dd') : null;
    const filterResponse = await getFilteredSegnalazioni(emailCliente, formattedDate)
    setSegnalazioni(filterResponse.data)
  }

  const confirmInsert = () => {
    message.info('Inserito correttamente');
  }

  const creaNuovaSegnalazione = async () => {
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
    console.log(createResponse)
  }

  const deleteModal = (idSegnalazione: number) => {
    return (
      <Modal title="Conferma eliminazione" open={confirmDeleteModal} onCancel={closeDeleteConfirmModal} footer="">
        <div className="modal-div-body">
          <Button className="button-style" onClick={()=> deleteSegnalazioneHandler(idSegnalazione)}> Conferma eliminazione</Button>
          <Button className="button-style" onClick={()=> closeDeleteConfirmModal()}> Annulla eliminazione</Button>
        </div>
      </Modal>
    )
  }

  const creationModal = (): ReactElement => {
    return (
      <Modal title="Crea segnalazione" open={creaSegnalazioneModal} onCancel={closeCreateModal} footer="">
        <Form
          form={createForm}
          name="nuovaSegnalazione"
          layout="vertical"
          onFinish={creaNuovaSegnalazione}
        >
          <Form.Item>
            <h3>DATI CLIENTE</h3>
          </Form.Item>
          <Form.Item
            name="nomeCliente"
            label="Inserisci nome cliente"
            rules={generalRules}

          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="cognomeCliente"
            label="Inserisci cognome cliente"
            rules={generalRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="emailCliente"
            label="Inserisci email cliente"
            rules={emailRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="telefonoCliente"
            label="Inserisci telefono cliente"
            rules={generalRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item>
            <h3>DATI TECNICO</h3>
          </Form.Item>
          <Form.Item
            name="nomeTecnico"
            label="Inserisci nome tecnico"
            rules={generalRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="cognomeTecnico"
            label="Inserisci cognome tecnico"
            rules={generalRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="emailTecnico"
            label="Inserisci email tecnico"
            rules={emailRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="telefonoTecnico"
            label="Inserisci telefono tecnico"
            rules={generalRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="specializzazioneTecnico"
            label="Inserisci specializzazione tecnico"
            rules={generalRules}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            name="assunzioneTecnico"
            label="Data assunzione"
            rules={generalRules}
            className="form-item-style"
          >
            <DatePicker allowClear className="form-item-style" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="create-segnalazione-button">
              Crea segnalazione
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
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
        </Form>
      </div>
    )
  }

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
                  <p>Nome cliente: {segnalazione.cliente.nome}</p>
                  <p>Cognome cliente: {segnalazione.cliente.cognome}</p>
                  <p>Email cliente: {segnalazione.cliente.email}</p>
                  <p>Telefono cliente: {segnalazione.cliente.telefono}</p>
                  <p>Nome tecnico: {segnalazione.tecnico.nome}</p>
                  <p>Cognome tecnico: {segnalazione.tecnico.cognome}</p>
                  <p>Email tecnico: {segnalazione.cliente.email}</p>
                  <p>Telefono tecnico: {segnalazione.cliente.telefono}</p>
                  <p>Specializzazione tecnico: {segnalazione.tecnico.specializzazione}</p>
                  <p>Data assunzione tecnico: {segnalazione.tecnico.dataAssunzione}</p>
                  <p>Data segnalazione: {segnalazione.dataOra !== undefined ? segnalazione.dataOra.toString() : ""}</p>
                  {/* <Button onClick={() => deleteSegnalazioneHandler(segnalazione.idSegnalazione!)}>Cancella segnalazione</Button>*/}
                  <Button onClick={openConfirmDeleteModal}>Cancella segnalazione</Button>
                  {deleteModal(segnalazione.idSegnalazione!)}
                </Card>
              ))
            }
          </div>
        </Content>
        <Sider className="sider-style">
          <Button onClick={openCreateModal} className="button-style"> Crea nuova segnalazione</Button>
          {creationModal()}
          {formFilterHandler()}
        </Sider>
      </Layout>
    </Layout>
  )
}

export default App;
