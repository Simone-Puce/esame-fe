import { Button, DatePicker, Form, Input } from "antd";
import { ReactElement } from "react";

const Filter = (): ReactElement => {

    const [filterForm] = Form.useForm()


    const handleFilter = () => {

    }
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
                    <DatePicker format="YYYY-DD-MM" allowClear className="form-item-style" />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="filter-button-style">Filtra</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Filter