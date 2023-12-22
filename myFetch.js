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
const hiringPool = {
    url: 'https://script.google.com/macros/s/AKfycbxwyomfWCd8bIKOcTiaxQEVF7ZFcRZErEUs-DNUQEdsbkTDAM2eM9ciAmQWzvgiAKvw/exec',
    location: './assets/json/hiringPool.json',
}
const hiringRank = {
    url: 'https://script.google.com/macros/s/AKfycbyyh3VdE_LVuqHg76IHBuVXpjPm5gRFu4E_qE15Sey6LqUt7thX-WenGD6V6xHa8GM8/exec',
    location: './assets/json/hiringRank.json',
}
const astrology = {
    url: 'https://script.google.com/macros/s/AKfycbzTeunebgehelSmqPf3aF_pyK4NBddh8UpvUcI3ZJikT9fK5XWpqBCmCQ0ipirCEY_q/exec',
    location: './assets/json/astrology.json',
}
const monthlyGift = {
    url: 'https://script.google.com/macros/s/AKfycbyGVtJxdNqM0mBoIBBoyCt8vyvng6hJU-_Ut5MzmHaIqobNf4Fcqy555RombOBwebVx/exec',
    location: './assets/json/monthlyGift.json',
}
const limitedTimeOffer = {
    url: 'https://script.google.com/macros/s/AKfycbx1FVF0nyTyT_63En0M1CMfMqDw-h5JypCGuNSgPpIx3BMSzlR4IRjpotfwqLRXJzpc/exec',
    location: './assets/json/limitedTimeOffer.json',
}
const magicalFlip = {
    url: 'https://script.google.com/macros/s/AKfycbw_KYXRfpMhFynkAPxrtvjE145Qr5w_Da0WqUELdzOOdMx0H35-x-RdlBqVmsqTdZRh/exec',
    location: './assets/json/magicalFlip.json',
}
const features = {
    url: 'https://script.google.com/macros/s/AKfycbxbs2NRcDWNXU9iEDocRBDqDuXSUYK6bW6fZ7OPsQNdQTm0mUWxRhkd5X0DemkVJbyP/exec',
    location: './assets/json/features.json',
}
const gradeCardUses = {
    url: 'https://script.google.com/macros/s/AKfycbxxLRozScSHr-gYz0CUPLWfbFEq_UvUcYFss8RxjEZgoGkY4MX49xtRl1mDVa_jxMQh/exec',
    location: './assets/json/gradeCardUses.json',
    name: 'gradeCardUses',
}
function makeRequest({ url, location, name = '' }) {
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
                        makeRequest({ url: res.headers.location, location, name })
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
                    console.log('end', name)
                    if (name === 'gradeCardUses') {
                        gradeCardUsesProcess(data)
                        resolve()
                        return
                    }
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
const gradeCardUsesProcess = (data) => {
    const _gradeCardUses = JSON.parse(data)
    const cardPattens = []
    _gradeCardUses.forEach((use) => {
        use.g.forEach((level) => {
            const patten = level.c.join(',')
            let index = cardPattens.indexOf(patten)
            if (index === -1) {
                cardPattens.push(patten)
                index = cardPattens.length - 1
            }
            level.c = index
        })
    })
    // console.log(JSON.stringify(cardPattens), cardPattens.length)
    const gradeCardUses = JSON.stringify(_gradeCardUses)
    // console.log(gradeCardUses)
    fs.writeFile('./assets/json/cardPattens.json', JSON.stringify(cardPattens), 'utf8', (err) => {
        if (err) {
            console.log('An error occurred while writing JSON Object to File.')
            console.log(err)
        } else {
            console.log('JSON file has been saved.')
            // resolve()
        }
    })
    fs.writeFile('./assets/json/gradeCardUsesSimplify.json', gradeCardUses, 'utf8', (err) => {
        if (err) {
            console.log('An error occurred while writing JSON Object to File.')
            console.log(err)
        } else {
            console.log('JSON file has been saved.')
            // resolve()
        }
    })
}
async function handleMultipleApis() {
    try {
        await makeRequest(rechargeCompetitions)
        await makeRequest(limitedTimeSales)
        await makeRequest(shinyIncomes)
        await makeRequest(pikachuLands)
        // await makeRequest(hiringPool)
        // await makeRequest(hiringRank)
        // await makeRequest(astrology)
        // await makeRequest(monthlyGift)
        // await makeRequest(limitedTimeOffer)
        await makeRequest(magicalFlip)
        // await makeRequest(features)
        // await makeRequest(gradeCardUses)
    } catch (err) {
        console.error(err)
    }
}

handleMultipleApis()
