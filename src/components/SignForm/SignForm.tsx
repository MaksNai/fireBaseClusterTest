import { Component, ChangeEvent, FormEvent } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import styles from './signForm.module.scss';
import { app } from '@/firebase/firebase';

interface State {
  email: string;
  password: string;
  error: string | null;
}

interface PropsSign {
  isRegistered: boolean;
}

export class SignForm extends Component<PropsSign, State> {
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
    const { isRegistered } = this.props;
    const auth = getAuth(app);

    if (isRegistered) {
      signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          console.error("Error signing in:", error);
          this.setState({ error: error.message });
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          console.error("Error registration:", error);
          this.setState({ error: error.message });
        });
    }

    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { isRegistered } = this.props;
    const { email, password, error } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            className={styles.input}
            required
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
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          {isRegistered ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    );
  }
}
