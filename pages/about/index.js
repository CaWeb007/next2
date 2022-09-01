import Router from "next/router";
import {MainLayout} from "../../components/MainLayout";

export default function About({description}){
    const linkClickHandler = () => {
        Router.push('/')
    }
    return(
        <MainLayout title={'About'}>
            <h1>About page</h1>
            <p>{description}</p>
            <button onClick={linkClickHandler}>Go back to home</button>
            <button onClick={() => Router.push('/posts')}>Go back to posts</button>
        </MainLayout>
    )
}
About.getInitialProps = async () => {
    const response = await fetch(`http://localhost:4200/about`)
    const data = await response.json()
    return {
        description: data.description
    }
}