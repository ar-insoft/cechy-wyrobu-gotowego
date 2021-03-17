import React, { useState, useEffect, useRef } from 'react';
import { Layout, PageHeader, Card, Descriptions, Form, Input, Button, InputNumber, Select, Radio, TreeSelect, Cascader } from 'antd';
//import { MailOutlined, AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { DataProvider } from './DataProvider'

export const CechyWyrobuGotowego = () => {
    const parsedUrl = new URL(window.location.href)
    const idWyrobu = parsedUrl.searchParams.get("id") || "test"
    const [selectedMenu, setSelectedMenu] = useState("pre_schedules_on_workplace")

    const [preSchedulesOnWorkplace, setPreSchedulesOnWorkplace] = useState([])

    useEffect(() => {
        DataProvider.pobierzCechyWyrobu(
            {
                idWyrobu: idWyrobu,
            },
            fromServer => {
                console.log('pobierzCechyWyrobu fromServer', fromServer)
                setPreSchedulesOnWorkplace(fromServer.PreSchedulesOnWorkplace)
                //setIsLoading(false)
            }, error => {
                console.log('pobierzCechyWyrobu error', error)
                //wyswietlKomunikatBledu(error)
                //setIsLoading(false)
            })
    }, [])
    return (
        <div className="ant-layout main" data-wyrob-id={idWyrobu}>
            <div className="ant-page-header-heading-title">Cechy wyrobu gotowego</div>
            <div className="ant-page-header-heading-sub-title">{"dotyczy produktu " + idWyrobu}</div>
            {/* <Layout.Header>Header</Layout.Header> */}
            {/* <Layout.Content className=""> */}
                {/* <PageHeader
                    className="site-page-header"
                    //onBack={() => null}
                    title="Cechy wyrobu gotowego"
                    subTitle={"dotyczy produktu " + idWyrobu}
                /> */}
                {/* <Card title="Cechy wyrobu gotowego" bordered={false} style={{ width: 300 }}>
                    <p>{"dotyczy produktu " + idWyrobu}</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card> */}
                {/* <p>
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                    
                </Descriptions>
                </p> */}
            {/* </Layout.Content> */}
            <EdytujCechyWyrobu />
        </div>
    )
}

const EdytujCechyWyrobu = () => {
    const cecha = {
        "typDanych": "TEKST",
        "etykietaEn": "Nr rysunku",
        "nazwa": "nr_rysunku",
        "etykietaPl": "Nr rysunku"
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 8,
        },
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ width: 1000 + 'px' }}>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item> */}
            <TekstInput 
                label={cecha.etykietaPl}
                name={cecha.nazwa}
            />
                <Form.Item label="Dennica górna (typ)">
                    <Select>
                        <Select.Option value="opcja1">opcja1</Select.Option>
                        <Select.Option value="opcja2">opcja2</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Grubość dennicy górnej">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Barierka" name="barierka">
                    <Radio.Group>
                        <Radio.Button value="tak">Tak</Radio.Button>
                        <Radio.Button value="nie">Nie</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            {/* <Form.Item label="TreeSelect">
                <TreeSelect
                    treeData={[
                        {
                            title: 'Light',
                            value: 'light',
                            children: [
                                {
                                    title: 'Bamboo',
                                    value: 'bamboo',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item> */}
            {/* <Form.Item label="Cascader">
                <Cascader
                    options={[
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item> */}
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="button">
                        Zapisz
        </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const TekstInput = (props) => {
    return (
        <Form.Item
            {...props}
        >
            <Input />
        </Form.Item>
    )
}