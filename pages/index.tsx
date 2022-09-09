import Link from "next/link"
import Head from "next/head"
import {MainLayout} from "../components/MainLayout";

const sectionTitle = 'Главная'
export default function Index () {
    return(
        <MainLayout title={sectionTitle}>

        </MainLayout>
    )
}