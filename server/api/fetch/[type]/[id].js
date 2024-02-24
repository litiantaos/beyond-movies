export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const { type, id } = event.context.params
  const query = getQuery(event)

  const res = await $fetch(`/${type}/${id}`, {
    baseURL: config.public.tmdbUrl,
    headers: {
      Authorization: `Bearer ${config.tmdbToken}`,
    },
    query,
  })

  return res
})
