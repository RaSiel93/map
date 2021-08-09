import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const AddPersonModal = (props) => {
  const { isOpen, onClose, onSubmit, item } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthAt, setBirthAt] = useState('');
  const [notice, setNotice] = useState('');

  const onAfterOpen = () => {
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setBirthAt('');
    setNotice('');
  }

  const handleSubmit = () => {
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      birth_at: birthAt,
      notice: notice,
    });
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Дабаўленне чалавека'
  >
    <div>
      <label htmlFor='lastName'>Прозвішча</label>
      <input
        id='lastName'
        value={lastName}
        onChange={(e) => { setLastName(e.target.value) }}
      ></input>
    </div>
    <div>
      <label htmlFor='firstName'>Імя</label>
      <input
        id='firstName'
        value={firstName}
        onChange={(e) => { setFirstName(e.target.value) }}
      ></input>
    </div>
    <div>
      <label htmlFor='middleName'>Імя па бацьку</label>
      <input
        id='middleName'
        value={middleName}
        onChange={(e) => { setMiddleName(e.target.value) }}
      ></input>
    </div>
    <div>
      <label htmlFor='birthAt'>Дата нараджэння</label>
      <input
        id='birthAt'
        value={birthAt}
        onChange={(e) => { setBirthAt(e.target.value) }}
      ></input>
    </div>
    <div>
      <label htmlFor='notice'>Нататка</label>
      <textarea
        id='notice'
        value={notice}
        onChange={(e) => { setNotice(e.target.value) }}
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
