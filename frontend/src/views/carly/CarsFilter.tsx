import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";


interface Props {
    filterResultsHandler : Function
}

const CarsFilter: React.FC<Props> = (props: Props) => {

    return (
        <Form layout='vertical'>
            <Form.Item label="Search by username">
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={(e : any) => props.filterResultsHandler()}>
                    Filter results
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CarsFilter;