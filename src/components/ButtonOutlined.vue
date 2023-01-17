<script setup lang="ts">
defineProps<{
  icon: Function
}>()
</script>

<template>
    <button
        class="flex items-center rounded-md border border-gray-400 py-2 px-4 transition hover:bg-white hover:bg-opacity-5 text-slate-100"
    >
        <component :is="icon" v-if="icon" class="mr-3 inline-block h-5 w-5" />

        <slot />
    </button>
</template>
