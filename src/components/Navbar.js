// import react from "react";
import "../styles.css";
import {Link} from "react-router-dom";
export default function Navbar(){
    return <nav className="navbar navbar-expand-lg navbarultra fixed-top" >
    <div className="container-fluid ">
      <a className="navbar-brand brand-name" href="/">NewsHub</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
       <li className="nav-item"><Link to="/about" className="nav-link active">About</Link></li>
       <li className="nav-item"><Link to="/business" className="nav-link active">Business</Link></li>
       <li className="nav-item"><Link to="/entertainment" className="nav-link active">Entertainment</Link></li>
       <li className="nav-item"><Link to="/sports" className="nav-link active">Sports</Link></li>
       <li className="nav-item"><Link to="/general" className="nav-link active">General</Link></li>
       <li className="nav-item"><Link to="/health" className="nav-link active">Health</Link></li>
       <li className="nav-item"><Link to="/science" className="nav-link active">Science</Link></li>
       <li className="nav-item"><Link to="/technology" className="nav-link active">Technology</Link></li>
      
          </ul>
      </div>
    </div>
  </nav>
    
    
    
    
}