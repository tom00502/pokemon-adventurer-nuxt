<script setup>
import { $vfm, VueFinalModal } from 'vue-final-modal'
import vSelect from 'vue-select'
import { usePokedexStore } from '@/stores/pokedex'
const { typeTwToEn } = usePokeTypes()
const { natures } = usePokeNatures()
const { heldItems } = useHeldItem()
const { createPokeCard } = useApi()
useHead({
    title: '創建精靈卡',
})
const pokedexStore = usePokedexStore()

const basicPoints = [
    { key: 'hp', name: '生命' },
    { key: 'attack', name: '攻擊' },
    { key: 'defense', name: '防禦' },
    { key: 'sAttack', name: '特攻' },
    { key: 'sDefense', name: '特防' },
    { key: 'speed', name: '速度' },
]
const loading = ref(false)
const title = ref('')
const creator = ref('')
const poke = ref({ name: '' })
const chooseMoves = ref([])
const chooseAbility = ref({ name: '' })
const chooseNature = ref({ name: '' })
const chooseItem = ref({ name: '' })
const describe = ref('')
const chooseType = ref('')
const reincarnated = ref(true)
const basicPoint = ref({ hp: 0, attack: 0, defense: 0, sAttack: 0, sDefense: 0, speed: 0 })
const pokes = computed(() => {
    return pokedexStore.pokes.map((poke) => ({
        id: poke.id,
        name: poke.name,
    }))
})
const pokemon = computed(() => {
    return pokedexStore.pokedex[poke.value.id] || { stat: {} }
})
const pokeMoves = computed(() => {
    const pokeMoves = pokemon.value.moves || []
    const pokeLearnMoves = pokemon.value.learnMoves || []
    const moves = [...new Set([...pokeMoves, ...pokeLearnMoves])]
    return moves.map((moveId) => ({
        ...pokedexStore.movedex[moveId],
    }))
})
const pokeAbilities = computed(() => {
    const pokeAbilities = pokemon.value.features || []
    return pokeAbilities.map((abilityId) => ({
        ...pokedexStore.abilitydex[abilityId],
    }))
})
const reincarnateOptions = [
    { name: '轉生前', value: false },
    { name: '轉生後', value: true },
]
const types = computed(() => {
    return pokemon.value.attribute || []
})
const usedPoint = computed(() => {
    return (
        basicPoint.value.hp +
        basicPoint.value.attack +
        basicPoint.value.defense +
        basicPoint.value.sAttack +
        basicPoint.value.sDefense +
        basicPoint.value.speed
    )
})
watch(
    () => poke.value,
    () => {
        if (!pokemon.value.attribute) return
        chooseType.value = pokemon.value.attribute[0] || ''
    }
)
// const drawPokeCard = () => {
//     const canvas = window.document.getElementById('pokeCard')
//     const ctx = canvas.getContext('2d')
//     ctx.clearRect(0, 0, canvas.width, canvas.height)
//     ctx.textBaseline = 'top'
//     let currentY = 0
//     const radius = 20
//     const width = canvas.width - BORDER_WIDTH + 1
//     const height = canvas.height - BORDER_WIDTH + 1
//     const path = new Path2D()
//     const x = (BORDER_WIDTH - 1) / 2
//     const y = (BORDER_WIDTH - 1) / 2
//     path.moveTo(x + radius, y)
//     path.lineTo(x + width - radius, y)
//     path.quadraticCurveTo(x + width, y, x + width, y + radius)
//     path.lineTo(x + width, y + height - radius)
//     path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
//     path.lineTo(x + radius, y + height)
//     path.quadraticCurveTo(x, y + height, x, y + height - radius)
//     path.lineTo(x, y + radius)
//     path.quadraticCurveTo(x, y, x + radius, y)
//     path.closePath()
//     // 漸層背景
//     ctx.save()
//     ctx.clip(path)
//     let type = 'normal'
//     if (pokemon.value?.attribute) type = typeTwToEn[pokemon.value?.attribute[0]] || 'normal'
//     const typeColor = getTypeColors(type)
//     const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
//     gradient.addColorStop(1, 'white')
//     gradient.addColorStop(0.5, typeColor.alphaColor)
//     gradient.addColorStop(0, typeColor.color)
//     ctx.fillStyle = gradient
//     // ctx.fillRect(0, 0, canvas.width, canvas.height)
//     ctx.fillRect(2, 2, canvas.width - 4, canvas.height - 4)
//     ctx.restore()
//     currentY += 25
//     drowPokeTitle(ctx, currentY)
//     drowPokeQuality(ctx, currentY)
//     currentY += 55
//     drowPokeImage(ctx, currentY)
//     currentY += 330
//     drowPokeName(ctx, currentY)
//     currentY += 80
//     drowPokeTypes(ctx, 40, currentY)
//     currentY += 50
//     drowPokeMoves(ctx, 40, currentY)
//     // // 繪製中線
//     // ctx.strokeStyle = 'red'
//     // ctx.lineWidth = 1

