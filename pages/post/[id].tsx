import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import Link from 'next/link';
import {useState, useEffect} from "react"
import {NextPageContext} from "next";
import {MyPost} from "../../interfaces/post";

interface PostPageProps {
    post: MyPost
}

export default function Post ({post: serverPost}: PostPageProps){
    const [post, setPost] = useState(serverPost)
    const router = useRouter()
    useEffect(() => {
        async function load(){
            const res = await fetch(`${process.env.API_URL}/posts/${router.query.id}`)
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

interface PostNextPageContext extends NextPageContext{
    query: {
        id: string
    }
}

Post.getInitialProps = async ({query, req}: NextPageContext) => {
    if (!req){
        return {post: null}
    }
    const res = await fetch(`http://localhost:4200/posts/${query.id}`)
    const json: MyPost = await res.json()
    return { post: json }
}
