export default defineSitemapEventHandler(() => {
  let tvs = []

  for (let i = 1; i <= 247278; i++) {
    tvs.push({
      loc: `/tv/${i}`,
    })
  }

  return tvs
})
