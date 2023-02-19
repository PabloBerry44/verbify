<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguageStore } from '@/stores/languages'
const storeLanguages = useLanguageStore()

const query = ref('')
const filteredLanguages = ref(storeLanguages.languages)

watch(query, () => {
   filteredLanguages.value = storeLanguages.languages.filter((lang) =>
      lang.name.toLowerCase().startsWith(query.value.toLowerCase()),
   )
})
</script>
<template>
   <div class="wrapper" @click.self="$emit('close')">
      <ul>
         <input type="search" placeholder="Search language" v-model="query" />
         <li v-for="(lang, index) in filteredLanguages" :key="index" @click="$emit('chooseLang', lang)">
            {{ lang.name }}
         </li>
      </ul>
   </div>
</template>
<style scoped lang="scss">
.wrapper {
   position: fixed;
   inset: 0;
   width: 100%;
   height: 100vh;
   height: 100dvh;
   z-index: 2;
   backdrop-filter: blur(5px);
   -webkit-backdrop-filter: blur(5px);
   display: flex;
   align-items: center;
   justify-content: center;
}
ul {
   list-style: none;
   display: grid;
   grid-template-columns: 1fr;
   background-color: var(--bg-1);
   width: 100%;
   overflow-y: scroll;
   top: calc(100% + 10px);
   grid-auto-rows: min-content;
   padding: 10px;
   width: 90%;
   height: 80%;
   transform: translateY(-10px);
   scrollbar-width: thin;
   box-shadow: 0px 0px 19px rgba(0, 0, 0, 0.178);
   border-radius: 10px;
   z-index: 3;

   @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
   }
   @media (min-width: 800px) {
      grid-template-columns: repeat(3, 1fr);
   }

   input {
      width: 100%;
      background-color: var(--bg-2);
      padding: 10px;
      font-size: 16px;
      margin-bottom: 15px;
      grid-column: 1 / -1;
      border-radius: 10px;
      color: var(--txt-1);
   }

   li {
      padding: 8px;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
         background-color: var(--bg-2);
      }
   }
}
</style>