//     // // 設定起點和終點的座標
//     // ctx.beginPath()
//     // ctx.moveTo(0, currentY + 12)
//     // ctx.lineTo(300, currentY + 12)

//     // // 繪製線條
//     // ctx.stroke()
//     currentY += 50
//     drowPokeAbility(ctx, 40, currentY)
//     currentY += 50
//     drowPokeNature(ctx, 40, currentY)
//     currentY += 50
//     drowPokeHeldItem(ctx, 40, currentY)
//     currentY += 50
//     drowBasicPoints(ctx, 40, currentY)

//     drawRoundedGradientRect(
//         ctx,
//         0,
//         0,
//         canvas.width - BORDER_WIDTH + 1,
//         canvas.height - BORDER_WIDTH + 1,
//         radius
//     )
//     currentY += 70
//     drowDescribe(ctx, currentY)
//     drowCreator(ctx, canvas.width, canvas.height)
// }
// const drowPokeTitle = (ctx, baseY) => {
//     const canvas = window.document.getElementById('pokeCard')
//     // 精靈名稱
//     ctx.save()
//     const text = title.value
//     const font = '24px Arial'
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     const textWidth = ctx.measureText(text).width
//     // ctx.translate(canvas.width / 2 - textWidth / 2, baseY)
//     ctx.translate(15, baseY)

//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// const drowPokeQuality = (ctx, baseY) => {
//     const canvas = window.document.getElementById('pokeCard')
//     // 精靈品質
//     ctx.save()
//     const text = qualityEnToTw[pokemon.value.quality] || ''
//     const font = '24px Arial'
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     const textWidth = ctx.measureText(text).width
//     ctx.translate(canvas.width - textWidth - 11, baseY)

//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// const drowPokeImage = (ctx, baseY) => {
//     // 半透明圓
//     // Set the global alpha to 0.5 (50% transparency)
//     ctx.save()
//     const r = canvasWidth / 4
//     ctx.translate(canvasWidth / 2, baseY + r)
//     ctx.globalAlpha = 0.5
//     // Begin a new path for the circle

//     ctx.beginPath()
//     // Draw a circle with a radius of 50 and a center at (100, 100)
//     ctx.arc(0, 0, r, 0, 2 * Math.PI)
//     // Set the fill color to red
//     ctx.fillStyle = 'white'
//     // Fill the circle with the given color and transparency
//     ctx.fill()
//     ctx.restore()
//     // 圓邊框
//     ctx.save()
//     ctx.translate(canvasWidth / 2, baseY + r)
//     ctx.strokeStyle = 'white'
//     ctx.beginPath()
//     ctx.arc(0, 0, r, 0, 2 * Math.PI)
//     ctx.stroke()
//     ctx.restore()
//     // 畫圖
//     if (pokeRef.value.file_name) {
//         const img = new Image()
//         img.src = `https://tw.portal-pokemon.com/play/resources/pokedex${pokeRef.value.file_name}`

//         img.onload = function () {
//             ctx.save()
//             ctx.shadowColor = '#0f0'
//             ctx.shadowBlur = 50
//             ctx.translate(canvasWidth / 2 - r, baseY)
//             // Draw the image on the canvas
//             ctx.drawImage(img, 0, 0, 2 * r, 2 * r)
//             ctx.restore()
//         }
//     }
// }
// const drowPokeName = (ctx, baseY) => {
//     const canvas = window.document.getElementById('pokeCard')
//     // 精靈名稱
//     ctx.save()
//     const text = pokemon.value.name || ''
//     const font = '24px Arial'
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     const textWidth = ctx.measureText(text).width
//     ctx.translate(canvas.width / 2 - textWidth / 2, baseY)

