import Link from "next/link";
import Head from "next/head"
import {MainLayout} from "../components/MainLayout";
export default function Index () {
    return(
        <MainLayout title={'Home'}>
            <h1>Hello Next</h1>
            <p>
                <Link href="/about">
                    <a>about</a>
                </Link>
            </p>
            <p>
                <Link href="/posts">
                    <a>posts</a>
                </Link>
            </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
        </MainLayout>
    )
}