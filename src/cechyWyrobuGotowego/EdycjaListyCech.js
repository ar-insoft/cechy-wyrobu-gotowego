import { Form, Input, Button, InputNumber, Select, Radio } from 'antd';

export const EdycjaListyCech = ({ params, callbacks }) => {

    const {definicjeCech} = params

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
        console.log('EdycjaListyCech Success:', values);
        callbacks.zapiszNaSerwerzeCechyWyrobu(values)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const switchInputType = cecha => {
        if (cecha.typDanych === 'LICZBA'){
            let definicja = {}
            if (cecha.definicja) definicja = JSON.parse(cecha.definicja)
            console.log('switchInputType LICZBA.definicja', typeof (cecha.definicja), cecha.definicja, definicja)
            return (
                <LiczbaInput key={cecha.nazwa} {...definicja}
                    label={cecha.etykietaPl}
                    name={cecha.nazwa}
            />
            )
        }
        if (cecha.typDanych === 'LISTA') {
            const opcje = 
                [
                    { "value": "value1", "label": "label1" },
                    { "value": "value2", "label": "label2" },
                    { "value": "value3", "label": "label3" }
                ]
            let definicja = {}
            if (cecha.definicja) {definicja = JSON.parse(cecha.definicja)}
            return (
                <ListaWyboru key={cecha.nazwa} {...definicja}
                    label={cecha.etykietaPl}
                    name={cecha.nazwa}
                    value="value2"
                    //opcje={opcje}
                />
            )
        }
        if (cecha.typDanych === 'RADIO') {
            let definicja = {}
            if (cecha.definicja) { definicja = JSON.parse(cecha.definicja) }
            return (
                <RadioInput key={cecha.nazwa} {...definicja}
                    label={cecha.etykietaPl}
                    name={cecha.nazwa}
                    //value="value2"
                //opcje={opcje}
                />
            )
        }
        return (
            <TekstInput key={cecha.etykietaPl}
                label={cecha.etykietaPl}
                name={cecha.nazwa}
            />
        )
    }

    return (
        <div style={{ width: 100 + '%' }}>
            <Form
                {...layout}
                //name="lista_cech"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <TekstInput
                    label={listaCechMock[0].etykietaPl}
                    name={listaCechMock[0].nazwa}
                />
                <ListaWyboru 
                    label="Lista wyboru"
                    name="nazwa_lista"
                    value="value2"
                    opcje={[
                        { value: "value1", label: "label1" },
                        { value: "value2", label: "label2" },
                        { value: "value3", label: "label3" },
                    ]}
                />
                <RadioInput
                    label="Lista radio"
                    name="nazwa_radio"
                    value="nie wiem"
                    opcje={[
                        { value: "tak", label: "tak" },
                        { value: "nie", label: "nie" },
                        { value: "nie wiem", label: "nie wiem" },
                    ]}
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
                <hr/>
                {definicjeCech.map(switchInputType) }
                <hr />
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Zapisz                    
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const listaCechMock = [
    {
        "typDanych": "TEKST",
        "etykietaEn": "Nr rysunku",
        "nazwa": "nr_rysunku",
        "etykietaPl": "Nr rysunku"
    },
]

const TekstInput = (props) => {
    return (
        <Form.Item
            {...props} key={props.name}
        >
            <Input allowClear />
        </Form.Item>
    )
}

const LiczbaInput = (props) => {
    console.log('LiczbaInput', props)
    return (
        <Form.Item {...props} key={props.name}>
            <InputNumber {...props} />
        </Form.Item>
    )
}

const ListaWyboru = (props) => {
    let { label, name, value, opcje } = props
    if (name === undefined) console.log('Error in <ListaWyboru> component: name is undefined', props)
    if (opcje === undefined) {
        console.log('Error in <ListaWyboru> component: opcje is undefined', props)
        opcje = []
    }
    return (
        <Form.Item label={label} name={name} initialValue={value}>
            <Select allowClear>
                {
                    opcje.map(op => <Select.Option key={op.value} value={op.value}>{op.label}</Select.Option>)
                }
            </Select>
        </Form.Item>
    )
}

const RadioInput = ({ label, name, value, opcje }) => {
    return (
        <Form.Item label={label} name={name} initialValue={value}>
            <Radio.Group>
                {
                    opcje.map(op => <Radio.Button key={op.value} value={op.value}>{op.label}</Radio.Button>)
                }
            </Radio.Group>
        </Form.Item>
    )
}