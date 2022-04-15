import React from 'react';
import ReactDOM from 'react-dom';
import { List, ItemImg, ListItem, ItemColPrimary, ItemTitle, ItemSmall } from '../List/Lists';

import './modalSearch.scss';

function ModalSearch({ content }) {
  return ReactDOM.createPortal(
    <div className="react-portal container">
      <div className="modal">
        <h1>{content.length} Search Results</h1>
        <div className="modal-content">
          <List>
            {content.map((item, index) => (
              <ListItem link={`/${item.mediaType}/detail/${item.id}`} key={index}>
                <ItemImg src={item.image} variant="large"></ItemImg>
                <ItemColPrimary>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemSmall>{item.overview}</ItemSmall>
                </ItemColPrimary>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
}

export default ModalSearch;
