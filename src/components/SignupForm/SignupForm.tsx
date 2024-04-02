'use client'
import { Component, ChangeEvent, FormEvent } from 'react';
import styles from './signupForm.module.scss'

interface State {
  email: string;
  password: string;
  error: string | null;
}

export class SignupForm extends Component<{}, State> {
  state: State = {
    email: '',
    password: '',
    error: null,
  };


  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.setState({
      email: '',
      password: '',
      error: null,
    })
    console.log(email, password)
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        {error && <p>{error}</p>}
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Sign up</button>
      </form>
    );
  }
}
