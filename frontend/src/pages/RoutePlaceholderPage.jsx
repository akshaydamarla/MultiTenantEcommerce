function RoutePlaceholderPage({ title, description }) {
  return (
    <section className="route-placeholder" aria-labelledby="route-placeholder-heading">
      <p className="eyebrow">MarketGrid</p>
      <h1 id="route-placeholder-heading">{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export default RoutePlaceholderPage