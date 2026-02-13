---
name: i18n-guidelines
description: 多國語系(i18n)實作規範。只要需求提到「多國語系 / i18n / 翻譯」就依此執行。
metadata:
    author: github-copilot
    version: '1.0.0'
    argument-hint: <file-or-pattern>
---

# 多國語系(i18n)實作規範

依照現有檔案的做法撰寫與改動，避免引入不一致的語系處理方式。

## 必守原則

1. 僅處理 `en`、`zh`、`ja` 三個語系。
    - 不新增、不使用 `ch`。
    - 若需求寫 `jp`，一律對應到 `ja`。
2. 所有顯示文字必須透過 `t('...')`。
3. `useHead` 中的 `title`、`meta` 內容必須多語系化，使用 `t('...')`。
4. 不硬寫文案，不在元件內放固定語系文字，除非已有分支且明確區分語系。

## 實作參考模式

### Script

-   取得 i18n：
    -   `const { locale, t } = useI18n()`
-   Head 內容：
    -   `useHead({ title: t('...'), meta: [{ name: 'description', content: t('...') }, ...] })`
-   若資料結構是語系索引：
    -   例如 `item.effect[locale]`
    -   要保證 `locale` 的 key 有 `en` / `zh` / `ja`。

### Template

-   所有標題、欄位、按鈕、提示文字：
    -   使用 `{{ t('...') }}`。
-   避免內嵌硬寫文字；必要時用 `v-if="locale === 'en'"` 這類既有模式分支。

### 屬性選擇器 (Type Selector)

-   屬性下拉選單請使用 `usePokeTypes()` 的 `typeOptions`。
-   `typeOptions` 已依 `locale` 產生 `[{ key, name }]`，`name` 為顯示文字，`key` 為型別英文鍵。
-   v-select 必須綁 `label="name"`，以顯示多語系名稱。
-   內部邏輯請使用 `key` 進行計算與比對，避免拿顯示文字來判斷。
-   選取值會是 option 物件（非字串），請避免 `includes` 直接比對字串。

參考寫法：

```js
const { typeOptions } = usePokeTypes()
const selectTypes = ref([])
```

```vue
<v-select
    v-model="selectTypes"
    :options="typeOptions"
    label="name"
    multiple
    :searchable="false"
    :selectable="() => selectTypes.length < 2"
/>
```

```js
// Example: use key for comparison
selectTypes.value.every((option) => poke.types.includes(option.key))
```

### Locale 檔

-   每新增一個 `t('...')`，都要同步新增在：
    -   `locales/en.json`
    -   `locales/zh.json`
    -   `locales/ja.json`
-   不新增 `locales/ch.json`。

## 產出檢查清單

-   [ ] `useHead` 的 `title`、`meta` 已使用 `t('...')`
-   [ ] Template 沒有硬寫文案
-   [ ] 新增的 key 在 `en/zh/ja` 三份檔案都有
-   [ ] 沒有使用 `ch`
