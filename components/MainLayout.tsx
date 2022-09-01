import Link from "next/link";
import Head from "next/head";
import {TopMenu} from "./TopMenu";

export function MainLayout({children, title = 'Next App'}){
    const titlePage = `Next - ${title}`
    return(
        <>
            <Head>
                <title>{titlePage}</title>
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