import styles from './LectureList.module.css';

const LectureList = ({ list }) => {
    const lectureDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return (
        <div className={styles.list_container}>
            <h2>Следећа Предавања:</h2>
            <ul>
                {list.map((lec) => <li>{lec.name} : {new Intl.DateTimeFormat('sr-RS', lectureDateOptions).format(new Date(lec.date))}</li>)}
            </ul>
        </div>
    )
}

export default LectureList;