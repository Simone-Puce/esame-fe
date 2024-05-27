
import { Layout, Card, Button } from 'antd';
import { Header, Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import './App.css';
import { Segnalazione } from './models/Segnalazione';
import { useState } from 'react';
import Filter from './components/forms/Filter';

function App() {

  const [segnalazioni, setSegnalazioni] = useState<Segnalazione[]>([])
  const [creaSegnalazioneModal, setCreaSegnalazioneModal] = useState<boolean>(false)

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
                  <p>Email cliente: {segnalazione.cliente.email}</p>
                  <p>Cognome cliente: {segnalazione.cliente.cognome}</p>
                  {/* <Button {/*onClick={() => deleteSegnalazioneHandler(segnalazione.id!)>Cancella segnalazione</Button>*/}
                  <Button>Cancella segnalazione</Button>
                </Card>
              ))
            }
          </div>
        </Content>
        <Sider className="sider-style">
          <Button className="button-style" onClick={()=>console.log("carlo")}> Crea nuova segnalazione</Button>
          <Button className="button-style" onClick={()=>console.log("carlo")}> Crea nuovo tecnico </Button>
          {/*creationModal()*/}
          <Filter/>
        </Sider>
      </Layout>
    </Layout>
  )
}

export default App;
