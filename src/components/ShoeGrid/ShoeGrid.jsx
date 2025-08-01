import React from 'react';
import styled from 'styled-components';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeCard key={shoe.slug} {...shoe} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    & > *{
        flex: 1 1 300px;
    }
    & img{
        width: 100%;
    }
`;

export default ShoeGrid;
