import React from 'react';
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";


interface Props {
    filterResultsHandler : Function
}

const FlatsFilter: React.FC<Props> = (props: Props) => {

    return (
        <Form layout='vertical'>
            <Form.Item label="Search by username">
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item label="Price range (per night)">
            <Input.Group compact>
                <InputNumber min={1} style={{ width: '45%', textAlign: 'center' }} placeholder="Minimum" />
                <Input
                    className="site-input-split"
                    style={{
                    width: '10%',
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                />
                <InputNumber min={1}
                    className="site-input-right"
                    style={{
                    width: '45%',
                    textAlign: 'center',
                    }}
                    placeholder="Maximum"
                />
                </Input.Group>
            </Form.Item>

            <Form.Item label="Number of beds">
                <Checkbox>1</Checkbox>
                <Checkbox>2</Checkbox>
                <Checkbox>3</Checkbox>
                <Checkbox>4+</Checkbox>
            </Form.Item>

            <Form.Item label="Location">
                <Input placeholder="City" />
                <Input placeholder="Street" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={(e : any) => props.filterResultsHandler()}>
                    Filter results
                </Button>
            </Form.Item>
        </Form>
    );
}

export default FlatsFilter;