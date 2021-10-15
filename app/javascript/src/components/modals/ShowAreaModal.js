import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import styled from 'styled-components';
import { areaToPolygonObject } from '../../services/deckGl';
import { getArea } from '../../api/area';
import Select from 'react-select';
import { SpinnerCircular } from 'spinners-react';

const Description = styled.div`
  border: solid 1px #555;
  padding: 5px;

  h3 {
    margin: 0;
    padding: 5px;
  }

  p span {
    display: block;
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
    border-spacing: 0;
    padding: 0;
  }

  tr, td, th {
    border: 1px solid #555;
    padding: 5px;
  }
`;

const AddPersonForm = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;

  input, &>div {
    width: 200px;
    flex-grow: 1;
  }
`;

const AddAreaForm = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  input, &>div {
    width: 200px;
    flex-grow: 1;
  }
`;

const Areas = styled.div`
  border: solid 1px #555;
  padding: 5px;

  h3 {
    margin: 0;
    padding: 5px;
  }

  .areas {
    a {
      display: block;
      border: 1px solid #555;
      cursor: pointer;
      padding: 5px;
      background-color: #ddd;
      position: relative;
      height: 18px;

      &:hover {
        background-color: #eee;
      }

      .delete {
        position: absolute;
        right: 10px;

        &:hover {
          color: #666;
        }
      }
    }
  }
`;

const ENTER_KEY = 'Enter';

export const ShowAreaModal = (props) => {
  const {
    id,
    isOpen,
    onClose,
    onAddArea,
    onSubmit,
    onDeleteArea,
    companies,
    changeSelectedArea
  } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [area, setArea] = useState(null);
  const [childTitle, setChildTitle] = useState('');

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setCompanyId('');
    setChildTitle('');
  }

  const handleSubmit = () => {
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      area_id: area.id,
      company_id: companyId,
    }).then((person) => {
      setArea({
        ...area,
        attributes: {
          ...area.attributes,
          people: [...area.attributes.people, person],
          added_people_count: area.attributes.added_people_count + 1,
        }
      });
    });
  }

  const handleAddArea = () => {
    onAddArea({
      title: childTitle,
      area_id: area.id,
    }).then((child) => {
      setArea({
        ...area,
        attributes: {
          ...area.attributes,
          areas: [...area.attributes.areas, child],
        }
      });
    })
  }

  const handleDeleteArea = (id) => {
    if (confirm("Вы ўпэўнены, што жадаеце выдаліць аб'ект?")) {
      onDeleteArea({ id }).then((child) => {
        setArea({
          ...area,
          attributes: {
            ...area.attributes,
            areas: area.attributes.areas.filter(area => area.id !== child.id),
          }
        });
      });
    }
  }

  useEffect(async () => {
    const area = await getArea(id);

    setArea(area);
  }, [id]);

  useEffect(() => {
    resetFields();
  }, [area?.attributes?.people, area?.attributes?.areas]);

  const changeArea = (id) => {
    setArea(null);
    changeSelectedArea(id);
  }

  if (area) {
    const companyOptions = [
      { value: '', label: 'Месца працы' },
      ...companies.map(company => ({ value: company.id, label: company.attributes.name }))
    ];

    const {
      id,
      attributes: {
        title,
        description,
        notes,
        added_people_count,
        people_count,
        estimated_people_count,
        people,
        parent,
        areas,
      }
    } = area;

    return <Modal
      isOpen={isOpen}
      onAfterOpen={resetFields}
      onRequestClose={onClose}
      contentLabel='Прагляд тэрыторыі'
    >
      <div>
        <h2 htmlFor='title'>{title}</h2>
      </div>
      {
        description && <Description>
          <h3>Апісанне:</h3>
          <p>
            {description.split(/\n/).map((line, index) => {
              return <span key={index}>{line}</span>;
            })}
          </p>
        </Description>
      }
      {
        notes.length > 0 && <Notes>
          <h3>Нататкі:</h3>
          <ul>
            {
              notes.map((note) => {
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
            Колькасць жыхароў: ({added_people_count}/{people_count}/{estimated_people_count})
          </h5>
        </div>
        {
          people.length > 0 && <table>
            <tr>
              <th>Прозвішча</th>
              <th>Імя</th>
              <th>Месца працы</th>
            </tr>
            {
              people.map((person) => {
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
            onKeyDown={({ key }) => (key === ENTER_KEY) && handleSubmit()}
          ></input>
          <input
            id='firstName'
            value={firstName}
            placeholder='Імя'
            onChange={(e) => { setFirstName(e.target.value) }}
            onKeyDown={({ key }) => (key === ENTER_KEY) && handleSubmit()}
          ></input>
          <Select
            name='companyId'
            value={companyOptions.find(option => (option.value === companyId))}
            onChange={option => setCompanyId(option.value)}
            options={companyOptions}
          />
          <button onClick={handleSubmit}>Дадаць</button>
        </AddPersonForm>
      </People>
      {
        parent && <Areas>
          <h3>Знешні аб'ект:</h3>
          <div className='areas'>
            {
              [parent].map((area) => {
                const { attributes: { id, title } } = area;

                return <a key={id} onClick={() => changeArea(id)}>
                  {
                    `${title}`
                  }
                </a>
              })
            }
          </div>
        </Areas>
      }
      <Areas>
        <h3>Унутранныя аб'екты:</h3>
        {
          areas.length > 0 && <div className='areas'>
            {
              areas.map((area) => {
                const { attributes: { id, title } } = area;

                return <a key={id} onClick={() => changeArea(id)}>
                  {
                    `${title}`
                  }
                  <span className='delete' onClick={(e) => {
                    e.stopPropagation();

                    handleDeleteArea(id);
                  }}
                  >x</span>
                </a>
              })
            }
          </div>
        }
        <AddAreaForm>
          <input
            id='title'
            value={childTitle}
            placeholder='Назва'
            onChange={(e) => { setChildTitle(e.target.value) }}
            onKeyDown={({ key }) => (key === ENTER_KEY) && handleAddArea()}
          ></input>
          <button onClick={handleAddArea}>Дадаць</button>
        </AddAreaForm>
      </Areas>
    </Modal>
  } else {
    return <Modal
      isOpen={isOpen}
      onAfterOpen={resetFields}
      onRequestClose={onClose}
      contentLabel='Прагляд тэрыторыі'
    >
      <SpinnerCircular size={50} thickness={180} speed={280} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(255, 255, 255, 1)" />
    </Modal>
  }
}
