import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const blog = location.state?.blog || null;

  const [title, setTitle] = useState(blog?.title || '');
  const [body, setBody] = useState(blog?.body || '');
  const [author, setAuthor] = useState(blog?.author || '');
  const [isPending, setIsPending] = useState(false);
  const [loading, setLoading] = useState(!blog);
  const [error, setError] = useState(null);

  //fetches blog data when not received directly through blog details page, ie direct url 
  useEffect(() => {
    if (!blog) {
      fetch(`http://localhost:8000/blogs/${id}`)
        .then(res => {
          if (!res.ok) {
            throw Error('Could not fetch the data for that resource');
          }
          return res.json();
        })
        .then(data => {
          setTitle(data.title);
          setBody(data.body);
          setAuthor(data.author);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, blog]);

  //On edit submission, updates database and prevents resubmitting while updating
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    const updatedBlog = { title, body, author };

    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog)
    }).then(() => {
      setIsPending(false);
      navigate(`/blogs/${blog.id}`); // Navigate back to the blog details page
    });
  };

  if (error) {
    return <Navigate to={`/blogs/${id}`} />;
  }

  const handleCancel = () => {
    navigate(`/blogs/${id}`);
  };

  return ( 
    <div className="create">
      <h2>Edit Blog</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Blog Title:</label>
          <input 
            type="text"
            required
            value = {title}
            //changes value of current target, value changes in response
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea 
            type="text"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label>Blog author:</label>
          <select 
            value ={author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value="mario">Mario</option>
            <option value="yoshi">Yoshi</option>
          </select>
          {!isPending && <button>Save blog</button> }
          {isPending && <button disabled>Submitting blog</button> }
          <button onClick={handleCancel}>Cancel</button>
        </form>
      )}

    </div>
   );
}
 
export default EditBlog;