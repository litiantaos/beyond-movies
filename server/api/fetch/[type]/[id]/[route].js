export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const { type, id, route } = event.context.params
  const query = getQuery(event)

  const res = await $fetch(`/${type}/${id}/${route}`, {
    baseURL: config.public.tmdbUrl,
    headers: {
      Authorization: `Bearer ${config.tmdbToken}`,
    },
    query,
  })

  return res
})
