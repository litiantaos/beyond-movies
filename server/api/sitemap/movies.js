export default defineSitemapEventHandler(() => {
  let movies = []

  for (let i = 1; i <= 1249467; i++) {
    movies.push({
      loc: `/movie/${i}`,
    })
  }

  return movies
})
