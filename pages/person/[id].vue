<template>
  <div class="flex h-full w-full flex-col text-white md:flex-row md:gap-20">
    <div class="relative h-[50%] w-full flex-none md:h-full md:w-[50%]">
      <PersonCarousel :items="imagePaths" class="h-full w-full md:h-full" />
      <div
        class="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-[rgba(0,0,0,.6)] to-[rgba(0,0,0,0)] md:h-64"
      ></div>
    </div>

    <div
      class="flex h-[50%] w-full flex-col p-5 md:h-full md:flex-1 md:pb-16 md:pl-0 md:pr-20 md:pt-28"
    >
      <div class="flex-none text-2xl font-bold md:text-4xl">
        {{ person.name }}
      </div>

      <div class="mt-3 flex-none md:mt-5">
        <span class="mr-5">{{ person.birthday }}</span>
        <span>{{ person.place_of_birth }}</span>
      </div>

      <div class="no-scrollbar mt-3 flex-1 overflow-y-scroll md:mt-5">
        <div v-if="person.biography">
          <div
            @click="() => (isExpand = !isExpand)"
            :class="{ 'line-clamp': !isExpand }"
            class="cursor-pointer font-light leading-7 text-gray-200"
          >
            {{ person.biography }}
          </div>
        </div>

        <PersonCredits v-if="casts.length" title="Acting" :items="casts" />

        <PersonCredits v-if="crews.length" title="Production" :items="crews" />
      </div>
    </div>
  </div>
</template>

<script setup>
const id = useRoute().params.id

const { data: person } = await useFetch(`/api/fetch/person/${id}`)

const { data: credits } = await useFetch(
  `/api/fetch/person/${id}/movie_credits`,
)

const casts = credits.value.cast
  .filter((t) => t.release_date != '')
  .sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date)
  })

const crews = credits.value.crew
  .filter((t) => t.release_date != '')
  .sort((a, b) => {
    return new Date(b.release_date) - new Date(a.release_date)
  })

const { data: images } = await useFetch(`/api/fetch/person/${id}/images`)

const imagePaths = images.value.profiles.map((image) => {
  return image?.file_path
})

// console.log(imagePaths);

const isExpand = ref(false)

useHead({
  title: person.value.name,
  meta: [
    {
      name: 'description',
      content: person.value.biography || person.value.name,
    },
    {
      property: 'og:image',
      content: tmdbImgUrl + person.value.profile_path,
    },
  ],
})
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
