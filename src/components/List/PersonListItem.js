import React from 'react';
import { ListItem, ItemImg, ItemColPrimary, ItemTitle, ItemSmall } from './Lists';

function PersonListItem({ person }) {
  return (
    <ListItem link={`/person/detail/${person.id}`}>
      <ItemImg src={person.profile_path} alt={person.name}></ItemImg>
      <ItemColPrimary>
        <ItemTitle link={`/person/detail/${person.id}`}>{person.name}</ItemTitle>
        <ItemSmall>{person.character || person.job}</ItemSmall>
      </ItemColPrimary>
    </ListItem>
  );
}

export default PersonListItem;
