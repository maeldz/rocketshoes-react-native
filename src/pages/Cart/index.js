import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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

class Cart extends React.Component {
  state = {
    scrollEnabled: false,
  };

  increment = product => {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(product.id, product.amount + 1);
  };

  decrement = product => {
    const { updateAmountRequest } = this.props;
    updateAmountRequest(product.id, product.amount - 1);
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    contentHeight > 480
      ? this.setState({ scrollEnabled: true })
      : this.setState({ scrollEnabled: false });
    this.setState({ contentHeight });

    this.checkScrollEnabled();
  };

  checkScrollEnabled = () => {
    this.props.cart.length > 3
      ? this._scrollView.scrollToEnd({ animated: false })
      : this._scrollView.scrollTo({ x: 0, y: 0, animated: false });
  };

  render() {
    const { cart, total, removeFromCart } = this.props;

    return (
      <CartContainer>
        {cart.length ? (
          <>
            <Products
              ref={ref => (this._scrollView = ref)}
              scrollEnabled={this.state.scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}>
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
                      onPress={() => removeFromCart(product.id)}>
                      <Icon
                        name="delete-forever"
                        color={colors.primary}
                        size={20}
                      />
                    </ProductRemoveButton>
                  </ProductInfo>
                  <ProductControls>
                    <ProductControlButton
                      onPress={() => this.decrement(product)}>
                      <Icon
                        name="remove-circle-outline"
                        color={colors.primary}
                        size={20}
                      />
                    </ProductControlButton>
                    <ProductAmount value={String(product.amount || 0)} />
                    <ProductControlButton
                      onPress={() => this.increment(product)}>
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
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.amount * product.price),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.amount * product.price;
    }, 0),
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
