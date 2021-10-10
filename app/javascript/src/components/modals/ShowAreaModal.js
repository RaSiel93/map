import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import styled from 'styled-components';
import { areaToPolygonObject } from '../../services/deckGl';
import Select from 'react-select';

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

  .inputs {
    display: flex;
    gap: 10px;
    width: 100%;

    input, &>div {
      width: 200px;
      flex-grow: 1;
    }
  }

  #react-select-3-listbox {
    z-index: 5;
  }
`;

const Areas = styled.div`
  a {
    display: block;
    border-bottom: 1px solid #555;
    cursor: pointer;
    padding: 5px;
    background-color: #ddd;

    &:hover {
      background-color: #eee;
    }
  }
`

export const ShowAreaModal = (props) => {
  const { isOpen, onClose, onSubmit, companies } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [areaId, setAreaId] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [item, setItem] = useState(props.item);

  const onAfterOpen = () => {
    setFirstName('');
    setLastName('');
    setAreaId(item?.id);
    setCompanyId(null);
    setItem(item || props.item);
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

  const companyOptions = [
    { value: '', label: 'Месца працы' },
    ...companies.map(company => ({ value: company.id, label: company.attributes.name }))
  ];

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
          Колькасць жыхароў: ({item.addedPeopleCount}/{item.peopleCount}/{item.estimatedPeopleCount})
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
        <div className="inputs">
          <input
            id='lastName'
            value={lastName}
            placeholder='Прозвішча'
            onChange={(e) => { setLastName(e.target.value) }}
          ></input>
          <input
            id='firstName'
            value={firstName}
            placeholder='Імя'
            onChange={(e) => { setFirstName(e.target.value) }}
          ></input>
          <Select
            name='companyId'
            value={companyOptions.find((option) => (option.value === companyId))}
            onChange={(option) => { setCompanyId(option.value) }}
            options={companyOptions}
          />
        </div>
        <button onClick={handleSubmit}>Дадаць</button>
      </AddPersonForm>
      {
        item.areas.length > 0 && <Areas>
          <h3>Унутранныя аб'екты:</h3>
          {
            item.areas.map((area) => {
              const { attributes: { id, title } } = area;

              return <a key={id} onClick={() => setItem(areaToPolygonObject(area))}>
                {
                  `${title}`
                }
              </a>
            })
          }
        </Areas>
      }
    </div>
  </Modal>
}
