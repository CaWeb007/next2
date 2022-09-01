import Link from "next/link";
import classes from "../styles/TopMenu.module.sass"
import {TopMenu} from "../interfaces/TopMenu";
import {useEffect, useState} from "react";
import {NextPageContext} from "next";

export function TopMenu({topMenuSections: serverProps}: TopMenu){
    const [topMenuSections, setTopMenuSections] = useState()
    useEffect(() => {
        async function load(){
            const response = await fetch(`${process.env.API_URL}/topMenuSections`)
            const data = await response.json()
            setTopMenuSections(data)
        }
        if (!serverProps)
            load()
    }, [])
    if (!topMenuSections){
        return (
            <>
                <nav className={`${classes.topMenu} ${classes.disable}`}></nav>
            </>
        )
    }
    return (
        <>
            <nav className={classes.topMenu}>
                <Link href={'/'}><a>Home</a></Link>
                <Link href={'/about'}><a>about</a></Link>
                <Link href={'/posts'}><a>posts</a></Link>
            </nav>
        </>
    )
}

TopMenu.getInitialProps = async ({req}: NextPageContext) => {
    if (!req) return {topMenuSections: null}
    const response = await fetch(`${process.env.API_URL}/topMenuSections`)
    const topMenuSections: TopMenu = await response.json()
    return topMenuSections
}