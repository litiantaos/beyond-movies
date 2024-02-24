<template>
  <div class="mt-7">
    <div class="mb-5 text-3xl font-medium">{{ title }}</div>

    <NuxtLink
      v-for="item in items"
      :to="`/movie/${item.id}`"
      class="mb-2 flex cursor-pointer rounded-md bg-[rgba(255,255,255,.1)] px-5 py-2 leading-6 hover:bg-[rgba(255,255,255,.15)]"
    >
      <div class="w-16 flex-none">{{ formatYear(item.release_date) }}</div>

      <div>
        <div class="font-medium">
          {{ item.title }}
        </div>

        <div v-if="item.character || item.job">
          <span v-if="item.character" class="mr-2 text-gray-300">as</span>
          <span>{{ item.character || item.job }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  items: null,
  title: 'Title',
})
</script>
