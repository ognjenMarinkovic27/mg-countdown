import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from './MessageWall.module.css';

const MessageWall = () => {

    const [message, setMessage] = useState('')

    const fetchData = async () => {
      const msg = await supabase
        .from('messages')
        .select('message_text')
        console.log(msg);
      return msg.data[0].message_text;
    }
    useEffect(() => {
      
      fetchData().then((msg) => {setMessage(msg)});
    }, [])

    return (
      <div className={styles.message_container}>
        <p className={styles.message}>{message}</p>
      </div>  
    );
}

export default MessageWall;