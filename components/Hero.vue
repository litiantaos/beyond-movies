<template>
  <div class="flex items-center justify-between">
    <div>
      <NuxtLink to="/">
        <div
          class="flex select-none items-center font-semibold text-white md:text-xl"
        >
          <div>BEYOND MOVIES</div>
          <div class="mb-[2px] ml-4 font-bold">/</div>
        </div>
      </NuxtLink>

      <img src="/tmdb.svg" class="ml-px mt-2 h-3 md:h-[14px]" />
    </div>

    <Transition name="fade">
      <NuxtLink v-if="path != '/search'" to="/search">
        <div
          class="flex h-8 cursor-pointer select-none items-center justify-center gap-2 rounded-full bg-[rgba(255,255,255,.2)] pl-3 pr-4 text-gray-300"
        >
          <i class="ri-search-2-line"></i>
          <div class="text-sm font-light">Search</div>
        </div>
      </NuxtLink>
    </Transition>
  </div>
</template>

<script setup>
const route = useRoute()
const path = ref(route.path)

watch(
  () => route.path,
  (value) => {
    path.value = value
  },
)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
