<script setup>
import { usePokedexStore } from '@/stores/pokedex'
import pokedexRef from '@/assets/json/pokedexRef.json'
const props = defineProps({
    pokeData: {
        type: Object,
        required: true,
    },
})
const pokedexStore = usePokedexStore()
const { typeTwToEn, typeEnToTw, qualityEnToTw, getTypeColors } = usePokeTypes()
const { natures } = usePokeNatures()
const { heldItems } = useHeldItem()
const canvasWidth = 600
const canvasHeight = 900
const TITLE_FONT_SIZE = 24
const FONT_SIZE = 16
const MOVE_MARGIN = 8
const MOVE_NAME_SIZE = 16
const MOVE_DETAIL_SIZE = 12
const MAX_BASIC_POINT = 252
const BORDER_WIDTH = 11
const basicPoints = [
    { key: 'hp', name: '生命' },
    { key: 'attack', name: '攻擊' },
    { key: 'defense', name: '防禦' },
    { key: 'sAttack', name: '特攻' },
    { key: 'sDefense', name: '特防' },
    { key: 'speed', name: '速度' },
]

const pokemon = computed(() => {
    return pokedexStore.pokedex[props.pokeData?.pokeId] || { stat: {} }
})
const chooseMoves = computed(() => {
    if (!props.pokeData?.moves) return []
    const moves = props.pokeData.moves.split(',')
    return moves.map((move) => {
        return pokedexStore.movedex[move]
    })
})
const chooseAbility = computed(() => {
    if (!props.pokeData?.abilityId) return {}
    return pokedexStore.abilitydex[props.pokeData.abilityId]
})
const chooseNature = computed(() => {
    if (!props.pokeData?.natureId) return {}
    return natures.find((nature) => nature.id === props.pokeData.natureId) || {}
})
const chooseItem = computed(() => {
    if (!props.pokeData?.itemId) return {}
    return heldItems.value.find((item) => item.id === props.pokeData.itemId) || {}
})
const chooseType = computed(() => {
    if (!props.pokeData?.type) return 'normal'
    return props.pokeData.type
})
const basicPoint = computed(() => ({
    hp: props.pokeData.hp,
    attack: props.pokeData.attack,
    defense: props.pokeData.defense,
    sAttack: props.pokeData.sAttack,
    sDefense: props.pokeData.sDefense,
    speed: props.pokeData.speed,
}))
const description = computed(() => {
    if (!props.pokeData?.description) return ''
    return props.pokeData.description
})
const creator = computed(() => {
    if (!props.pokeData?.creator) return '寵物冒險助手'
    return props.pokeData.creator
})
const pokeRef = computed(() => {
    if (!pokemon.value.zukanId) return {}
    return (
        pokedexRef.find(
            (poke) =>
                poke.zukan_id === pokemon.value.zukanId &&
                poke.zukan_sub_id === pokemon.value.zukanSubId
        ) || {}
    )
})

const pokeImg = computed(() => {
    if (pokemon.value.img) return pokemon.value.img
    return `https://tw.portal-pokemon.com/play/resources/pokedex${pokeRef.value.file_name}`
})

