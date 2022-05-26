import 'default-passive-events';
import { Component } from 'react';
import './app.scss';

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}
  // 设置全局变量 "x"
  taroGlobalData = {
    x: 1
  };
  render() {
    return <>{this.props.children}</>;
  }
}

export default App;
