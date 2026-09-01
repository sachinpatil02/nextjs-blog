import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'
import styles from './index.module.css'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [activeFilter, setActiveFilter] = useState('All posts')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/posts')
      .then(response => {
        if (!response.ok) throw new Error('Unable to load posts')
        return response.json()
      })
      .then(data => setPosts(data.posts))
      .catch(() => setError('We could not load the latest posts.'))
      .finally(() => setIsLoading(false))
  }, [])

  const filters = ['All posts', 'Engineering', 'Product']
  const visiblePosts = posts.filter(post => {
    if (activeFilter === 'All posts') return true
    return post.category === activeFilter
  })
  const featuredPost = posts[0]

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Thoughts on building thoughtful digital products." />
      </Head>
      <div className={styles.page}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/" className={styles.logo}><span>SP</span> Sachin Patil</Link>
          <div className={styles.navLinks}>
            <a href="#writing">Writing</a>
            <Link href="/projects">Projects</Link>
            <a href="#about">About</a>
            <a href="mailto:hello@sachinpatil.dev" className={styles.contactLink}>Let's talk <span aria-hidden="true">↗</span></a>
          </div>
        </nav>

        <section className={styles.hero}>
          <p className={styles.eyebrow}>Notes from the build room <span /></p>
          <h1>Ideas for building<br /><em>better</em> products.</h1>
          <p className={styles.heroCopy}>A practical journal about product design, frontend craft, and the small decisions that make digital experiences feel considered.</p>
          <a href="#writing" className={styles.scrollHint}>Explore the writing <span aria-hidden="true">↓</span></a>
        </section>

        <section className={styles.featureSection} aria-label="Featured post">
          <div className={styles.sectionLabel}><span>01</span> Featured note</div>
          {featuredPost && (
            <Link href={`/posts/${featuredPost.id}`} className={styles.featuredPost}>
              <div className={styles.featuredMeta}><span>{featuredPost.category || 'Engineering'}</span><span><Date dateString={featuredPost.date} /></span></div>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt || 'A closer look at the principles and practices behind a better web.'}</p>
              <span className={styles.readLink}>Read article <span aria-hidden="true">↗</span></span>
            </Link>
          )}
        </section>

        <section className={styles.writingSection} id="writing">
          <div className={styles.sectionHeading}>
            <div><div className={styles.sectionLabel}><span>02</span> The archive</div><h2>Latest writing</h2></div>
            <div className={styles.filters} role="group" aria-label="Filter posts">
              {filters.map(filter => <button key={filter} className={activeFilter === filter ? styles.activeFilter : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
            </div>
          </div>
          {isLoading && <p className={styles.status}>Loading the archive...</p>}
          {error && <p className={styles.status}>{error}</p>}
          {!isLoading && !error && <div className={styles.postGrid}>
            {visiblePosts.map((post, index) => (
              <Link href={`/posts/${post.id}`} className={styles.postCard} key={post.id}>
                <div className={styles.cardTop}><span className={styles.cardNumber}>0{index + 1}</span><span>{post.category || (index % 2 ? 'Product' : 'Engineering')}</span></div>
                <h3>{post.title}</h3>
                <div className={styles.cardBottom}><span><Date dateString={post.date} /></span><span className={styles.arrow} aria-hidden="true">↗</span></div>
              </Link>
            ))}
          </div>}
        </section>

        <footer className={styles.footer} id="about"><span>© 2024 Sachin Patil</span><span>Made with curiosity.</span><a href="mailto:hello@sachinpatil.dev">hello@sachinpatil.dev ↗</a></footer>
      </div>
    </Layout>
  )
}
