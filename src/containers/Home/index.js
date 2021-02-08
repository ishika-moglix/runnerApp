import {
  Container,
  Card,
  Left,
  Body,
  Right,
  Icon,
  Title,
  CardItem,
  Button,
} from 'native-base';
import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import Header from '../../components/Header';

const data = [
  {
    title: 'Pick Up Details',
    route: 'Pickup',
    terms: [
      {
        title: 'Suppliers (Stops)',
        value: '03',
      },
      {
        title: 'Items',
        value: '13',
      },
    ],
  },
  {
    title: 'Delivery Details',
    route: 'Delivery',
    terms: [
      {
        title: 'Customers (Stops)',
        value: '02',
      },
      {
        title: 'Items',
        value: '12',
      },
    ],
  },
  {
    title: 'Returns',
    route: 'Return',
    terms: [
      {
        title: 'Stops',
        value: '02',
      },
      {
        title: 'Items',
        value: '12',
      },
    ],
  },
];

export default HomeScreen = (props) => {
  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  return (
    <Container style={{backgroundColor: '#F2F2F2'}}>
      <Header
        headertext={'Moglix Runner'}
        leftComponent={() => (
          <TouchableOpacity onPress={openDrawer}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../assets/menu.png')}
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          padding: 20,
        }}>
        <Card
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CardItem>
            <Icon type={'MaterialCommunityIcons'} name={'chevron-left'} />
          </CardItem>
          <CardItem>
            <Title style={{color: '#000'}}>TODAY</Title>
          </CardItem>
          <CardItem>
            <Icon type={'MaterialCommunityIcons'} name={'chevron-right'} />
          </CardItem>
        </Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {data.map((item, index) => (
            <Card key={index} style={{marginTop: 20, width: '48%'}}>
              <CardItem style={{paddingLeft: 12, paddingRight: 12}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate(item.route)}
                  style={{
                    width: '100%',
                    padding: 8,
                    borderRadius: 4,
                    backgroundColor: '#D9232D',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                    {item.title}
                  </Text>
                  <Icon
                    type={'MaterialCommunityIcons'}
                    name={'chevron-right'}
                    style={{
                      right: -12,
                      color: '#fff',
                    }}
                  />
                </TouchableOpacity>
              </CardItem>
              {item.terms.map((termItem, termIndex) => (
                <CardItem
                  key={termIndex}
                  style={{
                    paddingLeft: 12,
                    paddingRight: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold', color: '#000'}}>
                    {termItem.title}
                  </Text>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
                    {termItem.value}
                  </Text>
                </CardItem>
              ))}
            </Card>
          ))}
        </View>
      </View>
    </Container>
  );
};