const assetsImgs = import.meta.glob('/assets/img/*.svg')
const starP = ref('')
const starY = ref('')
assetsImgs['/assets/img/star.svg']().then((res) => {
    starP.value = res.default
})
assetsImgs['/assets/img/starY.svg']().then((res) => {
    starY.value = res.default
})
// const starY = import.meta.glob('/assets/img/starY.svg')
const starImageUri = computed(() => {
    if (props.pokeData?.reincarnated) return starP.value
    return starY.value
})
const cardId = computed(() => {
    if (!props.pokeData?.id) return ''
    return props.pokeData.id
})
const drawPokeCard = () => {
    const canvas = window.document.getElementById('card')
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.textBaseline = 'top'
    let currentY = 0
    const radius = 20
    const width = canvas.width - BORDER_WIDTH + 1
    const height = canvas.height - BORDER_WIDTH + 1
    // const path = new Path2D()
    const x = (BORDER_WIDTH - 1) / 2
    const y = (BORDER_WIDTH - 1) / 2
    const type = chooseType.value
    // if (pokemon.value?.attribute) type = typeTwToEn[pokemon.value?.attribute[0]] || 'normal'
    // 背景漸層
    drowBackground({ ctx, x, y, width, height, radius, type })
    // 外框
    drawRoundedGradientRect({ ctx, x: 0, y: 0, width, height, radius })
    currentY += 25
    // 精靈title
    drowPokeTitle({ ctx, text: props.pokeData?.title, baseY: currentY })
    // 精靈品質
    drowPokeQuality({ ctx, text: qualityEnToTw[pokemon.value.quality], baseY: currentY })
    currentY += 55
    // 精靈圖片
    drowPokeImage({ ctx, type, baseY: currentY })
    // // 轉生星星
    // drwoStar({ ctx, baseX: 40, baseY: currentY + 280 })
    currentY += 330
    // 精靈名稱
    drowPokeName({ ctx, text: pokemon.value?.name, baseY: currentY })
    currentY += 50
    // 精靈屬性
    drowPokeTypes({ ctx, baseX: 20, baseY: currentY })
    currentY += 50
    // 精靈招式
    drowPokeMoves({ ctx, baseX: 20, baseY: currentY })
    currentY += 50
    // 精靈特性
    drowPokeAbility({ ctx, baseX: 20, baseY: currentY })
    // 努力值
    drowBasicPoints({ ctx, baseX: 20 + canvasWidth / 2, baseY: currentY })
    currentY += 50
    // 精靈性格
    drowPokeNature({ ctx, baseX: 20, baseY: currentY })
    currentY += 50
    // 攜帶物
    drowPokeHeldItem({ ctx, baseX: 20, baseY: currentY })
    currentY += 55
    // 畫描述框
    drowDescribeBorder({ ctx, baseX: 20, baseY: currentY })
    // 描述
    drowDescribe({ ctx, baseX: 28, baseY: currentY })
    // 作者
    drowCreator(ctx, canvasWidth, canvasHeight)
}

