import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        //simulates real world times of fetching data
        setTimeout(() => { 
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    console.log(res);
                    if (!res.ok){
                        throw Error('Could not fetch blog(s)')
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                    console.log(err.message);
                    setIsPending(false);
                    setError(err.message);
                })
        }, 500);

        return () => abortCont.abort() //aborts fetch request if not required. 
    //dependency ran only when name state changed. 
    },[url]);
    return { data, isPending, error }
}

const useFetchNews = () =>{
    const [dataNews, setDataNews] = useState(null);
    const [isPendingNews, setIsPendingNews] = useState(true);
    const [errorNews, setErrorNews] = useState(null);
    
    useEffect(() =>{
        const abortCont = new AbortController();
        const api_token = process.env.REACT_APP_api_token;
        const url = `https://api.thenewsapi.com/v1/news/top?api_token=${api_token}&language=en&limit=3`;

        fetch(url, {signal: abortCont.signal})
            .then(res=> {
                if (!res.ok){
                    throw Error('Could not fetch the news data');
                }
                return res.json();
            })
            .then(data => {
                setDataNews(data.data);
                setIsPendingNews(false);
                setErrorNews(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setIsPendingNews(false);
                    setErrorNews(err.message);
                }
            }); 
        return () => abortCont.abort(); // Aborts fetch request if not required
    }, [])
    return { dataNews, isPendingNews, errorNews };
}

export { useFetch, useFetchNews };