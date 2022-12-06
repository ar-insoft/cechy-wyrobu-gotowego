export const consts = {
    ENDPOINT_URL: '/rest/cechy_wyrobu_gotowego',
}

export const DataProvider = {

    pobierzCechyWyrobu: (additionalFields, promiseHandler, errorHandler) => {
        const {idWyrobu} = additionalFields
        //const doWyslania = Object.assign({}, { ...additionalFields })
        //const doWyslaniaJson = JSON.stringify(doWyslania)

        fetch(consts.ENDPOINT_URL + '?id=' + idWyrobu, { //+ '?action=zlecenie_obiekty_harmonogramowania&id=' + idWyrobu
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' //'Content-Type': 'application/json' 
            },
        })
            .then(response => {
                if (!response.ok) {
                    return Promise.reject();
                }
                return response.json()
            })
            .then(json => {
                // if (json.is_request_successful === false) {
                //     const error_message = json.error_message
                //     const errorCause = json.cause
                //     return Promise.reject({ error_message, errorCause })
                // }
                const fromServer = json

                promiseHandler(fromServer)
            })
            .catch(error => errorHandler(error))
    },

    wyslijNaSerwerCechyWyrobu: (idWyrobu, cechyWyrobu, additionalFields, promiseHandler, errorHandler) => {
        const doWyslania = Object.assign({ ...cechyWyrobu }, { ...additionalFields })
        //delete doWyslania.employee
        //delete doWyslania.kartaProgramu
        const doWyslaniaJson = JSON.stringify(doWyslania)

        fetch(consts.ENDPOINT_URL + '?id=' + idWyrobu, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' //'Content-Type': 'application/json' 
            },
            body: 'cechyWyrobuBody=' + doWyslaniaJson
        })
            .then(response => {
                if (!response.ok) {
                    return Promise.reject('HTTP ' + response.status + ' ' + response.statusText);
                }
                return response.json()
            })
            .then(json => {
                const fromServer = json
                //console.log('RaportujLaser.wyslijNaSerwer fromServer', fromServer)
                //if (fromServer.employee)

                promiseHandler(fromServer)
            })
            .catch(error => errorHandler(error))
    }

}