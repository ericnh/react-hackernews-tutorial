import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

function Table({ list, onDismiss }) {
  return (
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
  )
};

Table.propTypes = {
  list: PropTypes.arrayOf(
            PropTypes.shape({
              objectID: PropTypes.string.isRequired,
              author: PropTypes.string,
              url: PropTypes.string,
              num_comments: PropTypes.number,
              points: PropTypes.number,
            })
            ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Table;
