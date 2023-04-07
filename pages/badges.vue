<script setup>
import candyValues from '@/assets/json/candyValues.json'
useHead({
    title: '道館徽章',
})
const badges = [
    {
        name: '飛翼徽章',
        icon: '/icons/Zephyr_Badge.png',
        effect: [1, 1, 0, 0, 0, 0],
        type: 'flying',
    },
    {
        name: '昆蟲徽章',
        icon: '/icons/Hive_Badge.png',
        effect: [1, 0, 0, 1, 0, 0],
        type: 'bug',
    },
    {
        name: '打擊徽章',
        icon: '/icons/Storm_Badge.png',
        effect: [0, 0, 0, 1, 0, 1],
        type: 'fighting',
    },
    {
        name: '標準徽章',
        icon: '/icons/Plain_Badge.png',
        effect: [0, 1, 1, 0, 0, 0],
        type: 'normal',
    },
    { name: '魅影徽章', icon: '/icons/Fog_Badge.png', effect: [0, 0, 1, 1, 0, 0], type: 'ghost' },
    {
        name: '鋼鐵徽章',
        icon: '/icons/Mineral_Badge.png',
        effect: [0, 1, 0, 0, 1, 0],
        type: 'steel',
    },
    {
        name: '冰凍徽章',
        icon: '/icons/Glacier_Badge.png',
        effect: [0, 0, 0, 1, 1, 0],
        type: 'ice',
    },
    {
        name: '升龍徽章',
        icon: '/icons/Rising_Badge.png',
        effect: [0, 0, 0, 0, 1, 1],
        type: 'dragon',
    },
    {
        name: '綠色徽章',
        icon: '/icons/Earth_Badge.png',
        effect: [1, 1, 0, 0, 0, 0],
        type: 'ground',
    },
]
const data = [
    {
        level: 1,
        effect1: 3,
        effect2: 2,
        wear1: 0.8,
        wear2: 0.8,
        fragment: 20,
        essence: 8,
        coin: 12600,
    },
    {
        level: 2,
        effect1: 3.8,
        effect2: 2.6,
        wear1: 1,
        wear2: 1,
        fragment: 30,
        essence: 10,
        coin: 15600,
    },
    {
        level: 3,
        effect1: 4.7,
        effect2: 3.1,
        wear1: 1.2,
        wear2: 1.2,
        fragment: 50,
        essence: 13,
        coin: 19600,
    },
    {
        level: 4,
        effect1: 5.6,
        effect2: 3.7,
        wear1: 1.4,
        wear2: 1.4,
        fragment: 60,
        essence: 15,
        coin: 24000,
    },
    {
        level: 5,
        effect1: 6.5,
        effect2: 4.3,
        wear1: 1.7,
        wear2: 1.7,
        fragment: 80,
        essence: 18,
        coin: 29700,
    },
    {
        level: 6,
        effect1: 7.4,
        effect2: 4.9,
        wear1: 1.9,
        wear2: 1.9,
        fragment: 100,
        essence: 20,
        coin: 36000,
    },
    {
        level: 7,
        effect1: 8.3,
        effect2: 5.5,
        wear1: 2.1,
        wear2: 2.1,
        fragment: 110,
        essence: 23,
        coin: 40000,
    },
    {
        level: 8,
        effect1: 9.1,
        effect2: 6.1,
        wear1: 2.3,
        wear2: 2.3,
        fragment: 120,
        essence: 25,
        coin: 45000,
    },
    {
        level: 9,
        effect1: 10,
        effect2: 6.7,
        wear1: 2.6,
        wear2: 2.6,
        fragment: 130,
        essence: 28,
        coin: 50000,
    },
    {
        level: 10,
        effect1: 11.8,
        effect2: 7.9,
        wear1: 3,
        wear2: 3,
        fragment: 140,
        essence: 30,
        coin: 56000,
    },
    {
        level: 11,
        effect1: 13.6,
        effect2: 9,
        wear1: 3.5,
        wear2: 3.5,
        fragment: 150,
        essence: 33,
        coin: 62000,
    },
    {
        level: 12,
        effect1: 15.3,
        effect2: 10.2,
        wear1: 3.9,
        wear2: 3.9,
        fragment: 160,
        essence: 35,
        coin: 69000,
    },
    {
        level: 13,
        effect1: 17.1,
        effect2: 11.4,
        wear1: 4.4,
        wear2: 4.4,
        fragment: 170,
        essence: 40,
        coin: 77000,
    },
    {
        level: 14,
        effect1: 18.9,
        effect2: 12.6,
        wear1: 4.8,
        wear2: 4.8,
        fragment: 180,
        essence: 42,
        coin: 85000,
    },
    {
        level: 15,
        effect1: 20.7,
        effect2: 13.8,
        wear1: 5.3,
        wear2: 5.3,
        fragment: 190,
        essence: 45,
        coin: 94000,
    },
    {
        level: 16,
        effect1: 22.4,
        effect2: 14.9,
        wear1: 5.7,
        wear2: 5.7,
        fragment: 200,
        essence: 50,
        coin: 103000,
    },
    {
        level: 17,
        effect1: 24.2,
        effect2: 16.1,
        wear1: 6.2,
        wear2: 6.2,
        fragment: 210,
        essence: 52,
        coin: 113000,
    },
    {
        level: 18,
        effect1: 26,
        effect2: 17.3,
        wear1: 6.6,
        wear2: 6.6,
        fragment: 220,
        essence: 55,
        coin: 124000,
    },
    {
        level: 19,
        effect1: 27.7,
        effect2: 18.5,
        wear1: 7.1,
        wear2: 7.1,
        fragment: 230,
        essence: 57,
        coin: 135000,
    },
    {
        level: 20,
        effect1: 30.1,
        effect2: 20.1,
        wear1: 7.7,
        wear2: 7.7,
        fragment: 240,
        essence: 60,
        coin: 150000,
    },
    {
        level: 21,
        effect1: 32.7,
        effect2: 21.8,
        wear1: 8.3,
        wear2: 8.3,
        fragment: 250,
        essence: 65,
        coin: 160000,
    },
    {
        level: 22,
        effect1: 35.4,
        effect2: 23.6,
        wear1: 9,
        wear2: 9,
        fragment: 260,
        essence: 70,
        coin: 172000,
    },
    {
        level: 23,
        effect1: 38.1,
        effect2: 25.4,
        wear1: 9.7,
        wear2: 9.7,
        fragment: 270,
        essence: 75,
        coin: 186000,
    },
    {
        level: 24,
        effect1: 41,
        effect2: 27.3,
        wear1: 10.4,
        wear2: 10.4,
        fragment: 290,
        essence: 80,
        coin: 200000,
    },
    {
        level: 25,
        effect1: 44,
        effect2: 29.3,
        wear1: 11.2,
        wear2: 11.2,
        fragment: 310,
        essence: 85,
        coin: 220000,
    },
    {
        level: 26,
        effect1: 49.6,
        effect2: 31.3,
        wear1: 11.9,
        wear2: 11.9,
        fragment: 330,
        essence: 90,
        coin: 240000,
    },
    {
        level: 27,
        effect1: 49.9,
        effect2: 33.2,
        wear1: 12.7,
        wear2: 12.7,
        fragment: 350,
        essence: 95,
        coin: 260000,
    },
    {
        level: 28,
        effect1: 52.8,
        effect2: 35.2,
        wear1: 13.4,
        wear2: 13.4,
        fragment: 370,
        essence: 100,
        coin: 290000,
    },
    {
        level: 29,
        effect1: 55.8,
        effect2: 37.2,
        wear1: 14.2,
        wear2: 14.2,
        fragment: 390,
        essence: 105,
        coin: 310000,
    },
    {
        level: 30,
        effect1: 59,
        effect2: 39.3,
        wear1: 15,
        wear2: 15,
    },
]
const searchText = ref(0)
const showTable = computed(() => {
    if (!searchText.value) return candyValues
    return candyValues.filter((value) => value.stat === searchText.value)
})
onMounted(async () => {
    setTimeout(() => {
        const childList = document.getElementsByClassName('focusAd')
        // console.log('length', childList.length)
        for (let i = 0; i < childList.length; i++) {
            ;(adsbygoogle = window.adsbygoogle || []).push({})
        }
    }, 500)
})
</script>

