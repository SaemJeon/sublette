import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../css/Home.module.css';

const Home = () => {
  return (
    <div className={styles.body}>
      <div className={styles.items}>
          <Link style={{"textDecoration": "none", "color" :"inherit"}} to="/add_listing">Add listing</Link>
        </div>
        <div className={styles.items}>
            <Link style={{"textDecoration": "none", "color" :"inherit"}} to="/get_listing">Get listing</Link>
        </div>
    </div>
  )
}

export default Home