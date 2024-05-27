import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () =>{
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Mario');
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault(); //prevents refresh
    const blog = { title,body, author } //create blog object on click
    setIsPending(true);
    //post request
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json"}, 
      body: JSON.stringify(blog)    //convert object to JSON string
    }).then(() =>{  //fires function when completed
      console.log('new blog created');
      setIsPending(false);

      navigate('/')
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>

        <label>Blog Title:</label>
        <input 
          type="text"
          required
          value = {title}
          //changes value of current target, value changes in require
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
        {!isPending && <button>Submit blog</button> }
        {isPending && <button disabled>Submitting blog</button> }
      </form>
    </div>
  )
}
export default Create;