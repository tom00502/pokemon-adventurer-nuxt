const https = require('https')
const fs = require('fs')
const rechargeCompetitions = {
    url: 'https://script.google.com/macros/s/AKfycbylzeu8TDiESL8fyjS4OrD6HWwhZC01ZYhbxOyU_vvYHdFuD2rUIZECgxI2dp9kxlYF3A/exec',
    location: './assets/json/rechargeCompetitions.json',
}
const limitedTimeSales = {
    url: 'https://script.google.com/macros/s/AKfycbxiXeg_AmdRFG_9wTx4WcjUKg_97a_HM_og9atM9LDNnC0nfmxRwVR0iLQZ2zZelT8IwA/exec',
    location: './assets/json/limitedTimeSales.json',
}
const shinyIncomes = {
    url: 'https://script.google.com/macros/s/AKfycbyIu0no6pnP1iuEIZP8LDC0D7XAEmhSGrwXlMNMKFFSuM3rJYKN5Jyzdj2Y6UhiVLypmA/exec',
    location: './assets/json/shinyIncomes.json',
}
const pikachuLands = {
    url: 'https://script.google.com/macros/s/AKfycbzPwXzizZ59qPeI-qCyeFDANbz5AIg-NFKSZdxpk5Ge4vppTzu5Tjzxf00u3QqSGZM64g/exec',
    location: './assets/json/pikachuLands.json',
}
const features = {
    url: 'https://script.google.com/macros/s/AKfycbxbs2NRcDWNXU9iEDocRBDqDuXSUYK6bW6fZ7OPsQNdQTm0mUWxRhkd5X0DemkVJbyP/exec',
    location: './assets/json/features.json',
}
function makeRequest({ url, location }) {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                const { statusCode } = res

                let error
                if (statusCode !== 200) {
                    error = new Error(`Request Failed. Status Code: ${statusCode}`)
                }
                if (error) {
                    console.error(error.message)
                    // 如果是 Moved Temporarily，跟隨重定向
                    if (res.headers.location) {
                        console.log(`Following redirect to ${res.headers.location}`)
                        makeRequest({ url: res.headers.location, location })
                            .then(resolve)
                            .catch(reject)
                    } else {
                        // 否則請求失敗
                        res.resume()
                    }
                    return
                }

                let data = ''
                res.on('data', (chunk) => {
                    data += chunk
                })
                res.on('end', () => {
                    fs.writeFile(location, data, 'utf8', (err) => {
                        if (err) {
                            console.log('An error occurred while writing JSON Object to File.')
                            console.log(err)
                        } else {
                            console.log('JSON file has been saved.')
                            resolve()
                        }
                    })
                })
            })
            .on('error', (e) => {
                console.error(`Got error: ${e.message}`)
                reject(e)
            })
    })
}

async function handleMultipleApis() {
    try {
        await makeRequest(rechargeCompetitions)
        await makeRequest(limitedTimeSales)
        await makeRequest(shinyIncomes)
        await makeRequest(pikachuLands)
        // await makeRequest(features)
    } catch (err) {
        console.error(err)
    }
}

handleMultipleApis()