//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// const drowPokeTypes = (ctx, baseX, baseY) => {
//     // 屬性
//     // 文字
//     const text = '屬性'
//     const font = '24px Arial'
//     ctx.save()
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     // const textWidth = ctx.measureText(text).width
//     ctx.fillText(text, baseX, baseY)
//     ctx.restore()
//     if (pokemon.value?.attribute?.length) {
//         pokemon.value.attribute.forEach((typeTW, i) => {
//             const typeEn = typeTwToEn[typeTW]
//             drowType(typeEn, ctx, baseX + 120 + i * 150, baseY)
//         })
//     }
// }
// const drowType = (type, ctx, baseX, baseY) => {
//     const typeTw = typeEnToTw[type]
//     const typeColor = getTypeColors(type)
//     ctx.save()
//     const r = 24
//     ctx.beginPath()
//     ctx.translate(baseX, baseY + r / 2)
//     ctx.arc(0, 0, r, 0, 2 * Math.PI)
//     ctx.fillStyle = typeColor.color
//     ctx.fill()
//     ctx.restore()
//     // 屬性圖
//     const img2 = new Image()
//     img2.src = `/icons/${type}.svg`
//     img2.onload = function () {
//         ctx.save()
//         ctx.translate(baseX - r + 6, baseY - r / 2 + 6)
//         // Draw the image on the canvas
//         ctx.drawImage(img2, 0, 0, 36, 36)
//         ctx.restore()
//     }
//     // 屬性文字
//     ctx.save()
//     const test = typeTw
//     const font = '18px Arial'

