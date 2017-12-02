import React from 'react';
import Button from '../Button';

const Table = ({ list, onDismiss }) =>
  <div className="table">
    { list.map( item =>
        <div key={ item.objectID } className="table-row">
          <span style={{ width: '40%' }} title ="View Page">
            <a href={ item.url } target="_blank" rel="noopener">{ item.title }</a>
          </span>
          <span style={{ width: '30%' }} title="Author">
            { item.author }
          </span>
          <span style={{ width: '10%' }} title="Comments">
            { item.num_comments }
          </span>
          <span style={{ width: '10%' }} title="Points">
            { item.points }
          </span>
          <span style={{ width: '10%' }} title="Dismiss Item">
            <Button
              className="button-inline"
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </Button>
          </span>
        </div>
    )}
  </div>

export default Table;
