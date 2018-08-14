import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import routes from "../../routes/admin/api";

class Layout extends Component {
    constructor() {
        super();
        this.state = {
            title: "Front Framework",
        };
    }

    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
                <Header />
                <Switch>
                    {routes.map( route => <Route key={route.path} {...route} /> )}
                </Switch>
            </div>
        );
    }
}

export default Layout;
