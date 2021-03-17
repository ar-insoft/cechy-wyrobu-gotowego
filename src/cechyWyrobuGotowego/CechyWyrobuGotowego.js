import React, { useState, useEffect, useRef } from 'react';
import { Layout, PageHeader, Form, Input, Button, Checkbox, Select, TreeSelect, Cascader } from 'antd';
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
            {/* <Layout.Header>Header</Layout.Header> */}
            <Layout.Content className="ant-layout">
                <PageHeader
                    className="site-page-header"
                    //onBack={() => null}
                    title="Cechy wyrobu gotowego"
                    subTitle={"dotyczy produktu " + idWyrobu}
                />
                <EdytujCechyWyrobu />
            </Layout.Content>
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
        wrapperCol: { span: 16 },
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <TekstInput 
                label={cecha.etykietaPl}
                name={cecha.nazwa}
            />
            <Form.Item label="Select">
                <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="TreeSelect">
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
            </Form.Item>
            <Form.Item label="Cascader">
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
            </Form.Item>        </Form>
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