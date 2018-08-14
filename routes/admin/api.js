import Home from "../../src/pages/Home";
import ListTest from "../../src/pages/ListTest";

export default [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
    	path: "/list",
        component: ListTest,
        exact: true,
    }
];
