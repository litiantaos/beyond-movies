<template>
  <div class="flex h-full w-full flex-col p-5 pt-24 md:px-20 md:pb-16 md:pt-32">
    <div
      class="flex w-full flex-none items-center gap-4 overflow-hidden rounded-md bg-slate-600 px-4 text-white"
    >
      <input
        v-model="input"
        type="text"
        placeholder="Search Movie, TV Show, Person"
        autofocus
        @keyup.enter="submit"
        class="h-12 flex-1 bg-inherit focus:outline-none"
      />

      <div
        v-if="loading"
        class="ri-loader-4-line flex-none animate-spin text-xl"
      ></div>
    </div>

    <div v-if="total" class="mt-5 flex justify-between text-slate-300">
      <div class="flex select-none gap-6">
        <div
          v-for="(item, index) in types"
          @click="onType(index)"
          class="cursor-pointer"
        >
          <div :class="{ 'text-slate-100': index === currentType }">
            {{ item.title }}
          </div>
          <div
            v-if="index === currentType"
            class="h-1 w-full bg-slate-300"
          ></div>
        </div>
      </div>
      <div>{{ total }} Results</div>
    </div>

    <div
      v-if="!results.length"
      class="flex flex-1 items-center justify-center text-lg text-slate-200"
    >
      Enjoy Search!
    </div>

    <div
      v-else
      @scroll="onScroll"
      class="no-scrollbar mt-5 grid w-full flex-1 grid-cols-2 gap-4 overflow-y-scroll md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
    >
      <div
        v-for="res in results"
        @click="toMedia(res.id)"
        class="aspect-[10/16] cursor-pointer"
      >
        <img
          :src="
            res.poster_path
              ? tmdbImgUrl + res.poster_path
              : res.profile_path
                ? tmdbImgUrl + res.profile_path
                : '/default.svg'
          "
          class="h-full w-full rounded-md object-cover"
        />
        <div
          v-if="res.title || res.name"
          class="mt-2 text-center leading-5 text-white"
        >
          {{ res.title || res.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const input = ref(route.query.query || '')

const total = ref(null)
const results = ref([])

const types = [
  {
    title: 'Movies',
    type: 'movie',
  },
  {
    title: 'TV Shows',
    type: 'tv',
  },
  {
    title: 'People',
    type: 'person',
  },
]

const currentType = ref(0)
const currentPage = ref(1)

const loading = ref(false)

const fetch = async ({ type = 'movie' } = {}) => {
  loading.value = true

  try {
    const { data } = await useFetch(`/api/fetch/search/${type}`, {
      query: {
        query: input.value,
        page: currentPage.value,
      },
    })

    total.value = data.value.total_results

    results.value.push(...data.value.results)

    loading.value = false
  } catch (error) {
    console.log(error)
  }
}

if (input.value) {
  await fetch()
}

const reset = () => {
  results.value = []
  currentPage.value = 1
}

const onType = (index) => {
  currentType.value = index

  reset()

  fetch(types[index])
}

const submit = throttle(async () => {
  if (!input.value) return

  navigateTo(`/search?query=${input.value}`, {
    replace: true,
  })

  reset()

  fetch()
}, 1500)

const toMedia = (id) => {
  navigateTo(`/${types[currentType.value].type}/${id}`)
}

const onScroll = (e) => {
  const el = e.target

  if (el.scrollTop + el.clientHeight + 1 >= el.scrollHeight) {
    if (results.value.length === total.value) return
    currentPage.value++
    throttle(fetch(types[currentType.value]), 1500)
  }
}

useHead({
  title: computed(() => `Search: ${input.value}`),
})
</script>
