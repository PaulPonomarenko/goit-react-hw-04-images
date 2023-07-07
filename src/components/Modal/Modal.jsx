import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hanleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.hanleKeyDown);
  }
  hanleKeyDown = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleOverayClick = event => {
    if (event.target === event.currentTarget) this.props.onClose();
  };
  render() {
    const { modalSrc, alt } = this.props;
    return (
      <>
        <div className={css.Overlay} onClick={this.handleOverayClick}>
          <div className={css.Modal}>
            <img src={modalSrc} alt={alt} />
          </div>
        </div>
      </>
    );
  }
}
