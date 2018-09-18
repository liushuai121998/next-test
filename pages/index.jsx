import Layout from '../components/MyLayout'

import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = (props) => (
    <li key={props.id}>
        {/*路由遮盖 as客户端路由 href 服务端路由 */}
        <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
            <a>{props.title}</a>
        </Link>
    </li>
)
const Index = (props) => (
    <Layout>
        <h1>My Blog</h1>
        <ul>
            {/* <PostLink id="hello-nextjs" title="hello-nextjs"/>
            <PostLink id="learn-nextjs" title="learn-nextjs"/>
            <PostLink id="deploy-nextjs" title="deploy-nextjs"/> */}
            {props.shows.map(({show}) => {
               return (<PostLink key={show.id} id={show.id} title={show.name}/>)
            })}
        </ul>
        {/* css in js ////// global 应用于子组件 */}
        <style jsx global>
        {`
            h1, a {
                font-family: "Arial";
            }
            ul {
                padding: 0;
            }
            li {
                list-style: none;
                margin: 5px 0;
            }
            a {
                text-decoration: none;
                color: blue;
            }
            a:hover {
                opacity: 0.6;
            }
        `}
        </style>
    </Layout>
)
// getInitialProps 切换路由调用
Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()
    return {
        shows: data
    }
}

export default Index