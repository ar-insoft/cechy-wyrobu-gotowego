import React, { useState, useEffect, useRef } from 'react';
import { Layout, PageHeader, Card, Descriptions, Form, Input, Button, InputNumber, Select, Radio, TreeSelect, Cascader } from 'antd';
//import { MailOutlined, AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { DataProvider } from './DataProvider'
import {EdycjaListyCech} from './EdycjaListyCech'

export const CechyWyrobuGotowego = () => {
    const parsedUrl = new URL(window.location.href)
    const idWyrobu = parsedUrl.searchParams.get("id") || "test"
    const [selectedMenu, setSelectedMenu] = useState("pre_schedules_on_workplace")

    const [definicjeCech, setDefinicjeCech] = useState([])
    const [product, setProduct] = useState({})
    const [zleceniaWyrobu, setZleceniaWyrobu] = useState([])
    const [cechyWyrobu, setCechyWyrobu] = useState([])

    useEffect(() => {
        DataProvider.pobierzCechyWyrobu(
            {
                idWyrobu: idWyrobu,
            },
            fromServer => {
                console.log('pobierzCechyWyrobu fromServer', fromServer)
                setDefinicjeCech(fromServer.definicjeCech)
                setProduct(fromServer.product)
                setZleceniaWyrobu(fromServer.zleceniaWyrobu)
                setCechyWyrobu(fromServer.cechyWyrobu)
                //setIsLoading(false)
            }, error => {
                console.log('pobierzCechyWyrobu error', error)
                //wyswietlKomunikatBledu(error)
                //setIsLoading(false)
            })
    }, [])

    const callbacks = {
        zapiszNaSerwerzeCechyWyrobu: (cechyWyrobu) => {
            DataProvider.wyslijNaSerwerCechyWyrobu(
                idWyrobu, cechyWyrobu, {},
                fromServer => {
                    console.log('EdycjaListyCech fromServer', fromServer)
                    //setIsLoading(false)
                }, error => {
                    console.log('EdycjaListyCech serverError', error)
                    //wyswietlKomunikatBledu(error)
                    //setIsLoading(false)
                }
            )
        } 
    }
    const params = {
        idWyrobu,
        definicjeCech,
        product,
        zleceniaWyrobu,
        cechyWyrobu,
    }

    return (
        <div className="ant-layout main" data-wyrob-id={idWyrobu}>
            <div className="ant-page-header-heading-title">Cechy wyrobu gotowego</div>
            <div className="ant-page-header-heading-sub-title">
                dotyczy produktu: <span style={{ color: 'black' }}>{product.object_index} {product.title}</span>
            </div>
            <div className="ant-page-header-heading-sub-title">
                numer rysunku: <span style={{ color: 'black' }}>{product.object_drawing_no}</span>
            </div>
            <div className="ant-page-header-heading-sub-title">
                użytego w zleceniach: {zleceniaWyrobu.map(
                    zl => <span style={{ marginLeft: 15 +'px' }, {color: 'black'}}>
                        {zl.object_index} {zl.title}
                    </span>)}
            </div>
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
            <EdycjaListyCech params={params} callbacks={callbacks} />
            <div className="ant-page-header-heading-sub-title">
                <a href="/eoffice/production/cechy_wyrobu_gotowego/cechy_wyrobu_gotowego_wyszukiwarka_treegrid.xml?action=tree_grid_table_init" target="_blank">
                    wyszukiwarka
                </a>
            </div>
        </div>
    )
}
