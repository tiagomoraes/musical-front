import React from 'react';
import { Button, GridContainer, TitleHighlight } from './Options.styles';

function Options({ options, onOptionClick }) {
  return (
    <GridContainer>
      {options?.map(({ id, name, artist }) => (
        <Button type="button" key={id} onClick={() => onOptionClick(id)}>
          <TitleHighlight>{name}</TitleHighlight>
          {artist}
        </Button>
      ))}
    </GridContainer>
  );
}

export default Options;
