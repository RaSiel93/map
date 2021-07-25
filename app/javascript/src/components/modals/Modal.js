import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const ReactModalAdapter = ({ className, modalClassName, ...props }) => {
  props = {
    ...props,
    style: {
      ...props['style'],
      overlay: {
        backgroundColor: '#0005',
        zIndex: '100'
      },
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        display               : 'flex',
        flexDirection         : 'column',
        gap                   : '20px'
      }
    },
  }

  return (
    <ReactModal
      ariaHideApp={false}
      className={modalClassName}
      portalClassName={className}
      bodyOpenClassName='portalOpen'
      {...props}
    />
  );
}

export const Modal = styled(ReactModalAdapter)`
  label {
    text-align: center;
  }

  label, input, button {
    font-size: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  .overlay {
    opacity: 0.3;
  }
`
