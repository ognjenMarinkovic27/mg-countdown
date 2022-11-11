import styles from './LoadingCircle.module.css';

const LoadingCircle = () => {
    return <div className={styles.lds_dual_ring}></div>;
}

export default LoadingCircle;