//     ctx.font = font
//     ctx.fillStyle = 'black'
//     // const textWidth = ctx.measureText(text).width
//     ctx.fillText(test, baseX + 40, baseY)
//     ctx.restore()
// }
// const drowPokeMoves = (ctx, baseX, baseY) => {
//     // 屬性
//     // 文字
//     const text = '招式'
//     const font = '24px Arial'
//     ctx.save()
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     // const textWidth = ctx.measureText(text).width
//     ctx.fillText(text, baseX, baseY)
//     ctx.restore()
//     let shift = 0
//     console.log(chooseMoves.value.length)
//     for (let i = 0; i < chooseMoves.value.length; i++) {
//         console.log(i)
//         shift += drowPokeMove(chooseMoves.value[i], ctx, baseX + 100 + shift, baseY) + 4
//     }
//     // chooseMoves.value.forEach((move, i) => {
//     //     drowPokeMove(move, ctx, baseX + 100 + i * 100, baseY)
//     // })
// }
// const calcFontWidth = (ctx, text, fontSize) => {
//     ctx.save()
//     ctx.font = `${fontSize}px Arial`
//     const width = ctx.measureText(text).width
//     ctx.restore()
//     return width
// }
// const drowPokeMove = (move, ctx, baseX, baseY) => {
//     const moveHeight = MOVE_NAME_SIZE + MOVE_MARGIN * 2 + 4 + MOVE_DETAIL_SIZE
//     const moveNameWidth = calcFontWidth(ctx, move.name, MOVE_NAME_SIZE)
//     const moveDetailWidth = calcFontWidth(
//         ctx,
//         `${move.type} / ${move.category} / PP${move.pp}`,
//         MOVE_DETAIL_SIZE
//     )
//     const contentWidth = Math.max(moveNameWidth, moveDetailWidth)
//     const moveWidth = contentWidth + MOVE_MARGIN * 2
//     drowPokeMoveBackground(move, ctx, baseX, baseY - (moveHeight - 24) / 2, moveWidth, moveHeight)
//     ctx.save()
//     const text = move.name
//     const font = `${MOVE_NAME_SIZE}px Arial`
//     ctx.translate(baseX + MOVE_MARGIN, baseY + MOVE_MARGIN - (moveHeight - 24) / 2)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, 0, 0)
//     ctx.restore()
//     drowPokeMoveDetail(
//         move,
//         ctx,
//         baseX + MOVE_MARGIN,
//         baseY + MOVE_MARGIN + MOVE_NAME_SIZE + 4 - (moveHeight - 24) / 2
//     )
//     return moveWidth
// }
// const drowPokeMoveBackground = (move, ctx, baseX, baseY, width, height) => {
//     ctx.save()
//     const typeEn = typeTwToEn[move.type]
//     const typeColor = getTypeColors(typeEn)
//     ctx.translate(baseX, baseY)
//     ctx.fillStyle = typeColor.alphaColor
//     ctx.fillRect(0, 0, width, height)
//     ctx.restore()
// }
// const drowPokeMoveDetail = (move, ctx, baseX, baseY) => {
//     ctx.save()
//     const text = `${move.type} / ${move.category} / PP${move.pp}`
//     const font = `${MOVE_DETAIL_SIZE}px Arial`
//     ctx.translate(baseX, baseY)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// const drowPokeAbility = (ctx, baseX, baseY) => {
//     // 特性
//     // 文字
//     const text = '特性'
//     const font = '24px Arial'
//     ctx.save()
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, baseX, baseY)
//     ctx.restore()
//     if (chooseAbility.value.id) {
//         drowAbility(chooseAbility.value, ctx, baseX + 100, baseY)
//     }
// }
// const drowAbility = (ability, ctx, baseX, baseY) => {
//     // const moveHeight = MOVE_NAME_SIZE + MOVE_MARGIN * 2 + 4 + MOVE_DETAIL_SIZE
//     // const contentWidth = calcFontWidth(ctx, ability.name, MOVE_NAME_SIZE)
//     // const moveWidth = contentWidth + MOVE_MARGIN * 2
//     // const typeColor = getTypeColors('normal')
//     // drowBox(ctx, typeColor.alphaColor, baseX, baseY, moveWidth, moveHeight)
//     ctx.save()
//     const text = ability.name
//     const font = `${MOVE_NAME_SIZE}px Arial`
//     ctx.translate(baseX, baseY + (TITLE_FONT_SIZE - FONT_SIZE) / 2)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// const drowPokeNature = (ctx, baseX, baseY) => {
//     // 性格
//     // 文字
//     const text = '性格'
//     const font = '24px Arial'
//     ctx.save()
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, baseX, baseY)
//     ctx.restore()
//     if (chooseNature.value.id) {
//         drowNature(chooseNature.value, ctx, baseX + 100, baseY)
//     }
// }
// const drowNature = (nature, ctx, baseX, baseY) => {
//     // const moveHeight = MOVE_NAME_SIZE + MOVE_MARGIN * 2 + 4 + MOVE_DETAIL_SIZE
//     const contentWidth = calcFontWidth(ctx, nature.name, MOVE_NAME_SIZE)
//     const moveWidth = contentWidth + MOVE_MARGIN * 2
//     // const typeColor = getTypeColors('normal')
//     // drowBox(ctx, typeColor.alphaColor, baseX, baseY, moveWidth, moveHeight)
//     ctx.save()
//     const text = nature.name
//     const font = `${MOVE_NAME_SIZE}px Arial`
//     ctx.translate(baseX, baseY + 4)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, 0, 0)
//     ctx.restore()
//     drowNatureDetail(ctx, nature, baseX + moveWidth, baseY)
// }
// const drowNatureDetail = (ctx, nature, baseX, baseY) => {
//     ctx.save()
//     const text = `(${nature.describe})`
//     const font = `${FONT_SIZE}px Arial`
//     ctx.translate(baseX, baseY + (TITLE_FONT_SIZE - FONT_SIZE) / 2)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// const drowPokeHeldItem = (ctx, baseX, baseY) => {
//     // 攜帶物
//     // 文字
//     const text = '攜帶物'
//     const font = `${TITLE_FONT_SIZE}px Arial`
//     ctx.save()
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     // const textWidth = ctx.measureText(text).width
//     ctx.fillText(text, baseX, baseY)
//     ctx.restore()
//     if (chooseItem.value.id) drowHeldItem(ctx, chooseItem.value, baseX + 120, baseY)
// }
// const drowHeldItem = (ctx, item, baseX, baseY) => {
//     const r = 24
//     ctx.save()
//     ctx.beginPath()
//     ctx.translate(baseX, baseY + r / 2)
//     ctx.arc(0, 0, r, 0, 2 * Math.PI)
//     ctx.fillStyle = 'white'
//     ctx.fill()

