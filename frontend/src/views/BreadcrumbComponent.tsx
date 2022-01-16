import React from 'react';
import "antd/dist/antd.css";
import { Breadcrumb} from "antd";

interface Props {
    item : string
}

const BreadcrumbComponent: React.FC<Props> = (props: Props) => {

    return (
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Bookings</Breadcrumb.Item>
                <Breadcrumb.Item>{props.item}</Breadcrumb.Item>
            </Breadcrumb>
    );
}

export default BreadcrumbComponent;