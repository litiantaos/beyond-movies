<template>
  <div v-if="media" class="h-full w-full">
    <img
      v-if="media.backdrop_path"
      :src="tmdbImgUrl + media.backdrop_path"
      class="absolute h-full w-full object-cover transition-opacity duration-[.4s]"
    />

    <div
      class="absolute flex h-full w-full flex-col justify-end bg-gradient-to-r from-[rgba(0,0,0,.9)] to-[rgba(0,0,0,.7)] px-5 pb-5 pt-24 md:px-20 md:py-12"
    >
      <div class="no-scrollbar max-h-[calc(100%-200px)] overflow-y-scroll">
        <div class="md:flex">
          <img
            :src="tmdbImgUrl + media.poster_path"
            class="mb-5 h-40 w-28 rounded-md object-cover md:mb-0 md:mr-10 md:h-[300px] md:w-[200px]"
          />

          <MediaInfo :item="media" :small="true" />
        </div>

        <div class="no-scrollbar mt-10 flex gap-6 overflow-x-scroll">
          <div
            v-for="cast in casts"
            @click="toPerson(cast.id)"
            class="w-28 flex-none cursor-pointer text-sm text-white"
          >
            <div class="h-40 w-full">
              <img
                :src="
                  cast.profile_path
                    ? tmdbImgUrl + cast.profile_path
                    : '/default.svg'
                "
                class="h-full w-full rounded-md object-cover"
              />
            </div>
            <div class="mt-2 w-full text-center">
              <p>{{ cast.name }}</p>
              <p class="font-light text-slate-400">
                {{ cast.character }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-5 w-full rounded-md bg-[rgba(100,116,139,.5)] px-5 py-4 text-white"
      >
        <NuxtLink
          :to="
            torrentsUrl +
            media.title +
            '+' +
            formatYear(media.release_date || '') +
            '+1080p+BluRay'
          "
          class="flex w-fit items-center gap-3 hover:text-slate-300"
        >
          <div>GET TORRENTS</div>
          <i class="ri-arrow-right-line text-lg"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { type, id } = useRoute().params

const { data: media } = await useFetch(`/api/fetch/${type}/${id}`)

const { data: credits } = await useFetch(`/api/fetch/${type}/${id}/credits`)

const casts = credits.value.cast.slice(0, 20)

media.value.directors = credits.value.crew.filter(
  (crew) => crew.job === 'Director',
)

const toPerson = (id) => {
  navigateTo(`/person/${id}`)
}

useHead({
  title: media.value.title,
  meta: [
    {
      name: 'description',
      content: media.value.overview,
    },
    {
      property: 'og:image',
      content: tmdbImgUrl + media.value.poster_path,
    },
  ],
})
</script>