//     // 不知道為什麼加了才正常
//     ctx.beginPath()
//     ctx.restore()
//     // 屬性圖
//     const img2 = new Image()
//     img2.src = `/icons/heldItem/${item.id}.png`
//     img2.onload = function () {
//         ctx.save()
//         ctx.translate(baseX - r + 6, baseY - r / 2 + 6)
//         // Draw the image on the canvas
//         ctx.drawImage(img2, 0, 0, 36, 36)
//         ctx.restore()
//     }
//     // 屬性文字
//     ctx.save()
//     const test = item.name
//     const font = `${FONT_SIZE}px Arial`
//     ctx.translate(baseX + 40, baseY + (TITLE_FONT_SIZE - FONT_SIZE) / 2)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(test, 0, 0)
//     ctx.restore()
// }
// // const drowBox = (ctx, color, baseX, baseY, width, height) => {
// //     ctx.save()
// //     ctx.translate(baseX, baseY)
// //     ctx.fillStyle = color
// //     ctx.fillRect(0, 0, width, height)
// //     ctx.restore()
// // }
// const drowBasicPoints = (ctx, baseX, baseY) => {
//     // 努力值
//     // 文字
//     const text = '努力值'
//     const font = '24px Arial'
//     ctx.save()
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, baseX, baseY)
//     ctx.restore()
//     let count = 0
//     let row = 0
//     for (let i = 0; i < basicPoints.length; i++) {
//         if (basicPoint.value[basicPoints[i].key] > 0) {
//             const params = {
//                 name: basicPoints[i].name,
//                 value: basicPoint.value[basicPoints[i].key],
//             }
//             drowBasicPoint(ctx, baseX + 100 + count * 150, baseY + row * 30, params)
//             count++
//             if (count > 2) {
//                 count = 0
//                 row++
//             }
//         }
//     }
// }
// const drowBasicPoint = (ctx, baseX, baseY, { name, value }) => {
//     ctx.save()
//     const text = `${name}: ${value}`
//     const font = `18px Arial`
//     ctx.translate(baseX, baseY)
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     ctx.fillText(text, 0, 0)
//     ctx.restore()
// }
// function drawRoundedGradientRect(ctx, x, y, width, height, radius) {
//     ctx.save()
//     const path = new Path2D()
//     path.moveTo(x + radius, y)
//     path.lineTo(x + width - radius, y)
//     path.quadraticCurveTo(x + width, y, x + width, y + radius)
//     path.lineTo(x + width, y + height - radius)
//     path.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
//     path.lineTo(x + radius, y + height)
//     path.quadraticCurveTo(x, y + height, x, y + height - radius)
//     path.lineTo(x, y + radius)
//     path.quadraticCurveTo(x, y, x + radius, y)
//     path.closePath()

//     // 設定漸層
//     const gradient = ctx.createLinearGradient(x, y, x + width, y + height)
//     gradient.addColorStop(0, 'gray')
//     gradient.addColorStop(0.5, 'white')
//     gradient.addColorStop(1, 'gray')
//     ctx.translate((BORDER_WIDTH - 1) / 2, (BORDER_WIDTH - 1) / 2)
//     // 畫外框
//     // ctx.beginPath()
//     // ctx.moveTo(x + radius, y)
//     // ctx.lineTo(x + width - radius, y)
//     // ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
//     // ctx.lineTo(x + width, y + height - radius)
//     // ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
//     // ctx.lineTo(x + radius, y + height)
//     // ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
//     // ctx.lineTo(x, y + radius)
//     // ctx.quadraticCurveTo(x, y, x + radius, y)
//     // ctx.closePath()

