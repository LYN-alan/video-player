import React from 'react'
import './index.less'
import {Progress, Slider, Spin, Menu, Dropdown, Tooltip} from 'antd'
import { 
    CaretRightOutlined, PauseOutlined, FullscreenOutlined, 
    FullscreenExitOutlined} from '@ant-design/icons';
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            videoRefs: {},
            currentCatch: 0,
            currentSliderTime: 0.5,
            videoLoading: false,
            videoTotalTime: '',
            videoCurrentTime: 0,
            videoPlayStatus: false,
            isFullScreen: false,
            playbackRate: '倍速'
        }
    }
    componentDidMount(){
        console.log(this.refs.myVideo)
        this.setState({
            videoRefs: this.refs.myVideo
        })
        this.formatVideoTime()
        window.addEventListener('fullscreenchange',this.screenSizeChange, false)
    }
    componentWillUnmount(){
        window.removeEventListener('fullscreenchange')
    }
    screenSizeChange = () => {
        this.setState({
            isFullScreen: document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen
        })
    }
    videoCanPlay = () => {
        this.setState({
            videoLoading: false
        })
    }
    videoStartLoad = () => {
        console.log('start')
        this.setState({
            videoLoading: true
        })
    }
    playSpeedChange = (key) => {
        console.log(key)
        let {videoRefs} = this.state
        this.setState({
            playbackRate: key.key
        })
        videoRefs.playbackRate = key.key
    }
    videoPlaySpeed = (
        <Menu onClick={this.playSpeedChange}>
            <Menu.Item key='2.0'>2.0</Menu.Item>
            <Menu.Item key='1.5'>1.5</Menu.Item>
            <Menu.Item key='1.25'>1.25</Menu.Item>
            <Menu.Item key='1.0'>1.0</Menu.Item>
        </Menu>
    )
    videoLoaded = (data) => {
        console.log(data)
        let {videoRefs} = this.state
        this.setState({
            currentCatch: videoRefs.buffered.end(0) / videoRefs.duration * 100,
            videoTotalTime: videoRefs.duration
        })
    }
    videoTimeUpdate =() => {
        let {videoRefs} = this.state
        if(videoRefs.currentTime >= videoRefs.duration){
            this.setState({
                videoPlayStatus: false
            })
        }
        this.setState({
            currentCatch: videoRefs.buffered.end(0) / videoRefs.duration * 100,
            currentSliderTime: videoRefs.currentTime / videoRefs.duration * 100,
            videoCurrentTime: videoRefs.currentTime
        })
    }
    dropSlider = (data) => {
        let {videoRefs} = this.state
        videoRefs.currentTime = videoRefs.duration * (data / 100)
        // videoRefs.play()
        console.log(data)
        this.setState({
            currentSliderTime: data,
            currentTimeCatch: videoRefs.duration * (data / 100),
            videoCurrentTime: videoRefs.duration * (data / 100)
        })
    }
    videoPlayStatusChange = () => {
        const {videoPlayStatus, videoRefs} = this.state
        if(videoRefs.paused){
            videoRefs.play()
        }else{
            videoRefs.pause()
        }
        this.setState({
            videoPlayStatus: !videoPlayStatus
        })
    }
    formatVideoTime = (videoTotalTime) => {
        let h = this.addZero(parseInt( videoTotalTime / 60 / 60 ))
        let m = this.addZero(parseInt( videoTotalTime / 60 ))
        let s = this.addZero(parseInt( videoTotalTime % 60 ))
        return `${h}:${m}:${s}`
    }
    addZero(num){
        return num < 10 ? ('0' + num) : num
    }
    toFullVideo = () => {
        const videoWrapper = this.refs.videoWrap
        if(videoWrapper.requestFullscreen){
            videoWrapper.requestFullscreen();
        }else if(videoWrapper.webkitRequestFullScreen){
            videoWrapper.webkitRequestFullScreen();
        }else if(videoWrap.mozRequestFullScreen){
            videoWrapper.mozRequestFullScreen();
        }else{
            videoWrapper.msRequestFullscreen();
        }
        this.setState({
            isFullScreen: true
        })
    }
    exitFullVideo = () => {
        if(document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen){
            document.exitFullscreen()   
        }
        this.setState({
            isFullScreen: false
        })
    }
    render(){
        const {
            currentCatch, currentSliderTime, videoTotalTime,videoCurrentTime,
            videoPlayStatus,isFullScreen,playbackRate
        } = this.state
        return(
            <div className="container">
                <div className='video_title'>这是一个自定义的视频播放器</div>
                <div className='video_wrap' ref="videoWrap">
                    <video 
                        onLoadStart={this.videoStartLoad}
                        onCanPlayThrough={this.videoCanPlay}
                        onLoadedData={this.videoLoaded} 
                        onTimeUpdate={this.videoTimeUpdate}
                        ref='myVideo' 
                        preload='auto'
                        src={require("../../../public/mda-jfjh8uxxzswmhbhe.mp4").default}></video>
                    <div className="video_tool">
                        <div className="video_player_process">
                            <Progress showInfo={false} strokeWidth={4} className="video_player_catch_procress" percent={currentCatch} strokeColor='rgba(255,255,255,.6)' trailColor='rgba(255,255,255,.5)'/>
                            <Slider step={0.05} onChange={this.dropSlider} tooltipVisible={false} className="video_player_slider" value={currentSliderTime} ></Slider>
                        </div>
                        <div className="video_player_control">
                            <div className="video_player_control_left">
                                <div className="icon_play" onClick={this.videoPlayStatusChange}>{!videoPlayStatus? <CaretRightOutlined />: <PauseOutlined />}</div>
                                <div>{this.formatVideoTime(videoTotalTime)} / {this.formatVideoTime(videoCurrentTime)}</div>
                            </div>
                            <div className="video_player_control_right">
                                <Dropdown 
                                trigger={['click']}
                                arrow
                                overlayStyle={{backgroundColor: 'rgba(0,0,0,.5)'}}
                                getPopupContainer={() => document.querySelector('.video_player_control_right')}
                                overlay={this.videoPlaySpeed} 
                                placement='topCenter'>
                                    <span>{playbackRate}</span>
                                </Dropdown>
                                {
                                    !isFullScreen?
                                    <FullscreenOutlined title="全屏" onClick={this.toFullVideo} className="icon_play icon_fullscreen" />
                                    :
                                    <FullscreenExitOutlined title="退出全屏" onClick={this.exitFullVideo} className="icon_play icon_fullscreen"/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
module.exports = Home 