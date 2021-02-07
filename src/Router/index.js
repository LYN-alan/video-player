import Home from '../pages/home/index.jsx'
import About from '../pages/about/index.jsx'
import User from '../pages/user/index.jsx'
import {
    HashRouter,
    Switch,
    Route,
    NavLink
} from 'react-router-dom'
import React from 'react'
import { Menu } from 'antd';
import {HomeOutlined} from '@ant-design/icons'

import './index.less'

export default class RouteConfig extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentTabs: ''
        }
    }
    componentDidMount(){
        let catchKey = sessionStorage.getItem('tabKey')
        if(catchKey){
            this.setState({
                currentTabs: catchKey
            })
        }else{
            this.setState({
                currentTabs: 'home'
            })
        }
    }
    tabChange = (e) => {
        this.setState({
            currentTabs: e.key
        })
        sessionStorage.setItem('tabKey', e.key)
    }
    render(){
        const {currentTabs} = this.state
        return(
            <HashRouter>
                <div>
                    <header className='page_header'>Zn</header>
                    <Menu onClick={this.tabChange} mode="horizontal" selectedKeys={[currentTabs]}>
                        <Menu.Item key="home">
                            {/* 首页 */}
                            <NavLink to='/'>首页</NavLink>
                        </Menu.Item>
                        <Menu.Item key="about" >
                            {/* 关于 */}
                            <NavLink to='/about'>关于</NavLink>
                        </Menu.Item>
                        <Menu.Item key="user">
                            <NavLink to='/user'>用户</NavLink>
                        </Menu.Item>
                    </Menu>
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
            </HashRouter>
        )
    }
}