//     // 填充漸層
//     // ctx.fillStyle = gradient
//     ctx.lineWidth = BORDER_WIDTH
//     ctx.strokeStyle = gradient
//     // ctx.stroke()
//     ctx.stroke(path)
//     // 畫光源
//     // ctx.lineWidth = 3
//     // ctx.strokeStyle = 'white'
//     // ctx.shadowOffsetX = 0
//     // ctx.shadowOffsetY = 0
//     // ctx.shadowBlur = 5
//     // ctx.shadowColor = 'blue'
//     // // ctx.globalCompositeOperation = 'source-out'
//     // ctx.stroke(path)
//     ctx.fill()

//     ctx.restore()
//     // 圓框測試
//     // ctx.save()
//     // ctx.beginPath()
//     // ctx.arc(100, 300, 50, 0, 2 * Math.PI)
//     // // ctx.strokeStyle = 'red'
//     // // ctx.lineWidth = 10
//     // // ctx.fillStyle = 'red'
//     // // ctx.fill()
//     // // ctx.beginPath()
//     // ctx.arc(100, 300, 30, 0, 2 * Math.PI)
//     // ctx.clip('evenodd')

//     // // ctx.beginPath()
//     // // ctx.rect(0, 0, 500, 500)
//     // // ctx.closePath()
//     // // ctx.fillStyle = 'red'
//     // // ctx.fill()

//     // // ctx.beginPath()
//     // // ctx.arc(100, 300, 30, 0, 2 * Math.PI)
//     // // // ctx.strokeStyle = 'red'
//     // // ctx.lineWidth = 10
//     // // ctx.stroke()
//     // // ctx.clip()

//     // ctx.beginPath()
//     // ctx.rect(0, 0, 500, 500)
//     // ctx.closePath()
//     // ctx.fillStyle = 'white'
//     // ctx.fill()

//     // ctx.shadowBlur = 20
//     // ctx.shadowColor = 'blue'
//     // ctx.beginPath()
//     // ctx.arc(100, 300, 30, 0, 2 * Math.PI)
//     // ctx.closePath()
//     // ctx.fillStyle = 'blue'
//     // ctx.fill()
//     // ctx.lineWidth = 2
//     // ctx.shadowBlur = 20
//     // ctx.shadowColor = 'blue'
//     // ctx.beginPath()
//     // ctx.arc(100, 300, 50, 0, 2 * Math.PI)
//     // ctx.closePath()
//     // // ctx.fillStyle = 'blue'
//     // // ctx.globalCompositeOperation = 'lighter'
//     // ctx.stroke()
//     // ctx.restore()
//     // 白框雙面漸層效果
//     // ctx.save()
//     // ctx.shadowColor = '#00f'
//     // ctx.shadowBlur = 30
//     // ctx.lineWidth = 10
//     // ctx.strokeStyle = 'white'
//     // ctx.beginPath()
//     // ctx.strokeRect(220, 40, 150, 120)
//     // ctx.restore()
// }
// const drowDescribe = (ctx, currentY) => {
//     const canvas = window.document.getElementById('pokeCard')
//     ctx.save()
//     const font = '18px Arial'
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     wrapText(ctx, describe.value, 40, currentY, canvas.width - 80, 30)
//     ctx.restore()
// }
// const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
//     const words = text.split('')
//     let line = ''

