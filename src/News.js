// import { useState } from "react";
import { useFetchNews } from "./useFetch";

const News = () => {
  const {dataNews, isPendingNews, errorNews } = useFetchNews();
  console.log(dataNews)

  return ( 
    <div className="home">
      { errorNews && <div>Error loading News</div>}
      { isPendingNews && <div>Loading News...</div>}

      { dataNews && 
        <div className="blog-list">
          <h2>Top news from TheNewsAPI</h2>
          <div>
            {dataNews.map((article) => (
                    <div className="blog-preview" key={article.uuid}>
                            <h2>{article.title}</h2>
                            <p>Written by {article.author || 'Unknown'}</p>
                            <p className="truncate">{article.snippet}</p>
                    </div>
                ))}
          </div>
        </div>
      }
    </div>
   );
}
 
export default News;