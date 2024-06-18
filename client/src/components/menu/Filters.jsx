import { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FILTER_START_DATE, FILTER_INFO, FILTER_TAGS } from 'constants'
import { Button as CommonButton } from 'components/common/Button';
import { safeParseJson, compareTags } from 'utils/helper'

const Container = styled.div`
  display: flex;

  .Filters {
    gap: 8px;
    align-items: baseline;
    // flex-direction: column;
    // flex-wrap: wrap;
    display: flex;
    height: 36px;
    overflow-y: scroll;

    .Filter {
      input, label {
        cursor: pointer;
      }

      &:hover {
        color: #333;
      }
    }
  }
`

const Button = styled(CommonButton)`
  &:after {
    content: '::';
  }
`

const Filters = ({ tags }) => {
  const [startDateFilter, setStartDateFilter] = useState(localStorage.getItem(FILTER_START_DATE) === 'true')
  const [infoFilter, setInfoFilter] = useState(localStorage.getItem(FILTER_INFO) === 'true')
  const [tagsFilter, setTagsFilter] = useState(safeParseJson(localStorage.getItem(FILTER_TAGS), []) || [])

  const [isActive, setActive] = useState(false)

  const changeStartDateFilter = () => {
    setStartDateFilter(!startDateFilter)
    localStorage.setItem(FILTER_START_DATE, !startDateFilter)
  }

  const changeInfoFilter = () => {
    setInfoFilter(!infoFilter)
    localStorage.setItem(FILTER_INFO, !infoFilter)
  }

  const onClick = () => {
    setActive(!isActive)
  }

  const toogleTagsFilter = (key, value) => {
    if (tagsFilter.some(compareTags(key, value))) {
      setTagsFilter((tags) => {
        const filteredTags = [...tags.filter(([key2, value2]) => (key !== key2) || (value !== value2))]

        localStorage.setItem(FILTER_TAGS, JSON.stringify(filteredTags))

        return filteredTags
      })
    } else {
      setTagsFilter((tags) => {
        const filteredTags = [
          ...tags,
          [key, value]
        ]

        localStorage.setItem(FILTER_TAGS, JSON.stringify(filteredTags))

        return filteredTags
      })
    }
  }

  const idFromTag = (key, value) => `${key}_${value}`

  console.log('tags', tags)

  return (
    <Container>
      <Button onClick={onClick} title="Фільтры" className={isActive ? 'active' : ''}></Button>
      {
        isActive && (
          <div className="Filters">
            <div className='FilterGroup'>
              <div className="Filter">
                <input type="checkbox" id="startDate" checked={startDateFilter} onChange={changeStartDateFilter}/>
                <label htmlFor="startDate">Бяз&nbsp;даты</label>
              </div>
              <div className="Filter">
                <input type="checkbox" id="info" checked={infoFilter} onChange={changeInfoFilter}/>
                <label htmlFor="info">Інфармацыя</label>
              </div>
            </div>
            {
              tags.map(({ attributes: { name: key, options } }, index) => {
                return (
                  <div className='FilterGroup' key={index}>
                    {
                      options.map(({ attributes: { name: value }}, index) => {
                        return (
                          <div key={index}>
                            <input id={idFromTag(key, value)} type='checkbox' onChange={() => toogleTagsFilter(key, value)} checked={tagsFilter.some(compareTags(key, value))}></input>
                            <label htmlFor={idFromTag(key, value)}>{idFromTag(key, value)}</label>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        )
      }
    </Container>
  )
}

export default connect(
  (state) => ({
    tags: state.main.tags,
  }),
  (dispatch) => ({
  })
)(Filters)

