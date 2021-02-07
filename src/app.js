import React from 'react'
import RouterConfig from './Router/index'


class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <RouterConfig {...this.props} />
        )
    }
}
module.exports = App