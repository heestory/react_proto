import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

const Header = ( ) => (
    <div>
    	<Helmet>
    		<title>Front Framework</title>
    		<meta name="description" content="test meta tag"/>
    	</Helmet>
    	<ul>
        	<li><Link to="/">홈</Link></li>
        	<li><Link to="/list">리스트</Link></li>
        </ul>
    </div>
);

export default Header;
