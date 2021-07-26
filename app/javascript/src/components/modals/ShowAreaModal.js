import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const ShowAreaModal = (props) => {
  const { isOpen, item, onClose } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onAfterOpen = () => {
    setTitle(item.number || '');
    setDescription(item.notice || '');
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Рэдагаванне машыны'
  >
    <div>
      <h2 htmlFor='title'>{title}</h2>
    </div>
    <div>
      <h4 htmlFor='description'>{description}</h4>
    </div>
    <ul>
      {
        item.people.map((person) => {
          return <li key={person.id}>{person.attributes.notice}</li>
        })
      }
    </ul>
  </Modal>
}
