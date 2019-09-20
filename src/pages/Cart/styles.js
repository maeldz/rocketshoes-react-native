import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const CartContainer = styled.View`
  padding: 15px;
  margin: 20px;
  border-radius: 4px;
  background: #fff;
`;

export const Products = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  max-height: 75%;
`;

export const Product = styled.View`
  background: #fff;
  margin-bottom: 20px;
`;

export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ProductDetails = styled.View`
  flex: 1;
  padding: 10px;
`;

export const ProductTitle = styled.Text`
  font-size: 14px;
`;

export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
`;

export const ProductRemoveButton = styled.TouchableOpacity``;

export const ProductControls = styled.View`
  background: #eee;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin-top: 10px;
`;

export const ProductControlButton = styled.TouchableOpacity``;

export const ProductAmount = styled.TextInput`
  min-width: 52px;
  background: #fff;
  border-radius: 4px;
  padding: 5px;
  border: 1px solid #ddd;
  margin: 0 5px;
`;

export const ProductSubTotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;

export const TotalContainer = styled.View`
  margin: 10px 0 30px 0;
  align-items: center;
  text-align: center;
`;

export const TotalText = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #999;
`;

export const TotalPrice = styled.Text`
  font-weight: bold;
  font-size: 30px;
`;

export const FinishButton = styled.TouchableOpacity`
  background: ${colors.primary};
  border-radius: 4px;
  padding: 13px 0;
  align-items: center;
`;

export const FinishButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;

export const EmptyCart = styled.View`
  align-items: center;
`;

export const EmptyCartText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
`;
