import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
//import { MailOutlined, AppstoreOutlined, ApartmentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { DataProvider } from './DataProvider'
import {EdycjaListyCech} from './EdycjaListyCech'

export const CechyWyrobuGotowego = () => {
    const parsedUrl = new URL(window.location.href)
    const idWyrobu = parsedUrl.searchParams.get("id") || "test"
    const [isLoading, setIsLoading] = useState(false)

    const [definicjeCech, setDefinicjeCech] = useState([])
    const [product, setProduct] = useState({})
    const [zleceniaWyrobu, setZleceniaWyrobu] = useState([])
    const [cechyWyrobu, setCechyWyrobu] = useState([])

    const [zapisanoDane, setZapisanoDane] = useState(0)

    useEffect(() => {
        setIsLoading(true)
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
                setIsLoading(false)
            }, error => {
                console.log('pobierzCechyWyrobu error', error)
                //wyswietlKomunikatBledu(error)
                setIsLoading(false)
            })
    }, [])

    const callbacks = {
        zapiszNaSerwerzeCechyWyrobu: (cechyWyrobu) => {
            DataProvider.wyslijNaSerwerCechyWyrobu(
                idWyrobu, cechyWyrobu, {},
                fromServer => {
                    console.log('EdycjaListyCech fromServer', fromServer)
                    setIsLoading(false)
                    setZapisanoDane(zapisanoDane+1)
                }, error => {
                    console.log('EdycjaListyCech serverError', error)
                    //wyswietlKomunikatBledu(error)
                    setIsLoading(false)
                    Modal.error({
                        title: 'Wystąpił błąd',
                        content: 'nie udało się zapisać na serwerze',
                    })
                }
            )
        } 
    }
    const params = {
        isLoading,
        idWyrobu,
        definicjeCech,
        product,
        zleceniaWyrobu,
        cechyWyrobu,
        zapisanoDane,
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
            {/* <div className="ant-page-header-heading-sub-title">
                użytego w zleceniach: {zleceniaWyrobu.map(
                    zl => <span style={{ marginLeft: 15 +'px' }, {color: 'black'}}>
                        {zl.object_index} {zl.title}
                    </span>)}
            </div> */}
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
            {/* <div className="ant-page-header-heading-sub-title">
                <a href="/eoffice/production/cechy_wyrobu_gotowego/cechy_wyrobu_gotowego_wyszukiwarka_treegrid.xml?action=tree_grid_table_init" target="_blank">
                    wyszukiwarka
                </a>
            </div> */}
            <ZapisanoDane params={params} callbacks={callbacks} />
        </div>
    )
}

const ZapisanoDane = ({ params, callbacks }) => {
    const { isLoading, zapisanoDane } = params
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        zapisanoDane > 0 && setVisible(true)
    }, [zapisanoDane])
    const handleClose = () => {
        setVisible(false); window.opener = null;
        window.open("", "_self"); window.close(); }
    const handleCancel = () => setVisible(false)
    return (
        <>
            <Modal
                visible={visible}
                title="Zapisano"
                onOk={handleCancel}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Kontynuj edycję
                    </Button>,
                            <Button key="submit" type="primary" loading={isLoading} onClick={handleClose}>
                                Zamknij
                    </Button>,
                        ]}
                    >
                <p>Dane zostały zapisane na serwerze</p>
            </Modal>
        </>
    )
}