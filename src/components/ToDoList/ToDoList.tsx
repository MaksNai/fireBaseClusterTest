'use client'
import { Component, ChangeEvent } from 'react'

import firebase from 'firebase/compat/app'
// Required for side-effects
import 'firebase/firestore'

import styles from './toDoList.module.scss'
import { TimeAgo } from '@/components/TimeAgo/TimeAgo'

import { db } from '@/firebase/firebase'
import { collection, addDoc } from 'firebase/firestore'

// async function writeUserData() {
//   try {
//     const docRef = await addDoc(collection(db, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

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

export class ToDoList extends Component<{}, ToDoState> {
  state: ToDoState = {
    toDoItems: [],
    inputText: '',
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputText: e.target.value })
  }

  addTodo = async () => {
    if (this.state.inputText.length === 0) return
    const newItem: ToDoItem = {
      id: Date.now().toString(),
      text: this.state.inputText,
      completed: false,
      createdAt: new Date(),
      important: false,
    }

    try {
      await addDoc(collection(db, 'users'), newItem)
    } catch (e) {
      console.error('Error adding document: ', e)
    }

    this.setState((prevState) => ({
      toDoItems: [...prevState.toDoItems, newItem],
      inputText: '',
    }))
  }

  deleteTodo = (id: number) => {
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.filter((item) => Number(item.id) !== Number(id)),
    }))
  }

  toggleComplete = (id: string) => {
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    }))
  }

  toggleImportant = (id: string) => {
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.map((item) =>
        item.id === id ? { ...item, important: !item.important } : item,
      ),
    }))
  }

  render() {
    return (
      <div className={styles.todoContainer}>
        <div className={styles.addContainer}>
          <input
            className={styles.inputField}
            type="text"
            value={this.state.inputText}
            onChange={this.handleInputChange}
          />
          <button className={styles.button} onClick={this.addTodo}>
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
              <button onClick={() => this.toggleImportant(item.id)} className={styles.button}>
                Important
              </button>
              <button onClick={() => this.toggleComplete(item.id)} className={styles.button}>
                Complete
              </button>
              <button onClick={() => this.deleteTodo(Number(item.id))} className={styles.button}>
                Delete
              </button>
              {/* <button onClick={writeUserData} className={styles.button}>
                Test base
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
