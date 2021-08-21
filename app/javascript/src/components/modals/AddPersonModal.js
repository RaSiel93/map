import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const AddPersonModal = (props) => {
  const { isOpen, onClose, onSubmit, item, areas, companies } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [birthAt, setBirthAt] = useState('');
  const [notice, setNotice] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const onAfterOpen = () => {
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setBirthAt('');
    setNotice('');
    setAreaId(item?.id);
    setCompanyId(null);
  }

  const handleSubmit = () => {
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      middle_name: middleName,
      birth_at: birthAt,
      notice: notice,
      area_id: areaId,
      company_id: companyId,
    });
  }

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Дабаўленне чалавека'
  >
    <div>
      <input
        id='lastName'
        value={lastName}
        placeholder='Прозвішча'
        onChange={(e) => { setLastName(e.target.value) }}
      ></input>
    </div>
    <div>
      <input
        id='firstName'
        value={firstName}
        placeholder='Імя'
        onChange={(e) => { setFirstName(e.target.value) }}
      ></input>
    </div>
    <div>
      <input
        id='middleName'
        value={middleName}
        placeholder='Імя па бацьку'
        onChange={(e) => { setMiddleName(e.target.value) }}
      ></input>
    </div>
    <div>
      <input
        id='birthAt'
        value={birthAt}
        placeholder='Дата нараджэння'
        onChange={(e) => { setBirthAt(e.target.value) }}
      ></input>
    </div>
    <div>
      <textarea
        id='notice'
        value={notice}
        onChange={(e) => { setNotice(e.target.value) }}
        placeholder='Нататка'
        cols='50'
        rows='10'
      ></textarea>
    </div>
    <div>
      <select
        name='areaId'
        value={areaId || ''}
        onChange={(e) => { setAreaId(e.target.value) }}
      >
        <option value=''>Месца жыхарства</option>
        {
          areas.map((area) => {
            return <option key={area.id} value={area.id}>{area.number}</option>
          })
        }
      </select>
    </div>
    <div>
      <select
        name='companyId'
        value={companyId || ''}
        onChange={(e) => { setCompanyId(e.target.value) }}
      >
        <option value=''>Месца працы</option>
        {
          companies.map((company) => {
            return <option key={company.id} value={company.id}>{company.attributes.name}</option>
          })
        }
      </select>
    </div>
    <button onClick={handleSubmit}>Прыняць</button>
  </Modal>
}
