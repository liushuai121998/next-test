import Layout from '../components/MyLayout'

const Post = (props) => (
    <Layout>
        <h1>{props.url.query.title}</h1>
        <p>post content</p>
    </Layout>
)

export default Post