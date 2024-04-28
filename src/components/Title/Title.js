import React from 'react'
import styles from './title.module.css'

const Title = ({content}) => {
  return (
    <div>
            <h1 className={styles.title}>{content}</h1>

    </div>
  )
}

export default Title