//     for (let n = 0; n < words.length; n++) {
//         const testLine = line + words[n]
//         const metrics = ctx.measureText(testLine)
//         const testWidth = metrics.width
//         if (testWidth > maxWidth && n > 0) {
//             ctx.fillText(line, x, y)
//             line = words[n]
//             y += lineHeight
//         } else {
//             line = testLine
//         }
//     }
//     ctx.fillText(line, x, y)
// }
// const drowCreator = (ctx, x, y) => {
//     ctx.save()
//     const margin = 8
//     const text = `Created by ${creator.value}`
//     const font = '16px Arial'
//     ctx.font = font
//     ctx.fillStyle = 'black'
//     const width = ctx.measureText(text).width
//     ctx.fillText(text, x - width - margin, y - 16 - margin)
//     console.log(ctx.measureText(text))
//     ctx.restore()
// }
const myPokeCard = ref(null)
const handleChange = () => {
    // drawPokeCard()
    // console.log('123', myPokeCard.value)
    // myPokeCard.value.drawPokeCard()
}
const checkPoint = (pointType) => {
    if (usedPoint.value > maxPointAll.value) {
        let sum = 0
        basicPoints.forEach((type) => {
            if (type.key === pointType) {
                return
            }
            sum += basicPoint.value[type.key]
        })
        basicPoint.value[pointType] = maxPointAll.value - sum
    }
}
const maxPointSingle = computed(() => {
    return reincarnated.value ? 252 : 255
})
const maxPointAll = computed(() => {
    return reincarnated.value ? 630 : 510
})
onMounted(() => {
    title.value = '主線任務剋星'
    poke.value = { id: 16, name: '巴大蝶' }
    chooseMoves.value = [
        {
            id: 483,
            name: '蝶舞',
            type: '蟲',
            category: '變化',
            power: '—',
            accuracy: '—',
            pp: 20,
            describe: '輕巧地跳起神秘又美麗的舞蹈。提高自己的特攻、特防和速度各1級。',
            active: 1,
        },
        {
            id: 403,
            name: '空氣斬',
            type: '飛行',
            category: '特殊',
            power: 75,
            accuracy: 95,
            pp: 15,
            describe: '用連天空也能劈開的空氣之刃進行攻擊。有30%的幾率使目標陷入[畏縮]狀態。',
            active: 1,
        },
        {
            id: 405,
            name: '蟲鳴',
            type: '蟲',
            category: '特殊',
            power: 90,
            accuracy: 100,
            pp: 10,
            describe: '利用振動發出音波進行攻擊。有10%幾率令目標的特防降低1級。',
            active: 1,
        },
        {
            id: 79,
            name: '催眠粉',
            type: '草',
            category: '變化',
            power: '—',
            accuracy: 75,
            pp: 15,
            describe: '撒出催眠粉，從而讓對手陷入[睡眠]狀態。',
            active: 1,
        },
    ]
    chooseAbility.value = {
        id: 14,
        name: '複眼',
        describe: '因為擁有複眼，招式的命中率會提高。',
        cost: 180,
    }
    chooseNature.value = { id: 21, name: '胆小', describe: '速度＋,攻擊－' }
    chooseItem.value = { id: 28, quality: 'beyond', upgradeCost: 3, name: '廣角鏡' }
    basicPoint.value.hp = 126
    basicPoint.value.sAttack = 252
    basicPoint.value.speed = 252
    describe.value = '催眠蝶舞催眠蝶舞催眠蝶舞疊滿後催眠輸出'
    creator.value = 'Tux001'
    // drawPokeCard()

    // const canvas = window.document.getElementById('canvas')
    // if (canvas.getContext) {
    //     const ctx = canvas.getContext('2d')

    //     ctx.fillStyle = 'rgb(200,0,0)'
    //     ctx.fillRect(10, 10, 55, 50)

    //     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    //     ctx.fillRect(30, 30, 55, 50)

    //     ctx.beginPath()
    //     ctx.moveTo(75, 50)
    //     ctx.lineTo(100, 75)
    //     ctx.lineTo(100, 25)
    //     ctx.fill()

    //     ctx.beginPath()
    //     ctx.arc(75, 75, 50, 0, Math.PI * 2, true) // Outer circle
    //     ctx.moveTo(110, 75)
    //     ctx.arc(75, 75, 35, 0, Math.PI, false) // Mouth (clockwise)
    //     ctx.moveTo(65, 65)
    //     ctx.arc(60, 65, 5, 0, Math.PI * 2, true) // Left eye
    //     ctx.moveTo(95, 65)
    //     ctx.arc(90, 65, 5, 0, Math.PI * 2, true) // Right eye
    //     ctx.stroke()

    //     const rectangle = new Path2D()
    //     rectangle.rect(100, 100, 50, 50)

    //     const circle = new Path2D()
    //     circle.moveTo(225, 35)
    //     circle.arc(100, 35, 25, 0, 2 * Math.PI)

    //     ctx.stroke(rectangle)
    //     ctx.fill(circle)
    // }
})

