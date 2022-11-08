import NewsItem from "./NewsItem";
import React, { useReducer, useEffect } from "react";
import Spinner from "./Spinner";
import MovingComponent from "react-moving-text"
import InfiniteScroll from "react-infinite-scroll-component";

const reducer = (state, { articledata, type }) => {
  if (type === "load") {
    return {
      ...state,
      loading: true
    }
  }
  if (type === "next") {
    return {
      ...state,
      newsArticles: state.newsArticles.concat(articledata.articles),
      page: state.page + 1,
      loading: false
    }

  }
  if (type === "prev") {
    return {
      ...state,
      newsArticles: articledata.articles,
      page: state.page - 1,
      loading: false
    }

  }
  return {
    ...state,
    newsArticles: articledata.articles,
    totalArticles: articledata.totalResults,
    loading:false
  }
}
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export default function News(props) {
  const [{ newsArticles, loading, page, totalArticles }, dispatch] = useReducer(reducer, { newsArticles: [], loading: true, page: 1, totalArticles: 0 });


  document.title = `${capitalizeFirstLetter(props.category)}-NewsHUb`;   //just changing title for each category:

  const fetchUserData = () => {
    props.setProgress(10);
    fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`)
      .then(response => {

        props.setProgress(30);
        return response.json()
      })
      .then(data => {
        // console.log(data);
        props.setProgress(70);
        dispatch({ articledata: data, type: "" });
        props.setProgress(100);
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchMoreData=async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
      let data = await fetch(url);
      let parsedData = await data.json();
      dispatch({ articledata: parsedData, type: "next" });
    }

  

  // async function handlenext() {

  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
  //   dispatch({ articledata: [], type: "load" });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   dispatch({ articledata: parsedData, type: "next" });
  // }
  // async function handleprevious() {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`
  //    dispatch({ articledata: [], type: "load" });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   dispatch({ articledata: parsedData, type: "prev" });
  // }


  return <div>
    <MovingComponent
      type="slideInFromLeft"
      duration="2000ms"
      delay="1s"
      direction="normal"
      timing="ease"
      iteration="1"
      fillMode="none">
      <h1 className="heading">NewsHub : Top {capitalizeFirstLetter(props.category)} Headlines</h1>
    </MovingComponent>
    {loading && <Spinner />}
      <InfiniteScroll
        dataLength={newsArticles.length}
        next={fetchMoreData}
        hasMore={newsArticles.length!=totalArticles}
        loader={<Spinner/>}
      >
      <div className="container mx-auto row px-5 py-2" >
        {newsArticles.map((newNews) => {
          return <div className="newsbox col-lg-4 mt-3" key={newNews.url}>
            <NewsItem
              title={newNews.title ? newNews.title : ""}
              description={newNews.description ? newNews.description : ""}
              imgURL={newNews.urlToImage ? newNews.urlToImage : process.env.PUBLIC_URL + "images/shsh.jpeg"}
              author={newNews.author ? newNews.author : "unknown"}
              date={newNews.publishedAt}
              newsURL={newNews.url}
              source={newNews.source.name}
            />

          </div>
        })}
        { /* PREVIOUS AND NEXT BUTTONS FOR MULTIPAGES ARTICLES REMOVED TO MAKE INFINITE SCROLL
<div className="d-flex justify-content-between mt-3 ">
      <button type="button" disabled={page <= 1} onClick={handleprevious} className="btn btn-dark btn-lg" ><i className="bi bi-arrow-left"></i> previous</button>
      <button type="button" disabled={page + 1 > Math.ceil(totalArticles / props.pageSize)} onClick={handlenext} className="btn btn-dark btn-lg">next <i className="bi bi-arrow-right"></i></button>
    </div> */}
</div> 

      </InfiniteScroll>
    
  </div>
}