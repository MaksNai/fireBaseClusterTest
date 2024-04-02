'use client'
import { Component, ChangeEvent, FormEvent } from 'react'
import { User } from 'firebase/auth';
import 'firebase/firestore'
import { doc, collection, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'

import styles from './toDoList.module.scss'

import { db } from '@/firebase/firebase'
import { TimeAgo } from '@/components/TimeAgo/TimeAgo'
import { getDate } from './helpers'

interface ToDoItem {
  id: string
  text: string
  completed: boolean
  important: boolean
  createdAt: Date
}

interface ToDoState {
  toDoItems: ToDoItem[]
  inputText: string
}

interface UserProps { 
  currentUser: User;
}

export class ToDoList extends Component<UserProps, ToDoState> {
  state: ToDoState = {
    toDoItems: [],
    inputText: '',
  }

  async componentDidMount(): Promise<void> {
    const querySnapshot = await getDocs(collection(db, 'tasks'))
    const items: ToDoItem[] = []
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const newItem: ToDoItem = {
        id: doc.id,
        text: data.text,
        completed: data.completed,
        createdAt: getDate(data.createdAt),
        important: data.important,
      }

      items.push(newItem)
    })

    const uniqueItems = Array.from(new Set(items.map((item) => item.id))).map((id) => {
      return items.find((item) => item.id === id)!
    })

    this.setState({
      toDoItems: uniqueItems,
      inputText: '',
    })
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value })
  }

  addTodo = async (e: FormEvent) => {
    e.preventDefault()
    const { inputText, toDoItems } = this.state
    if (inputText.length === 0) return

    try {
      const newItem = {
        text: inputText,
        completed: false,
        createdAt: new Date(),
        important: false,
      }

      const docRef = await addDoc(collection(db, 'tasks'), newItem)

      this.setState({
        toDoItems: [...toDoItems, { ...newItem, id: docRef.id, createdAt: newItem.createdAt }],
        inputText: '',
      })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id))
      this.setState((prevState) => ({
        toDoItems: prevState.toDoItems.filter((item) => item.id !== id),
      }))
    } catch (error) {
      console.error('Error while deleting task: ', error)
    }
  }

  toggleComplete = async (id: string) => {
    const item = this.state.toDoItems.find((item) => item.id === id)
    await updateDoc(doc(db, 'tasks', id), {
      completed: !item?.completed,
    })
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    }))
  }

  toggleImportant = async (id: string) => {
    const item = this.state.toDoItems.find((item) => item.id === id)
    await updateDoc(doc(db, 'tasks', id), {
      important: !item?.important,
    })
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.map((item) =>
        item.id === id ? { ...item, important: !item.important } : item,
      ),
    }))
  }

  render() {
    return (
      <form>
        <div className={styles.todoContainer}>
          <div className={styles.addContainer}>
            <input
              className={styles.inputField}
              type="text"
              value={this.state.inputText}
              onChange={this.handleInputChange}
            />
            <button className={styles.button} onClick={this.addTodo} type='submit'>
              Add Task
            </button>
          </div>
          <ul className={styles.todoList}>
            {this.state.toDoItems.map((item) => (
              <li key={item.id} className={styles.todoItem}>
                <span
                  className={`${styles.itemText} ${item.completed ? styles.completed : ''}  ${item.important ? styles.important : ''} `}
                >
                  {item.text}
                </span>
                <p className={styles.timeAgo}>
                  <TimeAgo timestamp={item.createdAt.toISOString()} />
                </p>
                <button
                  onClick={() => this.toggleImportant(item.id)}
                  className={styles.button}
                  type="button"
                >
                  Important
                </button>
                <button
                  onClick={() => this.toggleComplete(item.id)}
                  className={styles.button}
                  type="button"
                >
                  Complete
                </button>
                <button
                  onClick={() => this.deleteTodo(item.id)}
                  className={styles.button}
                  type="button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    )
  }
}
