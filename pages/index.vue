<template>
  <div v-if="movies" class="h-full w-full">
    <img
      v-if="movies[currentIndex].backdrop_path"
      :src="tmdbImgUrl + movies[currentIndex].backdrop_path"
      class="absolute h-full w-full object-cover transition-opacity duration-[.4s]"
      :class="{ 'opacity-0': isFade }"
      @load="onImgLoaded"
    />

    <div
      class="absolute flex h-full w-full flex-col justify-end bg-gradient-to-r from-[rgba(0,0,0,.9)] to-[rgba(0,0,0,.7)] p-5 md:px-20 md:py-12"
    >
      <div
        class="flex flex-col gap-5 transition duration-[.4s] md:max-w-[60vw]"
        :class="{ '-translate-y-4 opacity-0': isFade }"
      >
        <NuxtLink
          :to="`/movie/${movies[currentIndex].id}`"
          class="w-fit rounded-full bg-slate-200 px-4 py-1 text-sm text-slate-700 opacity-60 transition-opacity hover:opacity-80"
        >
          Detail
          <i class="ri-arrow-right-line"></i>
        </NuxtLink>

        <MediaInfo :item="movies[currentIndex]" />
      </div>

      <KeepAlive>
        <div class="no-scrollbar mt-10 flex w-full gap-4 overflow-x-scroll">
          <div v-for="(movie, index) in movies">
            <div
              @click="onPoster(index)"
              class="h-36 w-24 flex-none cursor-pointer overflow-hidden rounded-md shadow"
            >
              <img
                :src="tmdbImgUrl + movie.poster_path"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
const { data: movies, error } = await useFetch(`/api/fetch/movie/popular`, {
  query: {
    page: 1,
  },
  transform: (movies) => movies.results,
})

if (error.value) {
  console.log('Fetch Error', error.value)
}

const currentIndex = ref(0)
const isFade = ref(false)

const onImgLoaded = () => {
  isFade.value = false
}

const onPoster = (index) => {
  isFade.value = true

  setTimeout(() => {
    if (currentIndex.value === index) {
      isFade.value = false
    }

    currentIndex.value = index
  }, 420)
}
</script>
