import BlogList from "./BlogList";
import { useFetch } from "./useFetch";
import News from "./News";

const Home = () => {
    const {data:blogs, isPending, error} = useFetch('http://localhost:8000/blogs')

    return (
        <div className = "home">
            { error && <div>Error loading blogs</div>}
            { isPending && <div>loading...</div>}

            {/* when blogs is true, outputs rights */}
            { blogs && <BlogList blogs = {blogs} title="All blogs"></BlogList>}
            <News></News>
        </div>
    )
}
 
export default Home;