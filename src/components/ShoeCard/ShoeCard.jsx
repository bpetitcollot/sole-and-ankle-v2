import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' &&
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          }
        </Row>
        {variant !== 'default' &&
          <Flag variant={variant}>{variant === 'on-sale' ? 'Sale' : 'Just Released!'}</Flag>
        }
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
    position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img``;

const Row = styled.div`
  font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    color: ${props => props.onSale ? COLORS.gray[500] : 'inherit'};
    ${props => props.onSale && 'text-decoration: line-through;'}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.span`
    background-color: ${props => props.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
    color: white;
    font-weight: bold;
    padding: 8px 10px;
    border-radius: 2px;
    font-size: 14px;
    position: absolute;
    top: 8px;
    right: -2px;
`;

export default ShoeCard;