const drowBackground = ({ ctx, x, y, width, height, radius, type }) => {
    ctx.save()
    const path = new Path2D()
    path.moveTo(x + radius, y)
    path.lineTo(x + width - radius, y)
    path.quadraticCurveTo(x + width, y, x + width, y + radius)
    path.lineTo(x + width, y + height - radius)
    path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    path.lineTo(x + radius, y + height)
    path.quadraticCurveTo(x, y + height, x, y + height - radius)
    path.lineTo(x, y + radius)
    path.quadraticCurveTo(x, y, x + radius, y)
    path.closePath()
    ctx.clip(path)
    const typeColor = getTypeColors(type)
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight)
    gradient.addColorStop(1, 'white')
    gradient.addColorStop(0.5, typeColor.alphaColor)
    gradient.addColorStop(0, typeColor.color)
    ctx.fillStyle = gradient
    ctx.fillRect(2, 2, canvasWidth - 4, canvasHeight - 4)
    ctx.restore()
}
function drawRoundedGradientRect({ ctx, x, y, width, height, radius }) {
    ctx.save()
    const path = new Path2D()
    path.moveTo(x + radius, y)
    path.lineTo(x + width - radius, y)
    path.quadraticCurveTo(x + width, y, x + width, y + radius)
    path.lineTo(x + width, y + height - radius)
    path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    path.lineTo(x + radius, y + height)
    path.quadraticCurveTo(x, y + height, x, y + height - radius)
    path.lineTo(x, y + radius)
    path.quadraticCurveTo(x, y, x + radius, y)
    path.closePath()

    // 設定漸層
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
    gradient.addColorStop(0, 'gray')
    gradient.addColorStop(0.5, 'white')
    gradient.addColorStop(1, 'gray')
    ctx.translate((BORDER_WIDTH - 1) / 2, (BORDER_WIDTH - 1) / 2)
    ctx.lineWidth = BORDER_WIDTH
    ctx.strokeStyle = gradient
    ctx.stroke(path)
    ctx.fill()
    ctx.restore()
}
const drowPokeTitle = ({ ctx, text, baseY }) => {
    // 精靈名稱
    ctx.save()
    const font = '24px Arial'
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.translate(20, baseY)
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const drowPokeQuality = ({ ctx, text = '', baseY }) => {
    ctx.save()
    ctx.font = '24px Arial'
    ctx.fillStyle = 'black'
    const textWidth = ctx.measureText(text).width
    ctx.translate(canvasWidth - textWidth - 20, baseY)
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const drowPokeImage = ({ ctx, type, baseY }) => {
    // 半透明圓
    // Set the global alpha to 0.5 (50% transparency)
    ctx.save()
    const r = canvasWidth / 4
    ctx.translate(canvasWidth / 2, baseY + r)

    const typeColor = getTypeColors(type)
    ctx.globalAlpha = 0.5
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
    // 圓邊框
    ctx.save()
    ctx.translate(canvasWidth / 2, baseY + r)
    ctx.strokeStyle = 'white'
    // ctx.strokeStyle = typeColor.color
    ctx.beginPath()
    ctx.arc(0, 0, r, 0, 2 * Math.PI)
    ctx.stroke()
    // 避免背景變黑
    ctx.beginPath()
    ctx.fill()
    ctx.restore()
    // 轉生星星
    drwoStar({ ctx, baseX: 40, baseY: baseY + 280 })
    // 畫圖
    if (pokeImg.value) {
        const img = new Image()
        // img.src = `https://tw.portal-pokemon.com/play/resources/pokedex${pokeRef.value.file_name}`
        img.src = pokeImg.value

        img.onload = function () {
            ctx.save()
            // ctx.shadowColor = '#0f0'
            ctx.shadowColor = typeColor.alphaColor
            ctx.shadowBlur = 50
            ctx.translate(canvasWidth / 2 - r, baseY)
            // Draw the image on the canvas
            ctx.drawImage(img, 0, 0, 2 * r, 2 * r)
            ctx.restore()
        }
    }
}
const drowPokeName = ({ ctx, text = '', baseY }) => {
    // 精靈名稱
    ctx.save()
    // const text = pokemon.value.name || ''
    ctx.font = '24px Arial'
    ctx.fillStyle = 'black'
    const textWidth = ctx.measureText(text).width
    ctx.translate(canvasWidth / 2 - textWidth / 2, baseY)

    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const drowPokeTypes = ({ ctx, baseX, baseY }) => {
    // 屬性
    // 文字
    const text = '屬性'
    const font = '24px Arial'
    ctx.save()
    ctx.font = font
    ctx.fillStyle = 'black'
    // const textWidth = ctx.measureText(text).width
    ctx.fillText(text, baseX, baseY)
    ctx.restore()
    if (pokemon.value?.attribute?.length) {
        pokemon.value.attribute.forEach((typeTW, i) => {
            const typeEn = typeTwToEn[typeTW]
            drowType(typeEn, ctx, baseX + 100 + i * 150, baseY)
        })
    }
}
const drowType = (type, ctx, baseX, baseY) => {
    const typeTw = typeEnToTw[type]
    const typeColor = getTypeColors(type)
    ctx.save()
    const r = 20
    ctx.beginPath()
    ctx.translate(baseX, baseY + r / 2)
    ctx.arc(0, 0, r, 0, 2 * Math.PI)
    ctx.fillStyle = typeColor.color
    ctx.fill()
    ctx.restore()
    // 屬性圖
    const img2 = new Image()
    img2.src = `/icons/${type}.svg`
    img2.onload = function () {
        ctx.save()
        ctx.translate(baseX - r + 5, baseY - r / 2 + 5)
        // Draw the image on the canvas
        ctx.drawImage(img2, 0, 0, 30, 30)
        ctx.restore()
    }
    // 屬性文字
    ctx.save()
    const test = typeTw
    const font = '18px Arial'

    ctx.font = font
    ctx.fillStyle = 'black'
    // const textWidth = ctx.measureText(text).width
    ctx.fillText(test, baseX + 40, baseY)
    ctx.restore()
}
const drowPokeMoves = ({ ctx, baseX, baseY }) => {
    // 屬性
    // 文字
    const text = '招式'
    const font = '24px Arial'
    ctx.save()
    ctx.font = font
    ctx.fillStyle = 'black'
    // const textWidth = ctx.measureText(text).width
    ctx.fillText(text, baseX, baseY)
    ctx.restore()
    let shift = 0
    for (let i = 0; i < chooseMoves.value.length; i++) {
        shift += drowPokeMove(chooseMoves.value[i], ctx, baseX + 80 + shift, baseY) + 4
    }
    // chooseMoves.value.forEach((move, i) => {
    //     drowPokeMove(move, ctx, baseX + 100 + i * 100, baseY)
    // })
}
const drowPokeMove = (move, ctx, baseX, baseY) => {
    const moveHeight = MOVE_NAME_SIZE + MOVE_MARGIN * 2 + 4 + MOVE_DETAIL_SIZE
    const moveNameWidth = calcFontWidth(ctx, move.name, MOVE_NAME_SIZE)
    const moveDetailWidth = calcFontWidth(
        ctx,
        `${move.type} / ${move.category} / PP${move.pp}`,
        MOVE_DETAIL_SIZE
    )
    const contentWidth = Math.max(moveNameWidth, moveDetailWidth)
    const moveWidth = contentWidth + MOVE_MARGIN * 2
    drowPokeMoveBackground(move, ctx, baseX, baseY - (moveHeight - 24) / 2, moveWidth, moveHeight)
    ctx.save()
    const text = move.name
    const font = `${MOVE_NAME_SIZE}px Arial`
    ctx.translate(baseX + MOVE_MARGIN, baseY + MOVE_MARGIN - (moveHeight - 24) / 2)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, 0, 0)
    ctx.restore()
    drowPokeMoveDetail(
        move,
        ctx,
        baseX + MOVE_MARGIN,
        baseY + MOVE_MARGIN + MOVE_NAME_SIZE + 4 - (moveHeight - 24) / 2
    )
    return moveWidth
}
const drowPokeMoveBackground = (move, ctx, baseX, baseY, width, height) => {
    ctx.save()
    const typeEn = typeTwToEn[move.type]
    const typeColor = getTypeColors(typeEn)
    ctx.translate(baseX, baseY)
    ctx.fillStyle = typeColor.alphaColor
    ctx.fillRect(0, 0, width, height)
    ctx.restore()
}
const drowPokeMoveDetail = (move, ctx, baseX, baseY) => {
    ctx.save()
    const text = `${move.type} / ${move.category} / PP${move.pp}`
    const font = `${MOVE_DETAIL_SIZE}px Arial`
    ctx.translate(baseX, baseY)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const calcFontWidth = (ctx, text, fontSize) => {
    ctx.save()
    ctx.font = `${fontSize}px Arial`
    const width = ctx.measureText(text).width
    ctx.restore()
    return width
}
const drowPokeAbility = ({ ctx, baseX, baseY }) => {
    // 特性
    // 文字
    const text = '特性'
    const font = '24px Arial'
    ctx.save()
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, baseX, baseY)
    ctx.restore()
    if (chooseAbility.value.id) {
        drowAbility(chooseAbility.value, ctx, baseX + 80, baseY)
    }
}
const drowAbility = (ability, ctx, baseX, baseY) => {
    ctx.save()
    const text = ability.name
    const font = `${MOVE_NAME_SIZE}px Arial`
    ctx.translate(baseX, baseY + (TITLE_FONT_SIZE - FONT_SIZE) / 2)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const drowPokeNature = ({ ctx, baseX, baseY }) => {
    // 性格
    // 文字
    const text = '性格'
    const font = '24px Arial'
    ctx.save()
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, baseX, baseY)
    ctx.restore()
    if (chooseNature.value.id) {
        drowNature(chooseNature.value, ctx, baseX + 80, baseY)
    }
}
const drowNature = (nature, ctx, baseX, baseY) => {
    // const moveHeight = MOVE_NAME_SIZE + MOVE_MARGIN * 2 + 4 + MOVE_DETAIL_SIZE
    const contentWidth = calcFontWidth(ctx, nature.name, MOVE_NAME_SIZE)
    const moveWidth = contentWidth + MOVE_MARGIN * 2
    // const typeColor = getTypeColors('normal')
    // drowBox(ctx, typeColor.alphaColor, baseX, baseY, moveWidth, moveHeight)
    ctx.save()
    const text = nature.name
    const font = `${MOVE_NAME_SIZE}px Arial`
    ctx.translate(baseX, baseY + 4)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, 0, 0)
    ctx.restore()
    drowNatureDetail(ctx, nature, baseX + moveWidth, baseY)
}
const drowNatureDetail = (ctx, nature, baseX, baseY) => {
    ctx.save()
    const text = `(${nature.describe})`
    const font = `${FONT_SIZE}px Arial`
    ctx.translate(baseX, baseY + (TITLE_FONT_SIZE - FONT_SIZE) / 2)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const drowPokeHeldItem = ({ ctx, baseX, baseY }) => {
    // 攜帶物
    // 文字
    const text = '攜帶物'
    const font = `${TITLE_FONT_SIZE}px Arial`
    ctx.save()
    ctx.font = font
    ctx.fillStyle = 'black'
    // const textWidth = ctx.measureText(text).width
    ctx.fillText(text, baseX, baseY)
    ctx.restore()
    if (chooseItem.value.id) drowHeldItem(ctx, chooseItem.value, baseX + 120, baseY)
}
const drowHeldItem = (ctx, item, baseX, baseY) => {
    const r = 24
    ctx.save()
    ctx.beginPath()
    ctx.translate(baseX, baseY + r / 2)
    ctx.arc(0, 0, r, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()

    // 不知道為什麼加了才正常
    ctx.beginPath()
    ctx.restore()
    // 屬性圖
    const img2 = new Image()
    img2.src = `/icons/heldItem/${item.id}.png`
    img2.onload = function () {
        ctx.save()
        ctx.translate(baseX - r + 6, baseY - r / 2 + 6)
        // Draw the image on the canvas
        ctx.drawImage(img2, 0, 0, 36, 36)
        ctx.restore()
    }
    // 屬性文字
    ctx.save()
    const test = item.name
    const font = `${FONT_SIZE}px Arial`
    ctx.translate(baseX + 40, baseY + (TITLE_FONT_SIZE - FONT_SIZE) / 2)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(test, 0, 0)
    ctx.restore()
}
const drowBasicPoints = ({ ctx, baseX, baseY }) => {
    // 努力值
    // 文字
    const text = '努力值'
    const font = '24px Arial'
    ctx.save()
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, baseX, baseY)
    ctx.restore()
    let count = 0
    let row = 0
    for (let i = 0; i < basicPoints.length; i++) {
        if (basicPoint.value[basicPoints[i].key] > 0) {
            const params = {
                name: basicPoints[i].name,
                value: basicPoint.value[basicPoints[i].key],
            }
            drowBasicPoint(ctx, baseX + 90 + count * 80, baseY + 3 + row * 30, params)
            count++
            if (count > 1) {
                count = 0
                row++
            }
        }
    }
}
const drowBasicPoint = (ctx, baseX, baseY, { name, value }) => {
    ctx.save()
    const text = `${name}: ${value}`
    const font = `18px Arial`
    ctx.translate(baseX, baseY)
    ctx.font = font
    ctx.fillStyle = 'black'
    ctx.fillText(text, 0, 0)
    ctx.restore()
}
const drowDescribeBorder = ({ ctx, baseX, baseY }) => {
    // 设置透明背景
    ctx.save()
    ctx.globalAlpha = 0.5

    // 绘制框
    ctx.beginPath()
    const x = baseX // 框的起点 x 坐标
    const y = baseY - 20 // 框的起点 y 坐标
    const width = 560 // 框的宽度
    const height = 170 // 框的高度
    const cornerRadius = 10 // 圆角半径

    ctx.moveTo(x + cornerRadius, y)
    ctx.lineTo(x + width - cornerRadius, y)
    ctx.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius)
    ctx.lineTo(x + width, y + height - cornerRadius)
    ctx.arcTo(x + width, y + height, x + width - cornerRadius, y + height, cornerRadius)
    ctx.lineTo(x + cornerRadius, y + height)
    ctx.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius)
    ctx.lineTo(x, y + cornerRadius)
    ctx.arcTo(x, y, x + cornerRadius, y, cornerRadius)

    ctx.fillStyle = 'white' // 框的填充颜色
    ctx.fill()
    ctx.lineWidth = 2 // 框的边框线宽
    ctx.strokeStyle = 'black' // 框的边框颜色
    ctx.stroke()
    ctx.beginPath()
    ctx.stroke()
    ctx.restore()
}
const drowDescribe = ({ ctx, baseX, baseY }) => {
    ctx.save()
    const font = '18px Arial'
    ctx.font = font
    ctx.fillStyle = 'black'
    wrapText(ctx, description.value, baseX, baseY, canvasWidth - 56, 30)
    ctx.restore()
}
const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split('')
    let line = ''

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n]
        const metrics = ctx.measureText(testLine)
        const testWidth = metrics.width
        if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x, y)
            line = words[n]
            y += lineHeight
            if (y > canvasHeight - 50) {
                return
            }
        } else {
            line = testLine
        }
    }
    // if (y > canvasHeight - 40) {
    //     return
    // }
    ctx.fillText(line, x, y)
}
const drowCreator = (ctx, x, y) => {
    ctx.save()
    const margin = 20
    let cardIdString = ''
    if (cardId.value) {
        cardIdString = `No. ${cardId.value}`
    }
    const text = `${cardIdString} created by ${creator.value}`
    const font = '16px Arial'
    ctx.font = font
    ctx.fillStyle = 'black'
    const width = ctx.measureText(text).width
    ctx.fillText(text, x - width - margin, y - 8 - margin)
    console.log(ctx.measureText(text))
    ctx.restore()
}
const drwoStar = ({ ctx, baseX, baseY }) => {
    // 畫星星
    const img2 = new Image()
    img2.src = starImageUri.value
    img2.onload = function () {
        ctx.save()
        // ctx.translate(canvasWidth / 2 - 24, baseY - 6)
        // ctx.drawImage(img2, 0, 0, 48, 48)

        ctx.translate(canvasWidth / 2, baseY - canvasWidth / 4)
        ctx.rotate((-45 * Math.PI) / 180)
        for (let i = 0; i < 6; i++) {
            ctx.rotate((15 * Math.PI) / 180)
            ctx.drawImage(img2, 0, canvasWidth / 4 - 2, 30, 30)
        }
        ctx.restore()
    }
}
onMounted(() => {
    // drawPokeCard()
})
watch(
    () => props.pokeData,
    () => {
        drawPokeCard()
    },
    { deep: true }
)
</script>
<template>
    <canvas id="card" :width="canvasWidth" height="900" class="h-full w-full"></canvas>
</template>
<style scoped>
.normal {
    background: rgba(220, 220, 220, 0.2);
}
</style>
