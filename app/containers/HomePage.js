import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import track from '../components/track'

import 'sass/homepage'

@track('Open Home Page')
export default class HomePage extends React.Component {
  render(){
    return (
      <div>
        <Header brand={{name: '易伙的'}} />
        <Body>
          <div className='text-center homepage-banner' style={{backgroundImage: `url(${window.Assets.banner})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
            <h1>
              粉丝营销的神秘武器
            </h1>
            <p />
            <p style={{fontSize: 20}}>
              每个人都有机会成为万众瞩目的焦点。易伙的帮你经营粉丝社群，扩大影响！
            </p>
          </div>
          <p />
          <div className='text-center'>
            <img src={window.Assets.dashboard} />
          </div>
        </Body>
      </div>
    )
  }
}

