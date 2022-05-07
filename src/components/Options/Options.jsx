import React from 'react';
import { Button, GridContainer, TitleHighlight } from './Options.styles';

function Options({ options, onOptionClick, type }) {
  // http://localhost:3001/play/:id/:stem
  // o id vai vir das options e o stem vai ser o type
  // ai cada botao vai tocar uma musica e ele seleciona a q quiser no final
  // acho q faz sentido o botao ser tipo uma checkbox q ele marca a opção escolhida

  return (
    <GridContainer>
      {options?.map(({ id, name, artist }) => (
        <GridContainer>
          <Button type="button" key={id} onClick={() => onOptionClick(id)}>
            <TitleHighlight>{name}</TitleHighlight>
            {artist}
          </Button>
          <Button type="button" key={id}>
            Tocar
          </Button>
        </GridContainer>
      ))}
    </GridContainer>
  );
}

export default Options;
