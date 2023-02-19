<template>
   <button>
      <slot />
   </button>
</template>
<style lang="scss" scoped>
button {
   padding: 9px;
   font-size: 14px;
   color: var(--txt-1);
   border-radius: 8px;
   cursor: pointer;
   display: flex;
   flex-flow: row nowrap;
   align-items: center;
   justify-content: center;
   background-color: var(--bg-1);
   display: flex;
   gap: 5px;
   transition: background-color 150ms;

   &:hover {
      background-color: var(--bg-2);
   }

   &.text {
      padding: 9px;
      width: 210px;
      background-color: var(--blue-1);
      color: var(--txt-1);
      font-weight: 500;

      &:hover {
         background-color: var(--bg-5);
      }
   }

   &.icon {
      &:deep(img) {
         width: 30px;
         transform: translateY(1px);

         @media (prefers-color-scheme: dark) {
            filter: invert(1);
         }
      }
   }
}
</style>
