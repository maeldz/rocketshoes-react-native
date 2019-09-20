import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../util/format';
import colors from '../../styles/colors';

import {
  CartContainer,
  Products,
  Product,
  ProductImage,
  ProductInfo,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductRemoveButton,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubTotal,
  TotalContainer,
  TotalText,
  TotalPrice,
  FinishButton,
  FinishButtonText,
  EmptyCart,
  EmptyCartText,
} from './styles';

export default function Cart() {
  let _scrollView;
  const [scrollEnable, setScrollEnable] = useState(false);

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.amount * product.price),
    })),
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.amount * product.price;
      }, 0),
    ),
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function onContentSizeChange(contentWidth, contentHeight) {
    contentHeight > 480 ? setScrollEnable(true) : setScrollEnable(false);

    checkScrollEnabled();
  }

  function checkScrollEnabled() {
    cart.length > 3
      ? _scrollView.scrollToEnd({ animated: false })
      : _scrollView.scrollTo({ x: 0, y: 0, animated: false });
  }

  return (
    <CartContainer>
      {cart.length ? (
        <>
          <Products
            ref={ref => (_scrollView = ref)}
            scrollEnabled={scrollEnable}
            onContentSizeChange={onContentSizeChange}>
            {cart.map(product => (
              <Product key={product.id}>
                <ProductInfo>
                  <ProductImage
                    source={{
                      uri: product.image,
                    }}
                  />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{formatPrice(product.price)}</ProductPrice>
                  </ProductDetails>
                  <ProductRemoveButton
                    onPress={() =>
                      dispatch(CartActions.removeFromCart(product.id))
                    }>
                    <Icon
                      name="delete-forever"
                      color={colors.primary}
                      size={20}
                    />
                  </ProductRemoveButton>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton onPress={() => decrement(product)}>
                    <Icon
                      name="remove-circle-outline"
                      color={colors.primary}
                      size={20}
                    />
                  </ProductControlButton>
                  <ProductAmount value={String(product.amount || 0)} />
                  <ProductControlButton onPress={() => increment(product)}>
                    <Icon
                      name="add-circle-outline"
                      color={colors.primary}
                      size={20}
                    />
                  </ProductControlButton>
                  <ProductSubTotal>{product.subtotal}</ProductSubTotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalPrice>{total}</TotalPrice>
          </TotalContainer>
          <FinishButton>
            <FinishButtonText>FINALIZAR PEDIDO</FinishButtonText>
          </FinishButton>
        </>
      ) : (
        <EmptyCart>
          <Icon name="remove-shopping-cart" color="#ddd" size={60} />
          <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
        </EmptyCart>
      )}
    </CartContainer>
  );
}
