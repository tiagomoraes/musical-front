import React from 'react';

import { Button, GridContainer, TitleHighlight } from './Options.styles';

function Options({ options, selected, onOptionClick }) {
  return (
    <GridContainer>
      {options?.map((id, index) => (
        <GridContainer key={id}>
          <Button
            type="button"
            onClick={() => onOptionClick(id)}
            selected={selected === id}
          >
            <TitleHighlight>Opção {index + 1}</TitleHighlight>
          </Button>
        </GridContainer>
      ))}
    </GridContainer>
  );
}

export default Options;
