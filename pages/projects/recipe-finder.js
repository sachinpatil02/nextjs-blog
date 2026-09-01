import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './recipe-finder.module.css'

const categories = ['All', 'Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian']

export default function RecipeFinder() {
  const [recipes, setRecipes] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { searchRecipes('') }, [])

  async function searchRecipes(searchTerm) {
    setLoading(true)
    setError('')
    try {
      const endpoint = searchTerm ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}` : 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      const response = await fetch(endpoint)
      const data = await response.json()
      setRecipes(data.meals || [])
    } catch (requestError) { setError('The recipe service is unavailable right now.') }
    finally { setLoading(false) }
  }

  function submitSearch(event) { event.preventDefault(); searchRecipes(query) }
  const visibleRecipes = category === 'All' ? recipes : recipes.filter(recipe => recipe.strCategory === category)

  return (
    <>
      <Head><title>Recipe Finder | Sachin Patil</title><meta name="description" content="Search recipes from TheMealDB API." /></Head>
      <div className={styles.app}>
        <header className={styles.header}><Link href="/projects" className={styles.back}>← Projects</Link><span className={styles.brand}><span>SP</span> Recipe finder</span><span className={styles.source}>Powered by TheMealDB</span></header>
        <main className={styles.shell}>
          <section className={styles.hero}><p className={styles.eyebrow}>External API / Discovery</p><h1>Find something<br /><em>delicious.</em></h1><p>Search a live recipe collection, filter by category, and save an idea for your next meal.</p><form className={styles.search} onSubmit={submitSearch}><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search chicken, pasta, curry..." aria-label="Search recipes" /><button type="submit">Search <span>↗</span></button></form></section>
          <section className={styles.results}><div className={styles.resultsHeading}><div><p className={styles.eyebrow}>01 / Browse</p><h2>{query ? `Results for “${query}”` : 'Popular recipes'}</h2></div><div className={styles.filters}>{categories.map(item => <button className={category === item ? styles.active : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div></div>{loading && <p className={styles.message}>Finding recipes...</p>}{error && <p className={styles.message}>{error}</p>}{!loading && !error && <div className={styles.grid}>{visibleRecipes.map(recipe => <article className={styles.card} key={recipe.idMeal}><img src={recipe.strMealThumb} alt="" /><div className={styles.cardBody}><div><span>{recipe.strCategory}</span><h3>{recipe.strMeal}</h3></div><a href={recipe.strYoutube || `https://www.themealdb.com/meal.php?c=${recipe.idMeal}`} target="_blank" rel="noreferrer" aria-label={`View ${recipe.strMeal}`}>↗</a></div></article>)}</div>}{!loading && !error && visibleRecipes.length === 0 && <p className={styles.message}>No recipes found in this category.</p>}</section>
        </main>
        <footer className={styles.footer}><Link href="/projects">← All projects</Link><span>Live data from TheMealDB</span></footer>
      </div>
    </>
  )
}
