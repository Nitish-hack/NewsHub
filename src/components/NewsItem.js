// import React from "react";
export default function NewsItem(props){
return <div className="card mt-2" >
<div className="badge-style">
  <span className="badge rounded-pill bg-danger" style={{left:"90%",zIndex:1}}>
   {props.source}
  </span>
  </div>
  <img src={props.imgURL} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{props.title}...</h5>
    <p className="card-text">{props.description}...</p>
    <p className="card-text "><small className=" text-muted">By {props.author} on {new Date(props.date).toUTCString()}</small></p>
    <a href={props.newsURL} target="_blank" className="btn btn-primary">Read More..</a>
  </div>
</div>
}