const pokeData = computed(() => {
    return {
        title: title.value,
        pokeId: poke.value.id,
        pokeName: poke.value.name,
        moves: chooseMoves.value.map((item) => item.id).join(','),
        abilityId: chooseAbility.value.id,
        natureId: chooseNature.value.id,
        itemId: chooseItem.value.id,
        ...basicPoint.value,
        description: describe.value,
        creator: creator.value,
        type: typeTwToEn[chooseType.value],
        reincarnated: reincarnated.value,
    }
})

const handleClick = async () => {
    const params = {
        title: title.value,
        pokeId: poke.value.id,
        pokeName: poke.value.name,
        moves: chooseMoves.value.map((item) => item.id).join(','),
        abilityId: chooseAbility.value.id,
        natureId: chooseNature.value.id,
        itemId: chooseItem.value.id,
        ...basicPoint.value,
        description: describe.value,
        creator: creator.value,
        type: typeTwToEn[chooseType.value],
        reincarnated: reincarnated.value,
    }
    console.log(params)
    loading.value = true
    await createPokeCard(params)
    loading.value = false
    const options = {
        message: `完成`,
    }
    $vfm.show('alertModal', { options })
}
</script>

<template>
    <div>
        精靈稱號
        <div>
            <input
                v-model="title"
                type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                @input="handleChange"
            />
        </div>

        選擇精靈
        <v-select
            v-model="poke"
            :options="pokes"
            label="name"
            @option:selected="handleChange"
        ></v-select>
        選擇主題色
        <vSelect
            v-model="chooseType"
            :options="types"
            label="name"
            @option:selected="handleChange"
        ></vSelect>
        選擇招式
        <v-select
            v-model="chooseMoves"
            :options="pokeMoves"
            multiple
            label="name"
            :selectable="() => chooseMoves.length < 4"
            @option:selected="handleChange"
            @option:deselected="handleChange"
        ></v-select>
        選擇特性
        <v-select
            v-model="chooseAbility"
            :options="pokeAbilities"
            label="name"
            @option:selected="handleChange"
            @option:deselected="handleChange"
        ></v-select>
        選擇個性
        <v-select
            v-model="chooseNature"
            :options="natures"
            label="name"
            @option:selected="handleChange"
            @option:deselected="handleChange"
        ></v-select>
        選擇攜帶物
        <v-select
            v-model="chooseItem"
            :options="heldItems"
            label="name"
            @option:selected="handleChange"
            @option:deselected="handleChange"
        ></v-select>
        轉生狀態
        <v-select
            v-model="reincarnated"
            :options="reincarnateOptions"
            :reduce="(option) => option.value"
            label="name"
            @option:selected="handleChange"
            @option:deselected="handleChange"
        ></v-select>
        努力值({{ usedPoint }} / {{ maxPointAll }})
        <div v-for="basicType in basicPoints" :key="basicType.key" class="w-full px-3">
            {{ basicType.name }}
            <input
                v-model.number="basicPoint[basicType.key]"
                type="range"
                min="0"
                :max="maxPointSingle"
                class="w-full"
                @change="() => checkPoint(basicType.key)"
            />
            <input
                v-model.number="basicPoint[basicType.key]"
                type="number"
                :max="maxPointSingle"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                @change="() => checkPoint(basicType.key)"
                @keyup="() => checkPoint(basicType.key)"
            />
            {{ ` / ${maxPointSingle}` }}
        </div>

        <label for="message" class="mb-2 block text-sm font-medium text-gray-900">使用說明</label>
        <textarea
            id="message"
            v-model="describe"
            rows="4"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="介紹一下如何使用"
            @input="handleChange"
        ></textarea>
        製作人
        <div>
            <input
                v-model="creator"
                type="text"
                class="rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                @input="handleChange"
            />
        </div>
        <div v-if="loading" class="lds-dual-ring"></div>
        <button
            v-else
            type="button"
            class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="handleClick"
        >
            送出
        </button>
        <!-- <canvas id="canvas" width="150" height="150"></canvas> -->
        <PokeCard ref="myPokeCard" :poke-data="pokeData" />
        <!-- <div>
            <canvas id="pokeCard" :width="canvasWidth" height="900"></canvas>
        </div> -->
    </div>
</template>
