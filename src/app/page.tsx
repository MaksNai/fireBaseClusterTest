import styles from './page.module.scss'
import { ToDoList } from '@/components/ToDoList/ToDoList'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.description}>To Do list</h1>
      <div>
        <ToDoList />
      </div>
    </main>
  )
}
