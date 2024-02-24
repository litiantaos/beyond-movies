<template>
  <div class="relative h-full w-full overflow-hidden">
    <img
      :src="items.length ? tmdbImgUrl + items[current] : '/default.svg'"
      class="h-full w-full object-cover"
    />

    <div
      class="absolute bottom-10 left-[50%] flex h-10 w-24 -translate-x-[50%] justify-around gap-3 rounded-full bg-[rgba(0,0,0,.2)] px-4 text-lg backdrop-blur-md"
    >
      <button @click="prev" class="ri-arrow-left-line button"></button>
      <button @click="next" class="ri-arrow-right-line button"></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: null,
})

const current = ref(0)

const next = () => {
  if (current.value === props.items.length - 1) {
    current.value = 0
  } else {
    current.value++
  }
}

const prev = () => {
  if (current.value === 0) {
    current.value = props.items.length - 1
  } else {
    current.value--
  }
}
</script>

<style>
.button {
  @apply transition-transform duration-300 hover:scale-125;
}
</style>
