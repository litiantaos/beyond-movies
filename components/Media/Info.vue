<template>
  <div class="flex flex-col gap-5 text-white">
    <div
      class="font-semibold"
      :class="small ? 'text-2xl md:text-4xl' : 'text-4xl md:text-7xl'"
    >
      {{ item.title }}
    </div>

    <div class="flex items-center">
      <div>{{ formatYear(item.release_date || item.first_air_date) }}</div>

      <div>
        <span class="mx-3 font-bold text-slate-400">｜</span>
        <i class="ri-sparkling-line mr-1"></i>
        {{ formatRating(item.vote_average) }}
      </div>

      <div v-if="item.runtime">
        <span class="mx-3 font-bold text-slate-400">｜</span>
        <i class="ri-timer-2-line mr-1"></i>
        {{ formatTime(item.runtime) }}
      </div>

      <div v-if="item.original_title != item.title">
        <span class="mx-3 font-bold text-slate-400">｜</span>
        {{ item.original_title }}
      </div>
    </div>

    <div v-if="item.genres?.length" class="flex gap-2">
      <div
        v-for="t in item.genres"
        class="rounded bg-slate-600 px-2 py-[2px] text-sm text-slate-100"
      >
        {{ t.name }}
      </div>
    </div>

    <div class="font-light text-gray-300">
      {{ item.overview }}
    </div>

    <div v-if="item.directors?.length">
      <div class="text-sm font-light text-gray-300">Director</div>
      <div class="flex gap-10">
        <div v-for="t in item.directors">{{ t.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: null,
  small: false,
})
</script>
