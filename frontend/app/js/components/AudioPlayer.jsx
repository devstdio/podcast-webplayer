import React from 'react'
import { Link } from 'react-router'

import classNames from 'classnames'

import Notifier from '../tools/Notifier';
import Session from '../tools/Session';
import app from '../app';

export default class AudioPlayer  extends React.Component {
  constructor() {
    this.state = {
      url: null,
      status: 'stopped',
      position: 0
    };

    Notifier.get('playback').on('play', this.play.bind(this));
    Notifier.get('playback').on('stop', this.stop.bind(this));
    Notifier.get('playback').on('toggle', this.toggle.bind(this));

    this.data = null;
    this.playing = false;
    app.player = this;
  }

  toggle(data) {
    if (data && this.data && data._id === this.data._id) {
      if (this.playing) {
        this.audio.pause();
      } else {
        this.audio.play();
        this.playing = true;
      }
    } else if (data) {
      this.play(data);
    }
  }

  play(data) {
    this.data = data;
    this.audio.src = data.audio_url;
    this.audio.autoPlay = true;
    this.playing = true;
  }

  stop() {
    this.audio.pause();
    this.playing = false;
  }

  onPlaybackStart(e) {
    this.playing = true;
    Notifier.get('playback').emit('change', {data:this.data, state:'play'});
  }

  onPlaybackStop(e) {
    this.playing = false;
    Notifier.get('playback').emit('change', {data:this.data, state:'stop'});
  }

  changePlaybackRate(rate, e) {
    this.audio.playbackRate = rate
    this.setState({ playbackRate: rate })
  }

  componentDidMount() {
    this.audio = React.findDOMNode(this.refs.audio);
    this.audio.addEventListener('play', this.onPlaybackStart.bind(this));
    this.audio.addEventListener('pause', this.onPlaybackStop.bind(this));
    this.audio.addEventListener('ended', this.onPlaybackStop.bind(this));
  }

  render () {
    return (
      <div className="audio-player">
        <audio ref='audio' controls autoPlay>
          <source src={this.state.url} />
        </audio>

        <ul>
          <li>Speed: </li>
          <li><button className={classNames({ active: (this.state.playbackRate == 1) })} onClick={this.changePlaybackRate.bind(this, 1)}>1x</button></li>
          <li><button className={classNames({ active: (this.state.playbackRate == 1.25) })} onClick={this.changePlaybackRate.bind(this, 1.25)}>1.25x</button></li>
          <li><button className={classNames({ active: (this.state.playbackRate == 1.50) })} onClick={this.changePlaybackRate.bind(this, 1.50)}>1.50x</button></li>
          <li><button className={classNames({ active: (this.state.playbackRate == 1.75) })} onClick={this.changePlaybackRate.bind(this, 1.75)}>1.75x</button></li>
        </ul>

      </div>
    );
  }

}
