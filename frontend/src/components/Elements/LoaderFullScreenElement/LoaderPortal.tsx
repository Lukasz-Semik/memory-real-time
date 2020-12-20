import { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('loader-root');

export class LoaderPortal extends Component {
  el: HTMLDivElement;

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
