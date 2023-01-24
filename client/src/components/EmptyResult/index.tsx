import { FC } from "react"

import styles from './styles.module.scss';

interface Props{
text:string
}

export const EmptyResult:FC<Props>=({text})=>{
    return (
        <div className={styles.text}>{text}</div>
    )
}