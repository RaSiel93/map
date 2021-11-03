import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { SpinnerCircular } from 'spinners-react';
import { connect } from 'react-redux';

import { Modal } from 'src/components/common/Modal';
import { modes } from 'src/constants';
import { getArea, createArea, removeArea, createPerson } from 'src/api';
import { toggleMode, addAreaData, removeAreaData, setSelectedAreaData } from 'src/store/actions';
import { areaToPolygonObject } from 'src/services/deckGl';

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

export const ShowModeModal = (props) => {
  const {
    id,
    mode,
    companies,
    addAreaData,
    removeAreaData,
    toggleMode,
    setSelectedAreaData,
    areasData,
  } = props;

  const [area, setArea] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [childAreaTitle, setChildAreaTitle] = useState('');
  const [companyOptions, setCompanyOptions] = useState([]);

  const resetPersonFields = () => {
    setFirstName('');
    setLastName('');
    setCompanyId('');
  }

  const resetFields = () => {
    resetPersonFields();
    setChildAreaTitle('');
  };

  useEffect(() => {
    resetFields();

    setCompanyOptions([
      { value: '', label: 'Месца працы' },
      ...companies.map(company => (
        { value: company.id, label: company.attributes.name }
      ))
    ]);
  }, []);

  const handleCreatePerson = async () => {
    const params = {
      person: {
        first_name: firstName,
        last_name: lastName,
        area_id: area.id,
        company_id: companyId,
      }
    };
    const token = document.querySelector('[name=csrf-token]').content;

    const person = await createPerson(params, token);

    setArea({
      ...area,
      attributes: {
        ...area.attributes,
        people: [...area.attributes.people, person],
        added_people_count: area.attributes.added_people_count + 1,
      }
    });

    resetFields();
  }

  const handleCreateArea = async () => {
    const params = {
      title: childAreaTitle,
      area_id: id,
    };
    const token = document.querySelector('[name=csrf-token]').content;

    const child = await createArea(params, token);

    addAreaData(areaToPolygonObject(child));

    setArea({
      ...area,
      attributes: {
        ...area.attributes,
        areas: [...area.attributes.areas, child],
      }
    });
    setChildAreaTitle('');
  }

  const handleRemoveArea = async (id) => {
    if (confirm("Вы ўпэўнены, што жадаеце выдаліць аб'ект?")) {
      const token = document.querySelector('[name=csrf-token]').content;

      const child = await removeArea(id, token);

      setArea({
        ...area,
        attributes: {
          ...area.attributes,
          areas: area.attributes.areas.filter(({ id }) => id !== child.id),
        }
      });
      removeAreaData(child.id);
    }
  }

  const onRequestClose = () => {
    toggleMode(modes.SHOW);
  }

  useEffect(async () => {
    const area = await getArea(id);

    setArea(area);
  }, [id]);

  const changeArea = (id) => {
    setArea(null);
    resetFields();
    setSelectedAreaData(areasData.find((areaData) => (areaData.id === id)));
  }

  if (area) {
    const {
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
      isOpen={mode === modes.SHOW}
      onRequestClose={onRequestClose}
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
            <tbody>
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
            </tbody>
          </table>
        }
        <AddPersonForm>
          <input
            id='lastName'
            value={lastName}
            placeholder='Прозвішча'
            onChange={(e) => { setLastName(e.target.value) }}
            onKeyDown={({ key }) => (key === ENTER_KEY) && handleCreatePerson()}
          ></input>
          <input
            id='firstName'
            value={firstName}
            placeholder='Імя'
            onChange={(e) => { setFirstName(e.target.value) }}
            onKeyDown={({ key }) => (key === ENTER_KEY) && handleCreatePerson()}
          ></input>
          <Select
            name='companyId'
            value={companyOptions.find(option => (option.value === companyId))}
            onChange={option => setCompanyId(option.value)}
            options={companyOptions}
          />
          <button onClick={handleCreatePerson}>Дадаць</button>
        </AddPersonForm>
      </People>
      {
        parent && <Areas>
          <h3>Знешні аб&apos;ект:</h3>
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
        <h3>Унутранныя аб&apos;екты:</h3>
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

                    handleRemoveArea(id);
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
            value={childAreaTitle}
            placeholder='Назва'
            onChange={(e) => { setChildAreaTitle(e.target.value) }}
            onKeyDown={({ key }) => (key === ENTER_KEY) && handleCreateArea()}
          ></input>
          <button onClick={handleCreateArea}>Дадаць</button>
        </AddAreaForm>
      </Areas>
    </Modal>
  } else {
    return <Modal
      isOpen={mode === modes.SHOW}
      onRequestClose={onRequestClose}
      contentLabel='Прагляд тэрыторыі'
    >
      <SpinnerCircular size={50} thickness={180} speed={280} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(255, 255, 255, 1)" />
    </Modal>
  }
}

ShowModeModal.propTypes = {
  id: PropTypes.number,
  mode: PropTypes.string,
  companies: PropTypes.array,
  areasData: PropTypes.array,
  addAreaData: PropTypes.func,
  removeAreaData: PropTypes.func,
  toggleMode: PropTypes.func,
  setSelectedAreaData: PropTypes.func,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    id: state.main.selectedAreaData.id,
    companies: state.main.companies,
    areasData: state.main.areasData,
  }),
  {
    toggleMode,
    addAreaData,
    removeAreaData,
    setSelectedAreaData,
  }
)(ShowModeModal);
