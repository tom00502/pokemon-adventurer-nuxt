import moment from 'moment'
import { groupBy } from 'lodash'
import _shinyIncomesData from '@/assets/json/shinyIncomes.json'
import _limitedTimeSalesData from '@/assets/json/limitedTimeSales.json'
import _pikachuLandsData from '@/assets/json/pikachuLands.json'
import _rechargeCompetitionsData from '@/assets/json/rechargeCompetitions.json'
const typeConvert = {
    s: '閃光來襲',
    g: '假日狂歡',
    S: '夏日特賣',
    f: '福利兌換',
}
const limitedTimeSalesTypeConvert = {
    s: '限時特賣',
    g: '限購禮包',
}
const pikachuLandsTypeConvert = {
    p: '皮卡丘樂園',
    k: '口袋幸運池',
    s: '連續登入',
    e: '天天儲值',
    d: '日連續儲值',
}
const rechargeCompetitionsTypeConvert = {
    c: '充值比拚',
    n: '扭蛋排名',
}
export default function () {
    const shinyIncomes = (pokeId, type) => {
        let shinyId = Number(pokeId)
        shinyId = shinyId < 9999 ? shinyId + 10000 : shinyId
        return shinyIncomesData.value.filter(
            (income) => income.item === shinyId && income.type === type
        )
    }
    const shinyIncomesData = computed(() => {
        return _shinyIncomesData.map((data) => ({
            item: data.i,
            cost: data.c,
            start: data.s,
            end: data.e,
            type: typeConvert[data.t],
            during: `${moment(data.s).format('YYYY-MM-DD')} ~ ${moment(data.e).format(
                'YYYY-MM-DD'
            )}`,
        }))
    })
    const limitedTimeSales = (pokeId, type) => {
        let shinyId = Number(pokeId)
        shinyId = shinyId < 9999 ? shinyId + 10000 : shinyId
        return limitedTimeSalesData.value.filter(
            (income) => income.item === shinyId && income.type === type
        )
    }
    const limitedTimeSalesData = computed(() => {
        return _limitedTimeSalesData.map((data) => ({
            item: data.i,
            cost: data.c,
            start: data.s,
            type: limitedTimeSalesTypeConvert[data.t],
            during: `${moment(data.s).format('YYYY-MM-DD')}`,
        }))
    })
    const rechargeCompetitions = (pokeId, type) => {
        const id = Number(pokeId)
        const shinyId = id + 10000
        return rechargeCompetitionsData.value.filter(
            (income) => (income.item === id || income.item === shinyId) && income.type === type
        )
    }
    const rechargeCompetitionsData = computed(() => {
        return _rechargeCompetitionsData.map((data) => ({
            item: data.i,
            cost: data.c,
            start: data.s,
            type: rechargeCompetitionsTypeConvert[data.t],
            during: `${moment(data.s).format('YYYY-MM-DD')} ~ ${moment(data.e).format(
                'YYYY-MM-DD'
            )}`,
        }))
    })
    const pikachuLands = (pokeId, type) => {
        const id = Number(pokeId)
        const shinyId = id + 10000
        return pikachuLandsData.value.filter(
            (income) => (income.item === id || income.item === shinyId) && income.type === type
        )
    }
    const pikachuLandsData = computed(() => {
        return _pikachuLandsData.map((data) => ({
            item: data.i,
            start: data.s,
            end: data.e,
            type: pikachuLandsTypeConvert[data.t],
            during: `${moment(data.s).format('YYYY-MM-DD')} ~ ${moment(data.e).format(
                'YYYY-MM-DD'
            )}`,
        }))
    })
    const costGroup = (pokeId, type) => {
        let incomes = []
        if (Object.values(typeConvert).includes(type)) incomes = shinyIncomes(pokeId, type)
        if (Object.values(limitedTimeSalesTypeConvert).includes(type))
            incomes = limitedTimeSales(pokeId, type)
        if (Object.values(rechargeCompetitionsTypeConvert).includes(type))
            incomes = rechargeCompetitions(pokeId, type)
        if (Object.values(pikachuLandsTypeConvert).includes(type)) {
            return pikachuLands(pokeId, type)
        }
        if (!incomes.length) return null
        const incomeGroups = groupBy(incomes, 'cost')
        return incomeGroups
    }
    return {
        shinyIncomes,
        costGroup,
    }
}