import Link from "next/link"
import Head from "next/head"
import {TopMenu} from "./TopMenu"
import {Container} from "react-bootstrap";

export function MainLayout({children, title = 'Next App'}){
    const themePrefixes = {"nav": "prefixes"}
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <TopMenu/>
            <main>
                {children}
            </main>
            <style jsx>{`

                main{
                    margin-top: 60px;
                    padding: 1rem;
                }
            `}</style>
        </>
    )
}