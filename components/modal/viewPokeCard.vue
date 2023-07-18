<script setup>
import { ref, reactive } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { usePokedexStore } from '@/stores/pokedex'
const { typeTwToEn } = usePokeTypes()
const pokedexStore = usePokedexStore()
const show = ref(false)
const activeTab = ref('self')

const pokeData = ref({})
const handleCopy = () => {
    const myCanvas = document.getElementById('card')
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = myCanvas.width
    tempCanvas.height = myCanvas.height
    const tempCtx = tempCanvas.getContext('2d')
    tempCtx.drawImage(myCanvas, 0, 0)

    tempCanvas.toBlob((blob) => {
        const item = new ClipboardItem({ 'image/png': blob })
        navigator.clipboard.write([item]).then(
            () => {
                alert('已複製到剪貼簿')
            },
            (err) => {
                console.error('Async: Could not copy text: ', err)
            }
        )
    }, 'image/png')

    // const dataURL = myCanvas.toDataURL()
    // const tempInput = document.createElement('input')
    // tempInput.value = dataURL
    // document.body.appendChild(tempInput)
    // tempInput.select()
    // document.execCommand('copy')
    // document.body.removeChild(tempInput)
    // alert('已複製到剪貼簿')
}
const beforeOpen = (e) => {
    // const propMove = e.ref.params.value.move
    // Object.assign(move, propMove)
    // console.log('beforeOpen', e.ref.params.value)
    pokeData.value = e.ref.params.value
}
</script>
<template>
    <vue-final-modal
        v-model="show"
        classes="flex justify-center items-center"
        content-class="modal-content rounded-lg bg-white"
        name="ShowPokeCardModal"
        @before-open="beforeOpen"
    >
        <div class="flex w-[calc(min(100vw,32rem)-12px)] justify-center px-4 py-4 text-left">
            <div class="max-h-[90vh] overflow-y-auto">
                <div class="poke-card">
                    <PokeCard ref="myPokeCard" :poke-data="pokeData" />
                </div>
                <div class="mt-4 flex justify-around">
                    <!-- <button
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="handleCopy"
                    >
                        複製
                    </button>
                    <button
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        分享
                    </button>
                    <button
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        複製文字
                    </button> -->
                    <RouterLink
                        :to="`/pokedex/${pokeData.pokeId}`"
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        前往圖鑑
                    </RouterLink>
                    <button
                        type="button"
                        class="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="show = false"
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    </vue-final-modal>
</template>
<style scoped>
.beyond {
    border: 3px solid transparent;
    border-radius: 8px;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, white, white),
        linear-gradient(135deg, #3632ff 0%, #3eff30 33%, #ffff00 66%, #ff5900 100%);
}
.legend {
    border: 3px solid #ffff00;
    border-radius: 8px;
    background: white;
}
.epic {
    border: 3px solid rgb(192, 0, 192);
    border-radius: 8px;
    background: white;
}
.rare {
    border: 3px solid rgb(46, 57, 255);
    border-radius: 8px;
    background: white;
}
.normal {
    border: 3px solid rgb(190, 190, 190);
    border-radius: 8px;
    background: white;
}
.poke-card {
    width: 100%;
    aspect-ratio: 2/3;
}
</style>
