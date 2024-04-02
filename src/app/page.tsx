'use client'
import { Component, MouseEvent } from 'react'
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'
import { ToDoList, SignForm } from '@/components/'
import styles from './page.module.scss'

interface HomeState {
  currentUser: User | null
  isRegistered: boolean
}

export default class Home extends Component<{}, HomeState> {
  state: HomeState = {
    currentUser: null,
    isRegistered: true, 
  }

  componentDidMount() {
    const auth = getAuth()
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ currentUser: user })
      } else {
        this.setState({ currentUser: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    this.setState(prevState => ({ isRegistered: !prevState.isRegistered }))
  }

  unsubscribe = () => {}

  handleSignOut = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully')
      })
      .catch((error) => {
        console.error('Sign out error', error)
      })
  }

  render() {
    const { currentUser, isRegistered } = this.state

    return (
      <main className={styles.main}>
        <div className={styles.top}>
          <h1 className={styles.description}>To Do list</h1>
          {currentUser && (
            <p>Hello, {currentUser.email}</p>
          )}
          {currentUser && (
            <button onClick={this.handleSignOut} className={styles.signOut}>
              Sign out
            </button>
          )}
        </div>

        <div>
          {currentUser ? (
            <ToDoList currentUser={currentUser} />
          ) : (
            <>
              <SignForm isRegistered={isRegistered} />
              <button onClick={this.handleClick} className={styles.toggleForm}>
                {isRegistered ? "Need to create an account?" : "Already have an account?"}
              </button>
            </>
          )}
        </div>
      </main>
    )
  }
}
