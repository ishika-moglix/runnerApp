import React from 'react';
import {Card, CardItem, Button, Icon} from 'native-base';
import {Text, TouchableOpacity} from 'react-native';

let data = [
  {title: 'Company', key: 'company'},
  {title: 'Address', key: 'address'},
  {title: 'City', key: 'city'},
  {title: 'State', key: 'state'},
  {title: 'Phone', key: 'phone'},
  {title: 'TIN', key: 'tin'},
  {title: 'GSTIN', key: 'gstin'},
  {title: 'State Code', key: 'stateCode'},
];

export default AddressCard = (props) => {
  return (
    <Card style={{marginBottom: 20, marginTop: 0}} transparent>
      <CardItem
        style={{
          backgroundColor: '#F8FAFF',
        }}>
        <Text style={{color: '#2680EB', fontSize: 16}}>{props.item.title}</Text>
      </CardItem>
      {data.map((item, index) => (
        <CardItem key={index}>
          <Text
            style={{
              width: '30%',
              fontWeight: index != 0 ? 'normal' : 'bold',
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              width: '10%',
              textAlign: 'center',
              fontWeight: index != 0 ? 'normal' : 'bold',
            }}>
            :
          </Text>
          <Text
            style={{
              width: '60%',
              fontWeight: index != 0 ? 'normal' : 'bold',
            }}>
            {props.item[item.key]}
          </Text>
        </CardItem>
      ))}
    </Card>
  );
};
