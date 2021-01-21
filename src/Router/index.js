import Home from '../Pages/home/index.jsx'
import About from '../Pages/about/index.jsx'
import User from '../Pages/user/index.jsx'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link 
} from 'react-router-dom'
import React from 'react'

export default class RouteConfig extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <h2>App</h2>
                    <ul>
                        <li>
                            <Link to='/'>首页</Link>
                        </li>
                        <li>
                            <Link to='/about'>关于</Link>
                        </li>
                        <li>
                            <Link to='/user'>用户</Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route path='/about'>
                        <About />
                    </Route>
                    <Route path='/user'>
                        <User />
                    </Route>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        )
    }
}