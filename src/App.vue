<script setup lang="ts">
import { reactive, watch } from 'vue'
import CustomButton from '@/components/CustomButton.vue'
import ListLanguages from '@/components/ListLanguages.vue'
import Footer from '@/components/Footer.vue'

async function fetchData() {
   const response = await fetch(
      `/.netlify/functions/getTranslation?text=${state.queryText}&source=${state.sourceLang.code}&target=${state.targetLang.code}`,
   )
   const data = await response.json()

   state.translation = data.data.translatedText
}

function switchLanguages() {
   const current = { source: state.sourceLang, target: state.targetLang }
   state.sourceLang = current.target
   state.targetLang = current.source
}

function chooseLang(lang: { code: string; name: string }) {
   if (state.languageToChoose == 'source') {
      state.sourceLang = lang
   } else if (state.languageToChoose == 'target') {
      state.targetLang = lang
   }
   state.showList = false
}

function handleShowList(langToChoose: string) {
   if (langToChoose == state.languageToChoose) {
      state.showList = !state.showList
   } else if (langToChoose != state.languageToChoose) {
      state.showList = true
      state.languageToChoose = langToChoose
   }
}

const state = reactive({
   sourceLang: { code: 'en', name: 'English' },
   targetLang: { code: 'es', name: 'Spanish' },
   queryText: '',
   translation: '',
   showList: false,
   languageToChoose: 'source',
})

watch(
   () => state.queryText,
   () => {
      state.translation = ''
   },
)
</script>

<template>
   <div class="wrapper">
      <header>Verbify</header>
      <main>
         <div class="topbar">
            <CustomButton class="text icon" @click="handleShowList('source')">
               <span>{{ state.sourceLang.name }}</span>
               <img width="30" height="30" src="@/assets/icons/expand_more_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
            </CustomButton>
            <CustomButton class="icon" @click="switchLanguages()">
               <img
                  width="30"
                  height="30"
                  src="@/assets/icons/compare_arrows_FILL0_wght400_GRAD0_opsz48.svg"
                  alt="switch languages" />
            </CustomButton>
            <CustomButton class="text icon" @click="handleShowList('target')">
               <img width="30" height="30" src="@/assets/icons/expand_more_FILL0_wght400_GRAD0_opsz48.svg" alt="" />
               <span>{{ state.targetLang.name }}</span>
            </CustomButton>
            <ListLanguages
               v-if="state.showList"
               @close="state.showList = false"
               @chooseLang="(lang) => chooseLang(lang)" />
         </div>
         <div class="text-fields-container">
            <form action="." @submit.prevent="fetchData()">
               <textarea class="text-field" v-model="state.queryText" placeholder="Hello world..."></textarea>
            </form>
            <div class="text-field" v-if="state.translation && state.queryText">{{ state.translation }}</div>
            <div class="text-field placeholder" v-else>Translation</div>
            <CustomButton style="width: 100%" class="text icon" @click="fetchData()">
               <span>Translate</span>
               <img
                  width="30"
                  height="30"
                  src="@/assets/icons/language_FILL0_wght300_GRAD0_opsz48.svg"
                  alt="translate" />
            </CustomButton>
         </div>
      </main>
   </div>

   <Footer />
</template>

<style scoped lang="scss">
.wrapper {
   width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
header {
   font-size: 30px;
   padding: 20px;
   background-color: var(--bg-2);
   width: 100%;
   color: var(--txt-1);
}
main {
   width: 100%;
   padding: 10px;
   max-width: 1000px;

   .topbar {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-radius: 10px;
      position: relative;
      gap: 3px;
   }

   .text-fields-container {
      display: grid;
      grid-template-columns: 1fr;
      padding: 10px;
      gap: 20px;

      @media (min-width: 800px) {
         grid-template-columns: repeat(2, 1fr);
      }
   }

   .text-field {
      resize: none;
      background-color: var(--bg-2);
      width: 100%;
      padding: 20px;
      font-size: 20px;
      border-radius: 10px;
      height: 200px;
      color: var(--txt-1);

      &.placeholder {
         color: var(--txt-4);
      }
   }
}
</style>
