import { useParams, useNavigate, Link } from "react-router-dom";
import { useFetch } from "./useFetch";

//Componenet to view blog's details
const BlogDetails = () => {
  const { id } = useParams();
  const { data : blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const navigate = useNavigate();

  const handleDelete = () => {
    fetch('http://localhost:8000/blogs/'+blog.id, {
      method: 'DELETE'
    }).then(() => {
      navigate('/')
    })
  }

  const handleEdit = () => {
    navigate(`/blogs/${id}/edit`, {state: { blog }});
  }

  return ( 
    <div className="blog-details">
      { isPending && <div>Loading</div>}
      { error && 
        <div> 
          <p> {error} </p>
        <Link to='/'>Click to return to homepage...</Link>
        </div>
      }

      { blog && (
        <article>
          <h2> {blog.title} #{id} </h2>
          <p>Written by {blog.author} </p>
          <div> {blog.body} </div>
          <button onClick={handleDelete}>Delete</button>

          <button onClick={handleEdit}>Edit Blog</button>
        </article>
      )}
    </div>
   );
}
 
export default BlogDetails; 