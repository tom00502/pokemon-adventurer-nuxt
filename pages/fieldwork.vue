<script setup>
import { computed, ref } from 'vue'
const table = [
    {
        work: '使用1次大師球捕捉精靈',
        award: ['水晶50', '金幣48000'],
        level: 'legend',
    },
    {
        work: '提升1次草和毒系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次毒和飛行系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次蟲和飛行系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次草和超能力系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次一般和飛行系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次岩石和水系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次岩石和地面系精靈的品階',
        award: ['胡地之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次蟲和毒系精靈的品階',
        award: ['大岩蛇之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次一般和妖精系精靈的品階',
        award: ['大岩蛇之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '提升1次電和鋼系精靈的品階',
        award: ['大岩蛇之笛', '金幣28800'],
        level: 'legend',
    },
    {
        work: '使用5次PP提升劑',
        award: ['差不多娃娃之笛', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次蟲和毒系的精靈',
        award: ['GEN1史詩之笛', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次草和毒系的精靈',
        award: ['GEN1史詩之笛', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次草和超能力系的精靈',
        award: ['GEN1史詩之笛', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次一般和妖精系的精靈',
        award: ['GEN1史詩之笛', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次岩石和地面系的精靈',
        award: ['GEN1史詩之笛', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次電和鋼系的精靈',
        award: ['神奇膠囊*2', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次毒和飛行系的精靈',
        award: ['神奇膠囊*2', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次蟲和飛行系的精靈',
        award: ['神奇膠囊*2', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次岩石和水系的精靈',
        award: ['神奇膠囊*2', '金幣19200'],
        level: 'epic',
    },
    {
        work: '進化1次一般和飛行系的精靈',
        award: ['神奇膠囊*2', '金幣19200'],
        level: 'epic',
    },
    {
        work: '捕捉4只岩石和水系的精靈',
        award: ['波克基古之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只毒和飛行系的精靈',
        award: ['波克基古之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只草和毒系的精靈',
        award: ['波克基古之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只蟲和毒系的精靈',
        award: ['波克基古之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只一般和妖精系的精靈',
        award: ['波克基古之笛', '金幣12000'],
        level: 'epic',
        checkWord: false,
    },
    {
        work: '捕捉4只電和鋼系的精靈',
        award: ['波克基古之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只蟲和飛行系的精靈',
        award: ['阿勃梭魯之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只草和超能力系的精靈',
        award: ['阿勃梭魯之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只一般和飛行系的精靈',
        award: ['阿勃梭魯之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '捕捉4只岩石和地面系的精靈',
        award: ['阿勃梭魯之笛', '金幣12000'],
        level: 'epic',
    },
    {
        work: '進化12次精靈',
        award: ['GEN3史詩之笛', '金幣3600'],
        level: 'epic',
    },
    {
        work: '使用1次全滿藥',
        award: ['胡地之笛', '金幣19200'],
        level: 'rare',
    },
    {
        work: '使用2次活力碎片',
        award: ['胡地之笛', '金幣19200'],
        level: 'rare',
    },
    {
        work: '使用8次萬靈藥',
        award: ['胡地之笛', '金幣19200'],
        level: 'rare',
    },
    {
        work: '使用2次聖灰',
        award: ['斗笠菇之笛', '金幣19200'],
        level: 'rare',
    },
    {
        work: '使用2次活力塊',
        award: ['差不多娃娃之笛', '金幣19200'],
        level: 'rare',
    },
    {
        work: '提升1次蟲系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次草系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次電系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次地面系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次岩石系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次幽靈系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次妖精系精靈的品階',
        award: ['禦三家之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次毒系精靈的品階',
        award: ['GEN2傳說之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次鋼系精靈的品階',
        award: ['GEN2傳說之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次火系精靈的品階',
        award: ['GEN2傳說之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次超能力系精靈的品階',
        award: ['GEN2傳說之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次水系精靈的品階',
        award: ['GEN3史詩之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次飛行系精靈的品階',
        award: ['GEN3史詩之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次一般系精靈的品階',
        award: ['GEN3史詩之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次龍系精靈的品階',
        award: ['GEN3史詩之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次冰系精靈的品階',
        award: ['GEN3史詩之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次惡系精靈的品階',
        award: ['GEN1稀有之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '提升1次格鬥系精靈的品階',
        award: ['GEN1稀有之笛', '金幣14400'],
        level: 'rare',
    },
    {
        work: '使用5次解毒藥',
        award: ['禦三家之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '使用5次努力之羽',
        award: ['GEN2傳說之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '使用2次全複藥',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '使用5次解凍藥',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '使用5次解麻藥',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '使用5次解眠藥',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '使用5次灼傷藥',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'rare',
    },
    {
        work: '捕捉50只精靈',
        award: ['GEN1稀有之笛', '金幣4200'],
        level: 'rare',
    },
    {
        work: '擊敗8次道館館主',
        award: ['GEN3史詩之笛', '金幣3600'],
        level: 'rare',
    },
    {
        work: '進化8次精靈',
        award: ['GEN3史詩之笛', '金幣3600'],
        level: 'rare',
    },
    {
        work: '進化5次精靈',
        award: ['金幣1500'],
        level: 'rare',
    },
    {
        work: '使用10次命中強化',
        award: ['禦三家之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用15次傷藥',
        award: ['禦三家之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用3次努力增強劑',
        award: ['GEN2傳說之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用5次厲害傷藥',
        award: ['GEN2傳說之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次好傷藥',
        award: ['GEN2傳說之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次要害攻擊',
        award: ['GEN2傳說之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次能力防守',
        award: ['GEN2傳說之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次特攻強化',
        award: ['GEN3史詩之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次特防強化',
        award: ['GEN3史詩之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次速度強化',
        award: ['GEN3史詩之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次性格轉換蜜',
        award: ['GEN1史詩之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次力量強化',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '使用10次防禦強化',
        award: ['GEN1稀有之笛', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次毒系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次火系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次水系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次草系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次電系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次冰系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次一般系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次格鬥系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次地面系的精靈',
        award: ['阿羅拉貓老大碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次蟲系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次鋼系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次龍系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次惡系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次飛行系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次岩石系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次幽靈系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次妖精系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '進化3次超能力系的精靈',
        award: ['阿羅拉喵喵碎片*2', '金幣9600'],
        level: 'great',
    },
    {
        work: '捕捉5只毒系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只蟲系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只鋼系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只火系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只水系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只草系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只電系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只冰系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只龍系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只惡系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只一般系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只格鬥系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只飛行系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只地面系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只岩石系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只幽靈系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只妖精系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '捕捉5只超能力系的精靈',
        award: ['阿羅拉穿山王碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次毒和飛行系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次蟲和毒系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次蟲和飛行系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次草和毒系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次草和超能力系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次電和鋼系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次一般和飛行系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次一般和妖精系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次岩石和水系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '擊敗4次岩石和地面系的精靈',
        award: ['阿羅拉穿山鼠碎片*2', '金幣6000'],
        level: 'great',
    },
    {
        work: '將電和鋼系的精靈，提升10級',
        award: ['阿羅拉九尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將毒和飛行系的精靈，提升10級',
        award: ['阿羅拉九尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將岩石和水系的精靈，提升10級',
        award: ['阿羅拉九尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將岩石和地面系的精靈，提升10級',
        award: ['阿羅拉九尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將蟲和毒系的精靈，提升10級',
        award: ['阿羅拉六尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將草和毒系的精靈，提升10級',
        award: ['阿羅拉六尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將蟲和飛行系的精靈，提升10級',
        award: ['阿羅拉六尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將草和超能力系的精靈，提升10級',
        award: ['阿羅拉六尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將一般和飛行系的精靈，提升10級',
        award: ['阿羅拉六尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '將一般和妖精系的精靈，提升10級',
        award: ['阿羅拉六尾碎片*2', '金幣3600'],
        level: 'great',
    },
    {
        work: '使用50次高級球捕捉精靈',
        award: ['金幣4000'],
        level: 'great',
    },
    { work: '捕捉30只精靈', award: ['金幣1750'], level: 'great' },
    { work: '擊敗6次道館館主', award: ['金幣1500'], level: 'great' },
    {
        work: '使用100次精靈球捕捉精靈',
        award: ['GEN1稀有之笛', '金幣4000'],
        level: 'normal',
    },
    { work: '使用80次超級球捕捉精靈', award: ['金幣4000'], level: 'normal' },
    { work: '使用10次神奇糖果(大)', award: ['金幣4000'], level: 'normal' },
    { work: '使用30次神奇糖果(中)', award: ['金幣4000'], level: 'normal' },
    { work: '使用50次神奇糖果(小)', award: ['金幣4000'], level: 'normal' },
    { work: '使用3次體力飲料', award: ['金幣4000'], level: 'normal' },
    { work: '使用1次可達鴨噴壺', award: ['金幣4000'], level: 'normal' },
    { work: '使用5次相遇碰碰', award: ['金幣4000'], level: 'normal' },
    { work: '使用10次誘捕噴霧', award: ['金幣4000'], level: 'normal' },
    {
        work: '擊敗5次毒系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次火系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次水系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次草系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次電系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次冰系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次一般系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次格鬥系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    {
        work: '擊敗5次地面系的精靈',
        award: ['進階石碎片', '金幣2500'],
        level: 'normal',
    },
    { work: '擊敗5次蟲系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次鋼系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次龍系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次惡系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次飛行系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次岩石系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次幽靈系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次妖精系的精靈', award: ['金幣2500'], level: 'normal' },
    { work: '擊敗5次超能力系的精靈', award: ['金幣2500'], level: 'normal' },
    {
        work: '將毒系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將火系的精靈,提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將水系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將草系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將電系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將冰系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將一般系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將格鬥系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    {
        work: '將地面系的精靈，提升10級',
        award: ['進階石碎片', '金幣1500'],
        level: 'normal',
    },
    { work: '將蟲系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將鋼系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將龍系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將惡系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將飛行系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將岩石系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將幽靈系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    { work: '將妖精系的精靈，提升10級', award: ['金幣1500'], level: 'normal' },
    {
        work: '將超能力系的精靈，提升10級',
        award: ['金幣1500'],
        level: 'normal',
    },
    { work: '捕捉25只精靈', award: ['金幣1750'], level: 'normal' },
    { work: '捕捉20只精靈', award: ['金幣1750'], level: 'normal' },
    { work: '捕捉15只精靈', award: ['金幣1750'], level: 'normal' },
    { work: '捕捉10只精靈', award: ['金幣1750'], level: 'normal' },
    { work: '捕捉5只精靈', award: ['金幣1750'], level: 'normal' },
    { work: '進化2次精靈', award: ['金幣1500'], level: 'normal' },
    { work: '擊敗2次道館館主', award: ['金幣1500'], level: 'normal' },
    { work: '擊敗4次道館館主', award: ['金幣1500'], level: 'normal' },
]
const day7awards = {
    超越: [
        '閃電鳥之笛',
        '火焰鳥之笛',
        '雷公之笛',
        '水君之笛',
        '炎帝之笛',
        '凱路迪歐之笛',
        '雷吉洛克之笛',
        '由克希之笛',
    ],
    傳說: [
        '暴鯉龍之笛*2',
        '加熱洛托姆之笛*2',
        '結冰洛托姆之笛*2',
        '旋轉洛托姆之笛*2',
        '偶像皮卡丘之笛*2',
        '博士皮卡丘之笛*2',
        '面罩摔角手皮卡丘之笛*2',
        '貴婦皮卡丘之笛*2',
        '霏歐納之笛',
        '波克基斯之笛',
        '化石翼龍之笛',
    ],
    史詩: ['阿羅拉雷丘之笛*5', '阿羅拉隆隆岩之笛*5', '阿羅拉隆隆岩之笛*4'],
    稀有: ['阿羅拉三地鼠之笛*5', '阿羅拉貓老大之笛*5', '阿羅拉臭泥之笛*5', '阿羅拉嘎啦嘎啦之笛*5'],
    普通: ['阿羅拉六尾之笛*5', '阿羅拉六尾之笛*3'],
}
const selectAward = ref('')
const awards = computed(() => {
    const awardSet = new Set()
    table.forEach((item) => {
        if (item.award.length !== 0) {
            item.award.forEach(awardSet.add, awardSet)
        }
    })
    const awards = [...awardSet]
    return awards.sort()
})
const filterItems = computed(() => {
    if (selectAward.value === '') return table
    return table.filter((item) => item.award.includes(selectAward.value))
})
</script>

<template>
    <main>
        <div class="page-title">田野調查</div>
        <div class="note">
            <ul>
                <li>每天可至各大城鎮精靈中心右上角的小姐姐領取任務</li>
                <li>一個精靈中心只能領取一個任務，一天最多做兩個任務</li>
                <li>每個任務完成後都有對應的獎賞，可依照想要的獎賞選擇任務</li>
                <li>一週內每天都做滿兩個任務，共14個任務，可再領取最終獎勵笛子</li>
                <li>
                    最終獎勵笛子的品質其實會依照做過的14個任務總分來發放，總分越高獎勵越好，如果都做黃色任務，大機率會領到超越笛子，如果都做白色任務，就只會拿到普通笛子
                </li>
                <li>任務分數高至低: 黃 > 紫 > 藍 > 綠 > 白</li>
                <li>GEN3稀有之笛田野任務沒有哦~要開日常寶箱1抽</li>
            </ul>
        </div>
        <div class="day7">
            <div>連續7天完成任務已知獎勵:</div>
            <table>
                <tbody>
                    <tr v-for="(dayAwards, key) in day7awards" :key="key">
                        <td class="min-w-[40px]">{{ key }}</td>
                        <td>{{ dayAwards.join('、') }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        任務篩選:
        <select
            v-model="selectAward"
            class="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
            <option :value="''">-請選擇獎勵-</option>
            <option v-for="award in awards" :key="award" :value="award">
                {{ award }}
            </option>
        </select>
        <table>
            <tbody>
                <tr>
                    <td>任務</td>
                    <td>獎賞</td>
                </tr>
                <tr v-for="item in filterItems" :key="item.work" :class="item.level">
                    <td>{{ item.work }}</td>
                    <td>{{ item.award.join('、') }}{{ item.checkAward == false ? '.' : '' }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>
<style scoped>
table {
    margin-top: 8px;
    font-size: 14px;
    /* border-collapse: collapse; */
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    border-radius: 8px;
}
table tr {
    /* border-bottom: 1px solid rgb(177, 177, 177); */
}
td {
    padding: 4px;
    border-bottom: 1px solid rgb(177, 177, 177);
}
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
.legend {
    background: rgb(255, 255, 150);
    /* background: linear-gradient(to right, #feffdb 5%, #f8ff36e1 100%);
    border-left: 7px solid yellow;
    border-right: 7px solid yellow; */
}
.epic {
    background: rgb(201, 150, 255);
    /* background: linear-gradient(to right, #ffdbff 5%, #ff36f8e1 100%);
    border-left: 7px solid rgb(192, 0, 192);
    border-right: 7px solid rgb(192, 0, 192); */
}
.rare {
    background: rgb(111, 255, 255);
    /* border-left: 7px solid rgb(46, 57, 255); */
}
.great {
    background: rgb(150, 255, 164);
    /* border-left: 7px solid rgb(150, 255, 164); */
}
.day7 {
    padding: 8px;
    /* border: 1px solid gray;*/
    /* background: pink; */
    /* border-radius: 8px; */
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
</style>
