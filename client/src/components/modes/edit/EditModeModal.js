import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select/creatable'
import { SpinnerCircular } from 'spinners-react'
import { connect } from 'react-redux'

import { Modal } from 'components/common/Modal'
import { modes } from 'constants'
import { getArea, removeArea, updateArea } from 'api'
import {
  toggleMode,
  removeAreaData,
  updateAreaData,
  setSelectedAreaData
} from 'store/actions'
import { areaToPolygonObject } from 'services/deckGl'
import styled from 'styled-components'
import { formatInputDate, formatInputDatetime } from 'utils/helper'

const ENTER_KEY = 'Enter'

const Tag = styled.div`
  display: flex;
  flex-direction: row;

  .TagKey {
    flex-grow: 1;
    flex-basis: 0;
  }

  .TagValue {
    flex-grow: 1;
    flex-basis: 0;
  }

  .RemoveTag {
    flex-basis: 30px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: hsl(0, 0%, 80%);
    cursor: pointer;
  }
`

const AddTagButton = styled.button`
  width: 100%;
  border: none;
  padding: 4px;
  cursor: pointer;
`

const EditModeModal = (props) => {
  const {
    id,
    mode,
    areasData,
    companies,
    toggleMode,
    updateAreaData,
    removeAreaData,
    setSelectedAreaData,
    tags,
  } = props

  const [area, setArea] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [areaId, setAreaId] = useState(null)
  const [companyId, setCompanyId] = useState(null)
  const [peopleCount, setPeopleCount] = useState(null)
  const [areaOptions, setAreaOptions] = useState([])
  const [companyOptions, setCompanyOptions] = useState([])
  const [startAt, setStartAt] = useState(null)
  const [endAt, setEndAt] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  // const [tagOptions, setTagOptions] = useState([])
  // const [selectedTags, setSelectedTags] = useState([])
  const [tagKeyOptions, setTagKeyOptions] = useState([])
  const [tagValuesOptions, setTagValuesOptions] = useState([])

  useEffect(() => {
    setAreaOptions([
      { value: '', label: 'Знаходзіцца ў' },
      ...areasData.map(areaData => (
        { value: areaData.id, label: areaData.number }
      ))
    ])
    setCompanyOptions([
      { value: '', label: 'Знаходзіцца кампанія' },
      ...companies.map(company => (
        { value: +company.id, label: company.name }
      ))
    ])

    setTagKeyOptions([
      ...tags.map(({ id, name }) => ({ value: id, label: name }))
    ])
    setTagValuesOptions([
      ...tags.map(({ id, name, options }) => {
        return { id: id, options: [...options.map(({ id, name, label }) => ({ value: id, label: name }))] }
      })
    ])
  }, [areasData, companies, tags])

  const onRequestClose = () => {
    toggleMode(modes.EDIT)
  }

  const extractTags = ({ id, area_id, key: { id: keyId }, value: { id: valueId } }) => ({ id, area_id, tag_key_id: keyId, tag_value_id: valueId })

  useEffect(async () => {
    const area = await getArea(id)
    const { title, description, area_id, people_count, company_id, start_at, end_at, tags } = area

    setArea(area)

    setTitle(title)
    setDescription(description)
    setAreaId(area_id)
    setCompanyId(company_id)
    setPeopleCount(people_count)
    setStartAt(start_at)
    setEndAt(end_at)
    // setSelectedTags(tags.map(({ attributes: { id, key, value }}) => ({ value: id, label: `${key}:${value}` })))
    // setTagKeys(tags)
    setSelectedTags(tags.map(extractTags))
  }, [id])

  const handleUpdateArea = async () => {
    const params = {
      area: {
        title,
        description,
        area_id: areaId,
        company_id: companyId,
        people_count: peopleCount,
        start_at: startAt,
        end_at: endAt,
        tags_attributes: selectedTags
      }
    }
    const area = await updateArea(id, params)

    updateAreaData(areaToPolygonObject(area))
    toggleMode(modes.EDIT)
  }

  console.log('selectedTags', selectedTags)
  // console.log('tagKeyOptions', tagKeyOptions)
  // console.log('tagValuesOptions', tagValuesOptions)

  const handleRemoveArea = async () => {
    if (window.confirm("Вы ўпэўнены, што жадаеце выдаліць аб'ект?")) {
      await removeArea(id)

      removeAreaData(id)
      setSelectedAreaData(null)
      toggleMode(modes.EDIT)
    }
  }

  const onAddTag = () => {
    setSelectedTags([
      ...selectedTags,
      {
        tag_key_id: null,
        tag_value_id: null
      }
    ])
  }

  const onTagKeyChange = (index, option) => {
    if (selectedTags[index]['tag_key_id'] != option.value) {
      setSelectedTags([
        ...selectedTags.slice(0, index),
        {
          ...selectedTags[index],
          tag_key_id: option.value,
          tag_value_id: null
        },
        ...selectedTags.slice(index + 1, selectedTags.length)
      ])
    }
  }

  const onTagValueChange = (index, option) => {
    if (selectedTags[index]['tag_value_id'] != option.value) {
      setSelectedTags([
        ...selectedTags.slice(0, index),
        {
          ...selectedTags[index],
          tag_value_id: option.value
        },
        ...selectedTags.slice(index + 1, selectedTags.length)
      ])
    }
  }

  const onTagRemove = (index) => {
    setSelectedTags([
      ...selectedTags.slice(0, index),
      {
        ...selectedTags[index],
        _destroy: true
      },
      ...selectedTags.slice(index + 1, selectedTags.length)
    ])
  }

  if (area) {
    return <Modal
      isOpen={mode === modes.EDIT}
      onRequestClose={onRequestClose}
      contentLabel='Рэдагаванне тэрыторыі'
    >
      <div>
        <input
          id='title'
          value={title}
          placeholder='Назва'
          onChange={(e) => { setTitle(e.target.value) }}
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
        ></input>
      </div>
      <div>
        <textarea
          id='description'
          value={description || ''}
          onChange={(e) => { setDescription(e.target.value) }}
          placeholder='Апісанне'
          cols='50'
          rows='10'
        ></textarea>
      </div>
      <div>
        <Select
          name='areaId'
          value={areaOptions.find(option => (option.value === areaId))}
          onChange={option => setAreaId(option.value)}
          options={areaOptions}
        />
      </div>
      <div>
        <Select
          name='companyId'
          value={companyOptions.find(option => (option.value === companyId))}
          onChange={option => setCompanyId(option.value)}
          options={companyOptions}
        />
      </div>
      <div>
        <input
          id='peopleCount'
          type='number'
          min={0}
          value={peopleCount || ''}
          placeholder='Колькасць жыхароў'
          onChange={(e) => { setPeopleCount(e.target.value) }}
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
        ></input>
      </div>
      <div className='Dates'>
        <input
          id='startAt'
          // type='date'
          type="datetime-local"
          // value={startAt}
          value={formatInputDatetime(startAt)}
          placeholder='Дата пачатку'
          onChange={(e) => { setStartAt(e.target.value) }}
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
        ></input>
        <input
          id='endAt'
          type="datetime-local"
          // type='date'
          value={formatInputDatetime(endAt)}
          // value={endAt}
          placeholder='Дата сканчэньня'
          onChange={(e) => { setEndAt(e.target.value) }}
          onKeyDown={({ key }) => (key === ENTER_KEY) && handleUpdateArea()}
        ></input>
      </div>
      <div>
        <div>Тэгі:</div>
        {
          selectedTags.filter(({ _destroy }) => !_destroy).map(({ tag_key_id: keyId, tag_value_id: valueId }, index) => {
            const tagValueOptions = tagValuesOptions.find(({ id }) => id == keyId)?.options

            const tagKeyOption = tagKeyOptions.find(({ value }) => value == keyId) || null
            const tagValueOption = tagValueOptions?.find(({ value }) => (value == valueId) || '' ) || null

            return (
              <Tag key={index}>
                <Select
                  className='TagKey'
                  menuPlacement='top'
                  value={tagKeyOption}
                  onChange={(option) => onTagKeyChange(index, option)}
                  options={tagKeyOptions}
                  placeholder='Ключ'
                />
                <Select
                  className='TagValue'
                  menuPlacement='top'
                  value={tagValueOption}
                  onChange={(option) => onTagValueChange(index, option)}
                  options={tagValueOptions}
                  placeholder='Значэньне'
                />
                <div className='RemoveTag' onClick={() => onTagRemove(index)}>x</div>
              </Tag>
            )
          })
        }
        <AddTagButton onClick={onAddTag}>Дадаць тэг</AddTagButton>
        <br/>
        <br/>
        {/* <Select
          name='tags'
          value={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
          isMulti
          placeholder='Тэгі'
        />
        <Select
          name='tags'
          value={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
          isMulti
          placeholder='Тэгі'
        /> */}
      </div>
      {/* <textarea
        id='description'
        value={description || ''}
        onChange={(e) => { setDescription(e.target.value) }}
        placeholder='Апісанне'
        cols='50'
        rows='10'
      ></textarea> */}
      <div className='Actions'>
        <button className='Remove' onClick={handleRemoveArea}>Выдаліць</button>
        <button onClick={handleUpdateArea}>Прыняць</button>
      </div>
    </Modal>
  } else {
    return <Modal
      isOpen={mode === modes.EDIT}
      onRequestClose={onRequestClose}
      contentLabel='Рэдагаванне тэрыторыі'
    >
      <SpinnerCircular size={50} thickness={180} speed={280} color="rgba(0, 0, 0, 1)" secondaryColor="rgba(255, 255, 255, 1)" />
    </Modal>
  }
}

EditModeModal.propTypes = {
  id: PropTypes.number,
  mode: PropTypes.string,
  areasData: PropTypes.array,
  companies: PropTypes.array,
  setSelectedAreaData: PropTypes.array,
  toggleMode: PropTypes.func,
  updateAreaData: PropTypes.func,
  removeAreaData: PropTypes.func,
}

export default connect(
  (state) => ({
    mode: state.main.mode,
    id: state.main.selectedAreaData.id,
    areasData: state.main.areasData,
    companies: state.main.companies,
    tags: state.main.tags,
  }),
  {
    toggleMode,
    updateAreaData,
    removeAreaData,
    setSelectedAreaData,
  }
)(EditModeModal)
