import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from './projects.module.css'

const projects = [
  {
    number: '01',
    type: 'API + Search',
    title: 'Recipe finder',
    description: 'A focused way to discover the right recipe from a large, changing collection.',
    features: ['External API integration', 'Search and filter functionality', 'Categories and saved recipes'],
    accent: 'terracotta',
    href: '/projects/recipe-finder'
  },
  {
    number: '02',
    type: 'Data + Forms',
    title: 'Expense tracker',
    description: 'A calm dashboard for understanding where money goes and making better decisions.',
    features: ['CRUD operations', 'Charts and data visualization', 'LocalStorage persistence'],
    accent: 'green',
    href: '/projects/expense-tracker'
  },
  {
    number: '03',
    type: 'Community + Content',
    title: 'Movie / book review site',
    description: 'A place to share considered recommendations and build a personal library over time.',
    features: ['User ratings and comments', 'Search, categories, and filters', 'Authentication ready'],
    accent: 'ink',
    href: '/projects/reviews'
  }
]

export default function Projects() {
  return (
    <Layout home>
      <Head>
        <title>Projects | Sachin Patil</title>
        <meta name="description" content="A collection of frontend projects and learning goals." />
      </Head>
      <div className={styles.page}>
        <nav className={styles.nav} aria-label="Primary navigation">
          <Link href="/" className={styles.logo}><span>SP</span> Sachin Patil</Link>
          <div className={styles.navLinks}>
            <Link href="/#writing">Writing</Link>
            <Link href="/projects" className={styles.current}>Projects</Link>
            <Link href="/#about">About</Link>
          </div>
        </nav>

        <div>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Selected work <span /></p>
            <h1>Small products,<br /><em className={styles.accent}>serious</em> practice.</h1>
            <p className={styles.heroCopy}>A hands-on collection of projects designed to turn frontend concepts into useful, shippable experiences.</p>
          </section>

          <section className={styles.projectSection}>
            <div className={styles.sectionLabel}><span>01</span> Project briefs</div>
            <div className={styles.projectList}>
              {projects.map(project => (
                project.href ? (
                  <Link href={project.href} className={`${styles.projectCard} ${styles[project.accent]}`} key={project.title}>
                    <ProjectCardContent project={project} />
                  </Link>
                ) : (
                  <article className={`${styles.projectCard} ${styles[project.accent]}`} key={project.title}>
                    <ProjectCardContent project={project} />
                  </article>
                )
              ))}
            </div>
          </section>

          <section className={styles.learningSection}>
            <div className={styles.sectionLabel}><span>02</span> Learning focus</div>
            <div className={styles.learningContent}>
              <h2>Build the habit.<br /><em className={styles.accent}>Understand</em> the system.</h2>
              <div className={styles.learningGrid}>
                <div><span className={styles.miniLabel}>TypeScript learning</span><p>Interface definitions<br />Union types<br />Generic types</p></div>
                <div><span className={styles.miniLabel}>Shared capabilities</span><p>CRUD operations<br />Categories and due dates<br />Priority levels and search</p></div>
              </div>
            </div>
          </section>

          <section className={styles.stackSection}>
            <div className={styles.sectionLabel}><span>03</span> The toolkit</div>
            <div className={styles.stackContent}><h2>Tools chosen for<br /><em className={styles.accent}>momentum.</em></h2><div className={styles.stackTags}><span>Next.js</span><span>TypeScript</span><span>Tailwind</span><span>Zustand / Context API</span><span>Local Storage</span></div></div>
          </section>
        </div>

        <footer className={styles.footer}><Link href="/">← Back to writing</Link><span>© 2024 Sachin Patil</span><a href="mailto:hello@sachinpatil.dev">Let's build something ↗</a></footer>
      </div>
    </Layout>
  )
}

function ProjectCardContent({ project }) {
  return (
    <>
      <div className={styles.projectTop}><span>{project.number}</span><span>{project.type}</span></div>
      <div className={styles.projectBody}>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
      </div>
      <ul>
        {project.features.map(feature => <li key={feature}>{feature}<span aria-hidden="true">↗</span></li>)}
      </ul>
    </>
  )
}
