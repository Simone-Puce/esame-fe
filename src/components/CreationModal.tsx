import { Form, Input, DatePicker, Button, Row, Col } from "antd"
import { Rule } from "antd/es/form"
import Modal from "antd/es/modal/Modal"
import { ReactElement } from "react"
import { ICreationModal } from "../interfaces/ICreationModal"

export const CreationModal = ({ creaSegnalazioneModal, closeCreateModal, createForm, creaNuovaSegnalazione }: ICreationModal): ReactElement => {
    const generalRules: Rule[] = [{ required: true, message: "This field is required fill it!" }]
    const emailRules: Rule[] = [
        { required: true, message: "Please input a valid email!", type: "email" }
    ]
    return (
        <Modal title="Crea segnalazione" open={creaSegnalazioneModal} onCancel={closeCreateModal} footer="" className="create-form-style">
            <Form
                form={createForm}
                name="nuovaSegnalazione"
                layout="vertical"
                onFinish={creaNuovaSegnalazione}

            >

                <Form.Item>
                    <h3>DATI CLIENTE</h3>
                </Form.Item>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="nomeCliente"
                            label="Inserisci nome cliente"
                            rules={generalRules}

                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="cognomeCliente"
                            label="Inserisci cognome cliente"
                            rules={generalRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="emailCliente"
                            label="Inserisci email cliente"
                            rules={emailRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="telefonoCliente"
                            label="Inserisci telefono cliente"
                            rules={generalRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>

                </Row>
                <Form.Item>
                    <h3>DATI TECNICO</h3>
                </Form.Item>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item
                            name="nomeTecnico"
                            label="Inserisci nome tecnico"
                            rules={generalRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="cognomeTecnico"
                            label="Inserisci cognome tecnico"
                            rules={generalRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={10}>
                        <Form.Item
                            name="emailTecnico"
                            label="Inserisci email tecnico"
                            rules={emailRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={14}>
                        <Form.Item
                            name="telefonoTecnico"
                            label="Inserisci telefono tecnico"
                            rules={generalRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={14}>
                        <Form.Item
                            name="specializzazioneTecnico"
                            label="Inserisci specializzazione tecnico"
                            rules={generalRules}
                        >
                            <Input allowClear />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="assunzioneTecnico"
                            label="Data assunzione"
                            rules={generalRules}
                        >
                            <DatePicker allowClear />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button htmlType="submit" className="create-segnalazione-button">
                        Crea segnalazione
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}