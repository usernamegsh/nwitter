import { useState } from 'react';

function Modal(props) {
  const onScroll = () => {};
  return (
    <div className={'Modal'} onScroll={onScroll}>
      {props.children}
    </div>
  );
}

export default Modal;
