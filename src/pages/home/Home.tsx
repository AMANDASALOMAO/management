import styles from './Home.module.scss'
import EmployeeRegistration from '../employeeRegistration/EmployeeRegistration'

const Home = () => {
    return (
        <div className={styles.container}>
          <EmployeeRegistration />
        </div>
    )
}

export default Home
