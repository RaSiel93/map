import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';

export const ShowAreaModal = (props) => {
  const { isOpen, item, onClose } = props;

  return <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel='Прагляд тэрыторыі'
  >
    <div>
      <h2 htmlFor='title'>{item.number}</h2>
    </div>
    <div>
      <h4 htmlFor='description'>{item.notice}</h4>
    </div>
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
                `${last_name} ${first_name} - ${company?.attributes?.name}`
              }
            </li>
          })
        }
      </ul>
    </div>
  </Modal>
}
