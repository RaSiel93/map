import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import styled from 'styled-components';
import { areaToPolygonObject } from '../../services/deckGl';
import Select from 'react-select';

const Description = styled.div`
  border: solid 1px #555;
  padding: 5px;

  h3 {
    margin: 0;
    padding: 5px;
  }
`;

const Notes = styled.div`
  border: solid 1px #555;
  padding: 5px;

  h3 {
    margin: 0;
    padding: 5px;
  }
`;

const People = styled.div`
  border: solid 1px #555;
  padding: 5px;

  h3 {
    margin: 0;
    padding: 5px;
  }

  table {
    width: 100%;
    margin-bottom: 10px;
    border-spacing: 0;
    padding: 0;
  }

  tr, td, th {
    border: 1px solid #555;
    padding: 5px;
  }
`;

const AddPersonForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;

  input, &>div {
    width: 200px;
    flex-grow: 1;
  }
`;

const Areas = styled.div`
  border: solid 1px #555;

  h3 {
    margin: 0;
    padding: 5px;
  }

  a {
    display: block;
    border-top: 1px solid #555;
    cursor: pointer;
    padding: 5px;
    background-color: #ddd;

    &:hover {
      background-color: #eee;
    }
  }
`;

export const ShowAreaModal = (props) => {
  const { isOpen, onClose, onSubmit, companies, item, changeSelectedArea } = props;

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
    {
      item.notice && <Description>
        <h3>Апісанне:</h3>
        <p>
          {item.notice.split(/\n/).map((line, index) => {
            return <span key={index}>{line}</span>;
          })}
        </p>
      </Description>
    }
    {
      item.notes.length > 0 && <Notes>
        <h3>Нататкі:</h3>
        <ul>
          {
            item.notes.map((note) => {
              const { attributes: { id, text } } = note;

              return <li key={id}>{text}</li>
            })
          }
        </ul>
      </Notes>
    }
    <People>
      <h3>Насельніцтва:</h3>
      <div>
        <h5 htmlFor='peopleCount'>
          Колькасць жыхароў: ({item.addedPeopleCount}/{item.peopleCount}/{item.estimatedPeopleCount})
        </h5>
      </div>
      {
        item.people.length > 0 && <table>
          <tr>
            <th>Прозвішча</th>
            <th>Імя</th>
            <th>Месца працы</th>
          </tr>
          {
            item.people.map((person) => {
              const { attributes: { id, first_name, last_name, company } } = person;

              return <tr key={id}>
                <td>{last_name}</td>
                <td>{first_name}</td>
                <td>{company?.attributes?.name || ''}</td>
              </tr>
            })
          }
        </table>
      }
      <AddPersonForm>
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
        <button onClick={handleSubmit}>Дадаць</button>
      </AddPersonForm>
    </People>
    {
      item.areas.length > 0 && <Areas>
        <h3>Унутранныя аб'екты:</h3>
        {
          item.areas.map((area) => {
            const { attributes: { id, title } } = area;

            return <a key={id} onClick={() => changeSelectedArea(areaToPolygonObject(area))}>
              {
                `${title}`
              }
            </a>
          })
        }
      </Areas>
    }
  </Modal>
}
