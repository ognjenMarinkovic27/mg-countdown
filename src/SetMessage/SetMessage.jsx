import styles from './SetMessage.module.css';

import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SessionContext from '../SessionContext/SessionContext';
import { supabase } from '../supabaseClient';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

const SetMessage = () => {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const sessionContext = useContext(SessionContext);
    const session = sessionContext.session;

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true);
        try {
            const res = await supabase.from('messages').update({'message_text': text}).match({id: 1});
            console.log(res);
        }
        catch (err) {
            console.log(err);
            alert(err.error_description || err.message)
        }
        setLoading(false);
        setText('');
    }

    return (
        session ? !loading ? <form className={styles.messageForm} onSubmit={handleSubmit}>
            <textarea name='message' className={styles.messageInput} value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <button className={styles.messageButton}>Sacuvaj</button>
        </form> : <LoadingCircle /> : <Navigate to='/admin'/>
    )
}

export default SetMessage;