import { Link } from "react-router-dom";

const NotFound = () => {
  return ( 
    <div className="not-found">
      <h2>404 Error</h2>
      <p>Page cannot be found</p>
      <Link to='/'>Click to return to homepage...</Link>
    </div>
   );
}
 
export default NotFound;