<template>
    <main>
        <ins
            class="adsbygoogle focusAd"
            style="display: block"
            data-ad-client="ca-pub-2683150416576260"
            data-ad-slot="6422833388"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
        <div class="page-title">道館徽章</div>
        <div class="note">
            <ul>
                <li>擊敗道館館主後可獲得徽章</li>
                <li>徽章能提升精靈素質，分為被動屬性與佩戴效果</li>
                <li>被動屬性：不用配戴就可以直接提升的數值</li>
                <li>佩戴效果：戴上後才有效果</li>
                <li>不同的徽章有不同的效果，可以針對需求選擇配戴</li>
                <li>每種徽章會提升兩種屬性</li>
            </ul>
        </div>
        <div class="mt-2 font-bold">各種徽章滿級(30)時的效果對照表</div>
        說明：<span class="text-green-600">被動屬性綠色</span>,<span class="text-blue-600"
            >佩戴效果藍色</span
        >
        <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">徽章</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">生命</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">物攻</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">物防</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">特攻</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">特防</th>
                        <th scope="col" class="whitespace-nowrap py-3 px-1">速度</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="badge in badges"
                        :key="badge.name"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <th
                            scope="row"
                            class="whitespace-nowrap py-1 px-4 font-medium text-gray-900"
                        >
                            <div class="flex items-center justify-center">
                                <div class="icon mr-2" :class="badge.type">
                                    <img :src="badge.icon" />
                                </div>
                                {{ badge.name }}
                            </div>
                        </th>
                        <td class="py-1 px-1">
                            <div v-if="badge.effect[0]">
                                <span class="text-green-600">+59</span>,<span class="text-blue-600"
                                    >+15%</span
                                >
                            </div>
                        </td>
                        <td class="py-1 px-1">
                            <div v-if="badge.effect[1]">
                                <span class="text-green-600">+39.3</span>,<span
                                    class="text-blue-600"
                                    >+15%</span
                                >
                            </div>
                        </td>
                        <td class="py-1 px-1">
                            <div v-if="badge.effect[2]">
                                <span class="text-green-600">+39.3</span>,<span
                                    class="text-blue-600"
                                    >+15%</span
                                >
                            </div>
                        </td>
                        <td class="py-1 px-1">
                            <div v-if="badge.effect[3]">
                                <span class="text-green-600">+39.3</span>,<span
                                    class="text-blue-600"
                                    >+15%</span
                                >
                            </div>
                        </td>
                        <td class="py-1 px-1">
                            <div v-if="badge.effect[4]">
                                <span class="text-green-600">+39.3</span>,<span
                                    class="text-blue-600"
                                    >+15%</span
                                >
                            </div>
                        </td>
                        <td class="py-1 px-1">
                            <div v-if="badge.effect[5]">
                                <span class="text-green-600">+59</span>,<span class="text-blue-600"
                                    >+15%</span
                                >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4 font-bold">徽章等級與提升數值關係表</div>
        <div class="note">
            <ul>
                <li>單一徽章要升到30級,單純打60級道館要打143次</li>
                <li>全部徽章升級完成要花費30,406,500金幣</li>
                <li>徽章提升的被動屬性，同等級時生命與速度提升的數值相同，最高59</li>
                <li>其餘四個屬性提升的數值相同，最高39.3</li>
                <li>佩戴效果提升的％數都一樣，最高15%</li>
            </ul>
        </div>
        <div class="relative mt-2 overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-center text-sm text-gray-500">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th scope="col" class="whitespace-nowrap px-1 pt-3" rowspan="2">
                            徽章等級
                        </th>
                        <th scope="col" class="whitespace-nowrap border-l-2 px-1 pt-3" colspan="2">
                            被動屬性提升
                        </th>
                        <th scope="col" class="whitespace-nowrap border-l-2 px-1 pt-3">佩戴效果</th>
                        <th scope="col" class="whitespace-nowrap border-l-2 px-1 pt-3" colspan="3">
                            升級需要消耗
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" class="whitespace-nowrap border-l-2 px-1 pb-3">
                            生命或速度
                        </th>
                        <th scope="col" class="whitespace-nowrap px-1 pb-3">其他屬性</th>
                        <th scope="col" class="whitespace-nowrap border-l-2 px-1 pb-3">所有屬性</th>
                        <th scope="col" class="whitespace-nowrap border-l-2 px-1 pb-3">徽章碎片</th>
                        <th scope="col" class="whitespace-nowrap px-1 pb-3">徽章精華</th>
                        <th scope="col" class="whitespace-nowrap px-1 pb-3">金幣</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="level in data"
                        :key="level.level"
                        class="border-b bg-white hover:bg-gray-50"
                    >
                        <td>{{ level.level }}</td>
                        <td class="text-green-600">{{ level.effect1 }}</td>
                        <td class="text-green-600">{{ level.effect2 }}</td>
                        <td class="text-blue-600">{{ level.wear1 }}%</td>
                        <td>{{ level.fragment }}</td>
                        <td>{{ level.essence }}</td>
                        <td>{{ level.coin }}</td>
                    </tr>
                    <tr class="hover:bg-grasy-50 border-b bg-white">
                        <td class="font-bold">加總</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="font-bold">5610</td>
                        <td class="font-bold">1424</td>
                        <td class="font-bold">3378500</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<style scoped>
