<script setup lang="ts"></script>
<template>
   <footer>
      <span>
         This is an open source project stored on
         <a href="https://github.com/PabloBerry44/verbify">Github</a>
         and created by PabloBerry44. Translation provided by
         <a href="https://rapidapi.com/dickyagustin/api/text-translator2">RapidAPI</a>.
      </span>
   </footer>
</template>
<style scoped lang="scss">
footer {
   padding: 20px;
   display: flex;
   flex-flow: column;
   color: var(--txt-4);
   gap: 10px;
   text-align: center;
   font-size: 14px;

   a {
      color: inherit;
   }
}
</style>
