import express from "express";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes/admin/api";
import Layout from "./src/components/Layout";
import createStore from "./src/store";

import bodyParser from 'body-parser';
import compression from "compression";
import logger from "morgan";

const app = express();
const port = 3000;

app.use(compression());
app.use(logger());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static( path.resolve( __dirname, "./dist" )));

app.get( "/*", ( req, res ) => {
    const context = { };
    const store = createStore( );
    const dataRequirements =
        routes
            .filter( route => matchPath( req.url, route ) ) 
            .map( route => route.component ) 
            .filter( comp => comp.serverFetch ) 
            .map( comp => store.dispatch( comp.serverFetch( ) ) ); 

    Promise.all( dataRequirements ).then( ( ) => {
        const jsx = (
            <ReduxProvider store={ store }>
                <StaticRouter context={ context } location={ req.url }>
                    <Layout />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString( jsx );
        const reduxState = store.getState( );
        const helmetData = Helmet.renderStatic( );

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( reactDom, reduxState, helmetData ) );
    } );
} );

app.listen(port);

function htmlTemplate( reactDom, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ JSON.stringify( reduxState ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
