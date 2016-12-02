'use strict';


import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import { Router, Route, hashHistory ,Link } from 'react-router';


var App = React.createClass({
    getInitialState:function(){
      return{
          list:["延安高速路发生10车连撞事故","avalonJS-一个兼容ie6的前端MVVM框架！","如何正确的看待【兼容ie8】？"]
      }
    },
    render: function() {
        var Listdom=[];
        for (var i = 0; i <this.state.list.length; i++){
            Listdom.push(<Link to={`show/${this.state.list[i]}`}><li>{this.state.list[i]}</li></Link>);
        }
        return (
            <div>
                <title>hello, 比令数据!</title>
                <h5 className="title">hello, 比令数据!</h5>
                <div className="tip-box">
                    <span className="top-tip"><a href="#/list">列表页面</a></span>
                    <span className="top-tip"><a href="#/detail">详情详情</a></span>
                    <span className="top-tip"><a href="#/UserGist">ajax</a></span>
                </div>
                <div className="cention">
                    <ul className="list-box">
                        {Listdom}
                    </ul>
                </div>

            </div>
        );
    }
});

var List = React.createClass({
    render: function() {
        return (
            <div>
                <title>这是列表页</title>
                <h5 className="title">这是列表页</h5>
                <div className="tip-box">
                    <span className="top-tip"><a href="#/">返回首页</a></span>
                </div>
                <div className="cention">
                    <div>这是列表页</div>
                </div>
            </div>
        );
    }
});

var Detail = React.createClass({
    render: function() {
        return (
            <div>
                <title>这是详情页</title>
                <h5 className="title">这是详情页</h5>
                <div className="tip-box">
                    <span className="top-tip"><a href="#/">返回首页</a></span>
                </div>
                <div className="cention">
                    <div><img src={require('../images/yeoman.png')}/>这是详情页</div>
                </div>
            </div>
        );
    }
});

var Show = React.createClass({
    render: function() {
        return (
            <div>
                <title>{this.props.params.id}详情页!</title>
                <h5 className="title">详情页!</h5>
                <div className="tip-box">
                    <span className="top-tip"><a href="#/">返回首页</a></span>
                </div>
                <div className="cention">
                    <div>{this.props.params.id}</div>
                    <div><img src={require('../images/yeoman.png')}/>这是详情页</div>
                </div>
            </div>
        );
    }
});

//ajax
var UserGist = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            lastGistUrl: ''
        };
    },

    componentDidMount: function() {
        $.get("http://localhost:8080/react/data/test.json", function(result) {
            var lastGist = result[0];
            if (this.isMounted()) {
                this.setState({
                    username: lastGist.titlename,
                    lastGistUrl: lastGist.cention
                });
            }
        }.bind(this));
    },

    render: function() {
        return (
                <div>
                    <div>标题：{this.state.username}</div>
                    <div>内容：{this.state.lastGistUrl}</div>
                </div>
        );
    }
});



//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={App}></Route>
        <Route path='/list' component={List} />
        <Route path='/detail' component={Detail} />
        <Route name="show" path="/show/:id" component={Show} />
        <Route path="/UserGist"  component={UserGist} />
    </Router>
), document.getElementById('app'));
