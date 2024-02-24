export default defineSitemapEventHandler(() => {
  let movies = []
  let tvs = []

  for (let i = 1; i <= 1249467; i++) {
    movies.push({
      loc: `/movie/${i}`,
    })
  }

  for (let i = 1; i <= 247278; i++) {
    tvs.push({
      loc: `/tv/${i}`,
    })
  }

  return [...movies, ...tvs]
})
