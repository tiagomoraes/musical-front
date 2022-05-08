import React, { useMemo, useCallback, useEffect } from 'react';

import { getName } from '@utils/stems';
import useMultiAudio from '@hooks/useMultiAudio';

import { Button, GridContainer, TitleHighlight } from './Options.styles';

function Options({ options, selected, type, onOptionClick }) {
  const typeName = useMemo(() => getName(type), [type]);

  const urls = useMemo(
    () => options?.map((id) => `http://localhost:3001/play/${id}/${type}`),
    [options, type],
  );

  const [, toggle, stop] = useMultiAudio(urls);

  const handleOptionClick = useCallback(
    (id) => {
      const clickedIndex = options.indexOf(id);

      if (clickedIndex === -1) {
        return;
      }

      toggle(clickedIndex);
      onOptionClick(id);
    },
    [toggle, options, onOptionClick],
  );

  useEffect(() => {
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <GridContainer>
      {options?.map((id, index) => (
        <GridContainer key={id} selected={selected && selected === id}>
          <Button type="button" onClick={() => handleOptionClick(id)}>
            <TitleHighlight>Opção {index}</TitleHighlight>
            {typeName}
          </Button>
        </GridContainer>
      ))}
    </GridContainer>
  );
}

export default Options;