/*第一欄第一列：左上*/
tr:first-child td:first-child {
    border-top-left-radius: 8px;
}
/*第一欄最後列：左下*/
tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}
/*最後欄第一列：右上*/
tr:first-child td:last-child {
    border-top-right-radius: 10px;
}
/*最後欄第一列：右下*/
tr:last-child td:last-child {
    border-bottom-right-radius: 10px;
}
.page-title {
    border-left: 8px solid rgb(255, 60, 93);
    padding-left: 8px;
    font-weight: 700;
    font-size: 16px;
    margin: 8px 0px;
}
.note {
    padding: 8px;
    border: 1px solid gray;
    background: pink;
    border-radius: 8px;
}
.icon img {
    height: 70%;
    width: 70%;
    margin: 15%;
}
.flying {
    background: rgba(120, 220, 255, 0.2);
    box-shadow: 0 0 20px rgba(120, 220, 255, 0.2);
}
.bug {
    background: rgba(70, 200, 70, 0.2);
    box-shadow: 0 0 20px rgba(70, 200, 70, 0.2);
}
.fighting {
    background: rgba(220, 105, 0, 0.2);
    box-shadow: 0 0 20px rgba(220, 105, 0, 0.2);
}
.normal {
    background: rgba(220, 220, 220, 0.2);
    box-shadow: 0 0 20px rgba(220, 220, 220, 0.2);
}
.ghost {
    background: rgba(160, 140, 255, 0.2);
    box-shadow: 0 0 20px rgba(160, 140, 255, 0.2);
}
.steel {
    background: rgba(170, 200, 240, 0.2);
    box-shadow: 0 0 20px rgba(170, 200, 240, 0.2);
}
.ice {
    background: rgba(20, 245, 255, 0.2);
    box-shadow: 0 0 20px rgba(20, 245, 255, 0.2);
}
.dragon {
    background: rgba(80, 120, 220, 0.2);
    box-shadow: 0 0 20px rgba(80, 120, 220, 0.2);
}
.ground {
    background: rgba(250, 200, 90, 0.2);
    box-shadow: 0 0 20px rgba(250, 200, 90, 0.2);
}
.icon {
    border-radius: 100%;
    height: 50px;
    width: 50px;
    /* margin: auto; */
    transition: 200ms all;
}
.icon:hover {
    filter: saturate(200%);
    transform: scale(1.1);
    cursor: pointer;
}
</style>
