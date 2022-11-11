import styles from './LectureCountdown.module.css'
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import LectureList from './LectureList/LectureList';

const LectureCountdown = () => {

    const [lectureName, setLectureName] = useState('')
    const [lectureDate, setLectureDate] = useState(null)
    const [lectureDateString, setLectureDateString] = useState('')
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        
        const getLectureData = async () => {

            const fetchRes = await supabase.from('lectures').select('name, date').gte('date', new Date(Date.now()).toISOString()).order('date', { ascending: true }).limit(6);

            setLectures(fetchRes.data.slice(1));

            const lecName = fetchRes.data[0].name;
            const lecDate = new Date(fetchRes.data[0].date);
            console.log(fetchRes)
            const lectureDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const lecDateString = (new Intl.DateTimeFormat('sr-RS', lectureDateOptions).format(lecDate));

            setLectureName(lecName);
            setLectureDate(lecDate);       
            setLectureDateString(lecDateString);
        }

        getLectureData();

    }, [])
    
    

    return (
    <div className={styles.countdown_container}>
        <h1 className={styles.lecture_name}>{lectureName}</h1>
        <h2 className={styles.date}>{lectureDateString}</h2>
        {lectureDate != null ? <Countdown className={styles.countdown} date={lectureDate} >
            <p>Предавање је у току</p>
        </Countdown> : ''}
        {console.log(lectures)}
        <LectureList list={lectures} />
    </div>
    );
}

export default LectureCountdown;