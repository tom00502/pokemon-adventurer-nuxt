import _heldItems from '@/assets/json/heldItems.json'
import _heldItemStateIncreases from '@/assets/json/heldItemStateIncreases.json'
export default function () {
    const quality = {
        e: 'epic',
        l: 'legend',
        b: 'beyond',
    }
    const heldItems = computed(() => {
        return _heldItems.map((item) => ({
            id: item.i,
            quality: quality[item.q],
            upgradeCost: item.u,
            name: item.n,
            effect: item.e,
            effectValue: item.l,
            stateIncrease: item.s,
            direction: item.c,
            effectStrings: [
                getEffectString(item.i, item.e, item.l[0]),
                getEffectString(item.i, item.e, item.l[1]),
                getEffectString(item.i, item.e, item.l[2]),
                getEffectString(item.i, item.e, item.l[3]),
            ],
        }))
    })
    const stateIncreases = computed(() => {
        return Object.fromEntries(
            _heldItemStateIncreases.map((data) => {
                const { l, ...other } = data
                return [
                    l,
                    {
                        1: other.v1,
                        2: other.v2,
                        2.5: other.v25,
                        3: other.v3,
                        4: other.v4,
                        5: other.v5,
                    },
                ]
            })
        )
    })
    const getEffectString = (id, effect, effectValue) => {
        if (!effect) return ''
        if (!effectValue) effectValue = '???'
        if (id === 42) {
            const s1 = effect
                .replace('%s', `<span class="text-green-500">+${effectValue}</span>`)
                .replace('\n', '<br />')
            return s1.replace('%s', `<span class="text-red-700">${effectValue}</span>`)
        }
        if (effectValue.includes('-') || effectValue === '???')
            return effect.replace('%s', `<span class="text-red-700">${effectValue}</span>`)
        return effect.replace('%s', `<span class="text-green-500">+${effectValue}</span>`)
    }
    const getHeldItem = (id) => {
        return heldItems.value.find((item) => item.id === parseInt(id)) || {}
    }
    return {
        heldItems,
        stateIncreases,
        getHeldItem,
    }
}
