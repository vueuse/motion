export default eventHandler(async (event) => {
  return queryCollection(event, 'docs').all()
})
