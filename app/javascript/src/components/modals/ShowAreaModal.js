import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import styled from 'styled-components';


const Description = styled.div`
  text {
    background-color: black;
    span {
      display: block;
    }
  }
`;

const AddPersonForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 10px;

  div {
    width: 100%;

    input {
      width: 100%;
    }

    select {
      height: 29px;
      font-size: 20px;
      width: 100%;
    }
  }
`;

export const ShowAreaModal = (props) => {
  const { isOpen, onClose, onSubmit, item, companies } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  const onAfterOpen = () => {
    setFirstName('');
    setLastName('');
    setAreaId(item?.id);
    setCompanyId(null);
  }

  const handleSubmit = () => {
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      area_id: areaId,
      company_id: companyId,
    });
  }

  useEffect(() => {
    onAfterOpen();
  }, [item.people]);

  return <Modal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onClose}
    contentLabel='Прагляд тэрыторыі'
  >
    <div>
      <h2 htmlFor='title'>{item.number}</h2>
    </div>
    <Description>
      <text>
        {item.notice?.split(/\n/).map((line) => {
          return <span>{line}</span>;
        })}
      </text>
    </Description>
    <ul>
      {
        item.notes.map((note) => {
          return <li key={note.id}>{note.attributes.text}</li>
        })
      }
    </ul>
    <div>
      <div>
        <h5 htmlFor='peopleCount'>
          Колькасць жыхароў: {item.peopleCount}
        </h5>
      </div>
      <ul>
        {
          item.people.map((person) => {
            const { attributes: { id, first_name, last_name, company } } = person;

            return <li key={id}>
              {
                `${last_name} ${first_name} - ${company?.attributes?.name || ''}`
              }
            </li>
          })
        }
      </ul>
      <AddPersonForm>
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
        <button onClick={handleSubmit}>Дадаць</button>
      </AddPersonForm>
    </div>
  </Modal>
}
