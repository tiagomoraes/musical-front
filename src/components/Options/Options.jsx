import React from 'react';

import { Button, GridContainer, TitleHighlight } from './Options.styles';

function Options({ options, selected, type, onOptionClick }) {
  // TODO: Shuffle the options for production
  return (
    <GridContainer>
      {options?.map((id, index) => (
        <GridContainer key={id}>
          <Button
            type="button"
            onClick={() => onOptionClick(id)}
            selected={selected === id}
          >
            <TitleHighlight>Opção {index}</TitleHighlight>
          </Button>
        </GridContainer>
      ))}
    </GridContainer>
  );
}

export default Options;
