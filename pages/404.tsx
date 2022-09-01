import Link from "next/link";
import {MainLayout} from "../components/MainLayout";
import classes from '../styles/ErrorPage.module.sass'

export default function ErrorPage(){
    return(
        <MainLayout title={'404'}>
            <h1 className={classes.error}>Error 404</h1>
            <p>Please go to <Link href={'/'}><a>home</a></Link></p>
        </MainLayout>
    )
}