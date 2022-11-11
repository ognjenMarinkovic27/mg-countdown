import styles from './SetLecture.module.css';

import { useContext, useState } from 'react';
import SessionContext from '../SessionContext/SessionContext';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import LoadingCircle from '../LoadingCircle/LoadingCircle';

const SetLecture = () => {
    const [lectureName, setLectureName] = useState('');
    const [lectureDate, setLectureDate] = useState('');
    const [lectureTime, setLectureTime] = useState('');

    const [loading, setLoading] = useState(false);

    const sessionContext = useContext(SessionContext);
    const session = sessionContext.session;

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/

        if(dateRegex.test(lectureDate) && timeRegex.test(lectureTime)) {
            const datetime = `${lectureDate.substring(6)}-${lectureDate.substring(3,5)}-${lectureDate.substring(0,2)}T${lectureTime}:00`
            try {
                setLoading(true);
                await supabase.from('lectures').insert({name: lectureName, date: datetime});
            }
            catch (err) {
                console.log(err);
                alert(err.error_description || err.message)
            }
            setLoading(false);
        }

        setLectureName('');
        setLectureDate('');
        setLectureTime('');
    }

    return (
        session ? !loading ? <form autoComplete='off' className={styles.lectureForm} onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
                <label htmlFor='lectureName'>Име Предавања</label>
                <input name='lectureName' className={styles.lectureInput} value={lectureName} onChange={(e) => setLectureName(e.target.value)}></input>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor='lectureDate'>Датум Предавања <i>(ДД/ММ/ГГГГ)</i></label>
                <input name='lectureDate' className={styles.lectureInput} value={lectureDate} onChange={(e) => setLectureDate(e.target.value)}></input>
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor='lectureTime'>Време Предавања <i>(СС:ММ)</i></label>
                <input name='lectureTime' className={styles.lectureInput} value={lectureTime} onChange={(e) => setLectureTime(e.target.value)}></input>
            </div>
            <button className={styles.lectureButton}>Sacuvaj</button>
        </form> : <LoadingCircle /> :<Navigate to='/admin' />
    )
}

export default SetLecture;