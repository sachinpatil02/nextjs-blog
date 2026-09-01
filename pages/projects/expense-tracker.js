import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './expense-tracker.module.css'

const starterExpenses = [
  { id: 1, name: 'Co-working space', category: 'Work', amount: 180, date: '2024-06-14', priority: 'High' },
  { id: 2, name: 'Grocery run', category: 'Food', amount: 64.5, date: '2024-06-12', priority: 'Medium' },
  { id: 3, name: 'Streaming subscription', category: 'Personal', amount: 18, date: '2024-06-08', priority: 'Low' },
  { id: 4, name: 'Train tickets', category: 'Travel', amount: 42, date: '2024-06-03', priority: 'Medium' }
]

const emptyForm = { name: '', category: 'Work', amount: '', date: new Date().toISOString().slice(0, 10), priority: 'Medium' }

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState(starterExpenses)
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')

  useEffect(() => {
    const savedExpenses = window.localStorage.getItem('sachin-expenses')
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('sachin-expenses', JSON.stringify(expenses))
  }, [expenses])

  const filteredExpenses = useMemo(() => expenses.filter(expense => {
    const matchesQuery = expense.name.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category === 'All categories' || expense.category === category
    return matchesQuery && matchesCategory
  }), [expenses, query, category])

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const visibleTotal = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  const categories = ['All categories', ...new Set(expenses.map(expense => expense.category))]

  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function saveExpense(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.amount || Number(form.amount) <= 0) return
    const expense = { ...form, name: form.name.trim(), amount: Number(form.amount) }
    if (editingId) setExpenses(expenses.map(item => item.id === editingId ? { ...expense, id: editingId } : item))
    else setExpenses([{ ...expense, id: Date.now() }, ...expenses])
    setForm(emptyForm)
    setEditingId(null)
  }

  function editExpense(expense) {
    setEditingId(expense.id)
    setForm({ name: expense.name, category: expense.category, amount: expense.amount, date: expense.date, priority: expense.priority })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function deleteExpense(id) {
    setExpenses(expenses.filter(expense => expense.id !== id))
    if (editingId === id) { setEditingId(null); setForm(emptyForm) }
  }

  return (
    <>
      <Head><title>Expense Tracker | Sachin Patil</title><meta name="description" content="A local-first expense tracking dashboard." /></Head>
      <div className={styles.app}>
        <header className={styles.header}><Link href="/projects" className={styles.back}>← Projects</Link><span className={styles.brand}><span>SP</span> Expense tracker</span><span className={styles.saved}>● Local-first</span></header>
        <main className={styles.shell}>
          <div className={styles.intro}><div><p className={styles.eyebrow}>Personal finance / 2024</p><h1>Know where<br /><em>it goes.</em></h1></div><p className={styles.introCopy}>A simple view of your spending, built for clarity. Your data stays in this browser.</p></div>
          <section className={styles.metrics}><div><span>Total tracked</span><strong>${total.toFixed(2)}</strong></div><div><span>Transactions</span><strong>{expenses.length}</strong></div><div><span>Showing now</span><strong>${visibleTotal.toFixed(2)}</strong></div></section>
          <section className={styles.workspace}>
            <form className={styles.form} onSubmit={saveExpense}><div className={styles.formHeading}><div><p className={styles.eyebrow}>01 / Record</p><h2>{editingId ? 'Edit expense' : 'Add an expense'}</h2></div>{editingId && <button type="button" className={styles.cancel} onClick={() => { setEditingId(null); setForm(emptyForm) }}>Cancel</button>}</div>
              <label>Description<input name="name" value={form.name} onChange={updateForm} placeholder="e.g. Design software" /></label>
              <div className={styles.formRow}><label>Amount<input name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={updateForm} placeholder="0.00" /></label><label>Date<input name="date" type="date" value={form.date} onChange={updateForm} /></label></div>
              <div className={styles.formRow}><label>Category<select name="category" value={form.category} onChange={updateForm}><option>Work</option><option>Food</option><option>Travel</option><option>Personal</option><option>Health</option></select></label><label>Priority<select name="priority" value={form.priority} onChange={updateForm}><option>Low</option><option>Medium</option><option>High</option></select></label></div>
              <button className={styles.submit} type="submit">{editingId ? 'Update expense' : 'Add expense'} <span>↗</span></button>
            </form>
            <div className={styles.chartPanel}><div className={styles.panelHeading}><div><p className={styles.eyebrow}>02 / Overview</p><h2>Spending by category</h2></div><span className={styles.period}>This month</span></div><div className={styles.chart}>{['Work', 'Food', 'Travel', 'Personal'].map(item => { const amount = expenses.filter(expense => expense.category === item).reduce((sum, expense) => sum + Number(expense.amount), 0); const width = total ? Math.max(5, amount / total * 100) : 5; return <div className={styles.barRow} key={item}><span>{item}</span><div><i style={{ width: `${width}%` }} /></div><strong>${amount.toFixed(0)}</strong></div> })}</div></div>
          </section>
          <section className={styles.listSection}><div className={styles.listHeading}><div><p className={styles.eyebrow}>03 / Ledger</p><h2>Recent expenses</h2></div><div className={styles.controls}><input aria-label="Search expenses" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" /><select aria-label="Filter by category" value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select></div></div><div className={styles.expenseList}>{filteredExpenses.map(expense => <div className={styles.expenseRow} key={expense.id}><div className={styles.expenseName}><span className={styles.dot} /><div><strong>{expense.name}</strong><small>{expense.category} · {expense.date}</small></div></div><span className={`${styles.priority} ${styles[expense.priority.toLowerCase()]}`}>{expense.priority}</span><strong className={styles.amount}>${Number(expense.amount).toFixed(2)}</strong><div className={styles.actions}><button onClick={() => editExpense(expense)} aria-label={`Edit ${expense.name}`}>Edit</button><button onClick={() => deleteExpense(expense.id)} aria-label={`Delete ${expense.name}`}>Delete</button></div></div>)}</div>{filteredExpenses.length === 0 && <p className={styles.empty}>No expenses match this view.</p>}</section>
        </main>
        <footer className={styles.footer}><Link href="/projects">← All projects</Link><span>Data is stored locally in your browser.</span></footer>
      </div>
    </>
  )
}
