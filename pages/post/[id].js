import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import Link from "next/link";
import {useState, useEffect} from "react"

export default function Post ({post: serverPost}){
    const [post, setPost] = useState(serverPost)
    const router = useRouter()
    useEffect(() => {
        async function load(){
            const res = await fetch(`http://localhost:4200/posts/${router.query.id}`)
            const data = await res.json()
            setPost(data)
        }
        if (!serverPost){
            load()
        }
    }, [])
    if (!post){
        return (
            <MainLayout>
                <p>Loading...</p>
            </MainLayout>
        )
    }
    return (
        <MainLayout title={'Post ' + post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link href={'/posts'}><a>Back</a></Link>
        </MainLayout>
    )
}
/*export async function getServerSideProps({params, req}){
    //не работает потому что только на сервере!!!!
    //if (!req){ return {props: {post: null}}
    const response = await fetch(`http://localhost:4200/posts/${params.id}`)
    const json = await response.json();
    return {
        props: {
            "post": json
        }
    }
}*/
Post.getInitialProps = async ({query, req}) => {
    if (!req){
        return {post: null}
    }
    const res = await fetch(`http://localhost:4200/posts/${query.id}`)
    const json = await res.json()
    return { post: json }
}
