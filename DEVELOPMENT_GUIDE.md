# 開發指南

> 本文件說明本專案的開發規範與程式存取作法，請所有開發者遵循此指南以保持程式碼一致性。

## 目錄

-   [專案結構](#專案結構)
-   [Composables 使用規範](#composables-使用規範)
-   [組件開發規範](#組件開發規範)
-   [狀態管理規範](#狀態管理規範)
-   [命名規則](#命名規則)
-   [資料存取規範](#資料存取規範)

## 專案結構

```
nuxt-app/
├── assets/          # 靜態資源（CSS、圖片、JSON 資料）
├── components/      # Vue 組件
├── composables/     # Composable 函數（可重用邏輯）
├── layouts/         # 版面配置
├── pages/           # 頁面路由
├── plugins/         # Nuxt 插件
├── stores/          # Pinia 狀態管理
├── locales/         # 多語言檔案
└── public/          # 公開靜態資源
```

## Composables 使用規範

### 命名規則

-   Composable 檔案名稱使用 `use` 開頭，採用駝峰式命名
-   範例：`usePokeTypes.js`、`useMyRouter.js`、`useCommons.js`

### 匯出方式

所有 composables 必須使用預設匯出（default export）：

```javascript
// ✅ 正確
export default function () {
    // composable 邏輯
    return {
        // 返回的屬性和方法
    }
}

// ❌ 錯誤
export const useExample = () => { ... }
```

### 使用方式

在組件或頁面中使用 composable：

```javascript
// 在 script setup 中
const { typeTwToEn, typeEnToTw, getTypeColors } = usePokeTypes()
```

### 現有 Composables 說明

| Composable       | 用途           | 主要功能                         |
| ---------------- | -------------- | -------------------------------- |
| `usePokeTypes`   | 寶可夢屬性相關 | 屬性轉換、屬性顏色、攻擊倍率計算 |
| `usePokemonI18n` | 寶可夢多語言   | 名稱翻譯、語言轉換               |
| `useApi`         | API 請求       | 統一的 API 呼叫介面              |
| `useCommons`     | 通用函數       | 共用的工具函數                   |
| `useMyRouter`    | 路由處理       | 路由導航相關功能                 |
| `usePokeSource`  | 寶可夢資料來源 | 資料載入和快取                   |
| `useGradeCard`   | 評級卡片       | 卡片相關邏輯                     |
| `useHeldItem`    | 持有物品       | 物品相關邏輯                     |

## 組件開發規範

### 組件命名

-   組件檔案名稱使用大駝峰式（PascalCase）
-   範例：`PokeCard.vue`、`TypeIcon.vue`、`AbilityCard.vue`

### 組件結構

```vue
<template>
    <!-- 模板內容 -->
</template>

<script setup>
// 引入 composables
// 定義 props
// 定義 emits
// 組件邏輯
</script>

<style scoped>
/* 組件樣式 */
</style>
```

### Props 定義

使用 TypeScript 或詳細的 props 定義：

```javascript
const props = defineProps({
    type: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: 'medium',
    },
})
```

## 狀態管理規範

### Store 檔案命名

-   使用 Pinia 進行狀態管理
-   檔案名稱使用小寫加連字號
-   範例：`poke-card.js`、`alert.js`

### Store 結構

```javascript
import { defineStore } from 'pinia'

export const useXxxStore = defineStore('xxx', {
    state: () => ({
        // 狀態定義
    }),

    getters: {
        // 計算屬性
    },

    actions: {
        // 方法
    },
})
```

## 命名規則

### 變數命名

-   使用駝峰式命名（camelCase）
-   常數使用全大寫加底線（CONSTANT_CASE）
-   布林值變數加上 `is`、`has`、`should` 等前綴

```javascript
// ✅ 正確
const pokemonName = 'Pikachu'
const isVisible = true
const hasAbility = false
const MAX_LEVEL = 100

// ❌ 錯誤
const PokemonName = 'Pikachu'
const visible = true
const max_level = 100
```

### 函數命名

-   使用動詞開頭的駝峰式命名
-   範例：`getTypeColors`、`calculateDamage`、`fetchPokemonData`

## 資料存取規範

### 靜態 JSON 資料

專案中的 JSON 資料位於 `assets/json/` 目錄：

```javascript
// 透過 composable 或直接引入
import pokedex from '~/assets/json/pokedex.json'
import moves from '~/assets/json/moves.json'
```

### API 呼叫

使用 `useApi` composable 進行 API 呼叫：

```javascript
const { fetchData } = useApi()

// 範例
const data = await fetchData('/api/endpoint')
```

### 多語言資料存取

使用 Nuxt i18n：

```javascript
const { t, locale } = useI18n()

// 取得翻譯
const text = t('key.path')

// 切換語言
locale.value = 'en'
```

## 屬性轉換規範

使用 `usePokeTypes` 進行屬性名稱轉換：

```javascript
const { typeTwToEn, typeEnToTw } = usePokeTypes()

// 中文轉英文
const englishType = typeTwToEn['火'] // 'fire'

// 英文轉中文
const chineseType = typeEnToTw['fire'] // '火'
```

## 程式碼風格

### 縮排與格式

-   使用 4 個空格縮排（非 Tab）
-   物件和陣列的最後一個元素後面加上逗號

```javascript
// ✅ 正確
const types = {
    fire: '火',
    water: '水',
    grass: '草',
}

// ❌ 錯誤
const types = {
    fire: '火',
    water: '水',
    grass: '草',
}
```

### 引號使用

-   優先使用單引號 `'`
-   模板字串使用反引號 `` ` ``

---

## 待補充項目

以下項目待後續補充：

-   [ ] API 端點說明
-   [ ] 測試規範
-   [ ] 部署流程
-   [ ] 效能優化指南
-   [ ] 錯誤處理規範
-   [ ] 組件通訊模式
-   [ ] 表單驗證規範
-   [ ] 圖片資源管理

---

**最後更新：** 2026-02-02
**維護者：** 開發團隊
