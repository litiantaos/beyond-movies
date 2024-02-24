<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - Beyond Movies`
      : 'Beyond Movies - Movies Database and Torrents'
  },
  meta: [
    {
      name: 'description',
      content:
        'Beyond Movies - Movies, TV Shows, Database, Infomation, Resource, Torrents, Magnets, Free Download',
    },
    {
      name: 'keywords',
      content:
        'Beyond Movies, Torrents, Magnets, Movies, Films, TV Shows, Series, Download, Free',
    },
  ],
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  @apply transition duration-500;
}

.page-enter-from,
.page-leave-to {
  @apply scale-105 opacity-0;
}
</style>
