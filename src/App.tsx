import { Button, Card, DatePicker, Form, Input, Layout, Modal, message } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { ReactElement, useState } from "react"
import "./App.css"
import { Segnalazione } from "./models/Segnalazione"
import { creaSegnalazione, deleteSegnalazione, getFilteredSegnalazioni } from "./services/SegnalazioneService"
import Sider from "antd/es/layout/Sider"
import { Rule } from "antd/es/form"
import { format } from 'date-fns'

function App() {
  const [creaSegnalazioneModal, setCreaSegnalazioneModal] = useState<boolean>(false)
  const [createForm] = Form.useForm()
  const [filterForm] = Form.useForm()
  const [segnalazioni, setSegnalazioni] = useState<Segnalazione[]>([])
  const generalRules: Rule[] = [{ required: true, message:"This field is required fill it!" }]

  const showModal = () => {
    setCreaSegnalazioneModal(true);
  }

  const handleCancel = () => {
    setCreaSegnalazioneModal(false);
  }

  const handleFilter = async () => {
    const cognome = filterForm.getFieldValue("cognomeCliente")
    const creazioneString = filterForm.getFieldValue("dataCreazione")
    const formattedDate: string | null = creazioneString ? format(new Date(creazioneString), 'yyyy-MM-dd') : null;
    const filterResponse = await getFilteredSegnalazioni(cognome, formattedDate)
    setSegnalazioni(filterResponse.data)
  }

  const confirmInsert = () => {
    message.info('Inserito correttamente');
  }

  const creaNuovaSegnalazione = async () => {
    const createResponse = await creaSegnalazione({
      descrizione: createForm.getFieldValue("descrizione"),
      cliente: {
        nome: createForm.getFieldValue("nomeCliente"),
        cognome: createForm.getFieldValue("cognomeCliente"),
        email: createForm.getFieldValue("emailCliente")
      },
      tecnico: {
        nome: createForm.getFieldValue("nomeTecnico"),
        cognome: createForm.getFieldValue("cognomeTecnico")
      }
    })
    createForm.resetFields()
    if (createResponse) {
      confirmInsert()
    }
    handleFilter()
  }

  const creationModal = (): ReactElement => {
    return (
      <Modal title="Crea segnalazioni" open={creaSegnalazioneModal} onCancel={handleCancel} footer="">
        <Form
          form={createForm}
          name="nuovaSegnalazione"
          layout="vertical"
          onFinish={creaNuovaSegnalazione}
        >
          <Form.Item
            name="descrizione"
            label="Inserisci descrizione"
            rules={generalRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nomeCliente"
            label="Inserisci nome cliente"
            rules={generalRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cognomeCliente"
            label="Inserisci cognome cliente"
            rules={generalRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="emailCliente"
            label="Inserisci email cliente"
            rules={generalRules}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="nomeTecnico"
            label="Inserisci nome tecnico"
            rules={generalRules}
            >
            <Input />
          </Form.Item>
          <Form.Item
            name="cognomeTecnico"
            label="Inserisci cognome tecnico"
            rules={generalRules}
          >
            <Input />
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
            name="cognomeCliente"
            label={<label className="filter-style"> Cognome cliente</label>}
            className="form-item-style"
          >
            <Input allowClear placeholder="Cognome" className="form-item-style" />
          </Form.Item>
          <Form.Item
            name="dataCreazione"
            label={<label className="filter-style"> Data creazione</label>}
            className="form-item-style"
          >
            <DatePicker format="YYYY-DD-MM" allowClear className="form-item-style"/>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="filter-button-style">Filtra</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

  const deleteSegnalazioneHandler = async (id: number) => {
    await deleteSegnalazione(id)
    const newSegnalazioni = segnalazioni.filter((s: Segnalazione) => 
      s.id !== id
    )
    setSegnalazioni(newSegnalazioni)
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
                <Card title="Segnalazione" className="card-style" key={segnalazione.id}>
                  <p>Descrizione: {segnalazione.descrizione}</p>
                  <p>Email cliente: {segnalazione.cliente.email}</p>
                  <p>Cognome cliente: {segnalazione.cliente.cognome}</p>
                  <p>Data della segnalazione: {segnalazione.creation !== undefined ? segnalazione.creation.toString() : ""}</p>
                  <Button onClick={() => deleteSegnalazioneHandler(segnalazione.id!)}>Cancella segnalazione</Button>
                </Card>
              ))
            }
          </div>
        </Content>
        <Sider className="sider-style">
          <Button onClick={showModal} className="button-style"> Crea nuova segnalazione</Button>
          {creationModal()}
          {formFilterHandler()}
        </Sider>
      </Layout>
    </Layout>
  )
}

export default App;
