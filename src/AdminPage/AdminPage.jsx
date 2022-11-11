import styles from './AdminPage.module.css';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useState, useEffect, useContext } from 'react';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
import SessionContext from '../SessionContext/SessionContext';

const AdminPage = () => {

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(null);

    const sessionContext = useContext(SessionContext);
    const session = sessionContext.session;

    const handleLogOut = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);
    }

    useEffect(() => {
        if(session != null)
            getProfile()
    }, [session])
    
    
    const getProfile = async () => {
        try {
            setLoading(true)
            const { user } = session;

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }

    }

    const updateProfile = async (e) => {
        e.preventDefault()
    
        try {
            setLoading(true)
            const { user } = session
    
            const updates = {
            id: user.id,
            username,
            updated_at: new Date(),
            }
    
            let { error } = await supabase.from('profiles').upsert(updates)
    
            if (error) {
            throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }
 
    return (
        session ? loading ? <LoadingCircle /> : 
        <div>
            <h2>Улоговани сте као: {username}</h2>
            <Link className={styles.link} to='/setMessage'>Постави обавештење</Link>
            <Link className={styles.link} to='/setLecture'>Постави предавање</Link>
            <button onClick={handleLogOut}>Излогуј се</button>
        </div> : <div>Нисте улоговани. <b><Link className={styles.login_link} to='/login'>Улогуј се.</Link></b></div>
    )
}

export default AdminPage;