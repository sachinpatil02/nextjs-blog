import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './reviews.module.css'

const starterReviews = [
  { id: 1, title: 'The Bear', kind: 'Movie', rating: 5, comment: 'A sharp, generous story about people trying to make something meaningful.', date: 'June 18, 2024' },
  { id: 2, title: 'Tomorrow, and Tomorrow, and Tomorrow', kind: 'Book', rating: 4, comment: 'Tender, ambitious, and full of complicated creative friendships.', date: 'June 11, 2024' },
  { id: 3, title: 'Perfect Days', kind: 'Movie', rating: 5, comment: 'A quiet film that finds wonder in the shape of an ordinary day.', date: 'May 29, 2024' }
]

export default function Reviews() {
  const [reviews, setReviews] = useState(starterReviews)
  const [form, setForm] = useState({ title: '', kind: 'Movie', rating: '5', comment: '' })
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => { const saved = window.localStorage.getItem('sachin-reviews'); if (saved) setReviews(JSON.parse(saved)) }, [])
  useEffect(() => { window.localStorage.setItem('sachin-reviews', JSON.stringify(reviews)) }, [reviews])
  const visibleReviews = useMemo(() => reviews.filter(review => (filter === 'All' || review.kind === filter) && review.title.toLowerCase().includes(query.toLowerCase())), [reviews, filter, query])

  function submitReview(event) { event.preventDefault(); if (!form.title.trim() || !form.comment.trim()) return; setReviews([{ ...form, id: Date.now(), rating: Number(form.rating), date: 'Just now' }, ...reviews]); setForm({ title: '', kind: 'Movie', rating: '5', comment: '' }) }
  function removeReview(id) { setReviews(reviews.filter(review => review.id !== id)) }
  function stars(rating) { return '★'.repeat(rating) + '☆'.repeat(5 - rating) }

  return (
    <>
      <Head><title>Reviews | Sachin Patil</title><meta name="description" content="A personal movie and book review journal." /></Head>
      <div className={styles.app}>
        <header className={styles.header}><Link href="/projects" className={styles.back}>← Projects</Link><span className={styles.brand}><span>SP</span> Commonplace</span><span className={styles.mode}>Personal journal</span></header>
        <main className={styles.shell}><section className={styles.hero}><div><p className={styles.eyebrow}>Movies + books / Personal archive</p><h1>Things worth<br /><em>returning</em> to.</h1></div><p>A living shelf of stories that stayed with me, plus a space to record what comes next.</p></section>
          <section className={styles.content}><div className={styles.feed}><div className={styles.feedHeading}><div><p className={styles.eyebrow}>01 / The shelf</p><h2>Recent notes</h2></div><div className={styles.filters}>{['All', 'Movie', 'Book'].map(item => <button className={filter === item ? styles.active : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><input className={styles.search} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search the shelf" aria-label="Search reviews" />{visibleReviews.map(review => <article className={styles.review} key={review.id}><div className={styles.reviewMeta}><span>{review.kind}</span><span>{review.date}</span></div><h3>{review.title}</h3><div className={styles.stars} aria-label={`${review.rating} out of 5 stars`}>{stars(review.rating)}</div><p>{review.comment}</p><button className={styles.delete} onClick={() => removeReview(review.id)}>Remove note</button></article>)}</div>
            <form className={styles.form} onSubmit={submitReview}><p className={styles.eyebrow}>02 / Add a note</p><h2>What did you<br /><em>make of it?</em></h2><label>Title<input value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Movie or book title" /></label><label>Format<select value={form.kind} onChange={event => setForm({ ...form, kind: event.target.value })}><option>Movie</option><option>Book</option></select></label><label>Rating<select value={form.rating} onChange={event => setForm({ ...form, rating: event.target.value })}><option value="5">★★★★★ Excellent</option><option value="4">★★★★☆ Great</option><option value="3">★★★☆☆ Good</option><option value="2">★★☆☆☆ Mixed</option><option value="1">★☆☆☆☆ Not for me</option></select></label><label>Your note<textarea value={form.comment} onChange={event => setForm({ ...form, comment: event.target.value })} placeholder="A thought worth keeping..." rows="5" /></label><button type="submit" className={styles.submit}>Save note <span>↗</span></button></form></section></main>
        <footer className={styles.footer}><Link href="/projects">← All projects</Link><span>Saved locally in this browser.</span></footer>
      </div>
    </>
  )
}
