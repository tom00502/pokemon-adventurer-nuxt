import { computed } from 'vue'

export default function () {
    const { locale } = useI18n()
    const moveCategories = [
        { en: 'physical', tw: '物理' },
        { en: 'special', tw: '特殊' },
        { en: 'status', tw: '變化' },
    ]
    const moveCategoryTwToEn = {
        物理: 'physical',
        特殊: 'special',
        變化: 'status',
    }
    const localeMoveCategories = computed(() => {
        if (locale.value === 'en') {
            return moveCategories.map((category) => category.en)
        }
        return moveCategories.map((category) => category.tw)
    })
    return {
        moveCategories,
        moveCategoryTwToEn,
        localeMoveCategories,
    }
}
