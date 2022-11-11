import styles from './LoginPage.module.css';
import { useContext, useState } from 'react';
import { supabase } from '../supabaseClient';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import SessionContext from '../SessionContext/SessionContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sessionContext = useContext(SessionContext);
    const session = sessionContext.session;


  const handleLogin = async (e) => {

    e.preventDefault()


    try {

        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({email, password})

        if (error) throw error

    } catch (error) {
        console.log(error)
        alert(error.error_description || error.message)
    } finally {
        setLoading(false)
    }

  }

    return (
        session ? <Navigate to='/admin' /> : loading ? <LoadingCircle /> :
        <form className={styles.loginForm} onSubmit={handleLogin}>
            <div className={styles.inputContainer}>
                <label htmlFor='email'>Имејл адреса</label>
                <input name='email' className={styles.loginInput} value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor='password'>Лозинка</label>
                <input name='password' type='password' className={styles.loginInput} value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button className={styles.loginButton}>Улогуј се</button>
        </form>
    )
}

export default LoginPage;