import styles from './page.module.scss'
import { ToDoList, SignForm } from '@/components/'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.description}>To Do list</h1>
      <div>
        <SignForm isRegistered={false}/>
      </div>
    </main>
  )
}
