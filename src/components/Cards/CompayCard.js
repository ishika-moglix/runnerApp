import React from 'react';
import {Card, CardItem, Button, Icon} from 'native-base';
import {Text, TouchableOpacity} from 'react-native';

export default CompanyCard = (props) => {
  return (
    <Card style={{marginTop: 20}}>
      <CardItem
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        }}>
        <Text>{props.item.company}</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Address', {
              company: props.item.company,
            })
          }>
          <Text
            style={{
              color: '#2680EB',
            }}>
            Address
          </Text>
        </TouchableOpacity>
      </CardItem>
      <CardItem
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>
          Items :
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {' '}
            {props.item.items}
          </Text>
        </Text>
        <Icon type={'MaterialCommunityIcons'} name={'chevron-right'} />
      </CardItem>
      <CardItem>
        <Button
          iconLeft
          iconRight
          block
          style={{
            width: '100%',
            borderRadius: 4,
            backgroundColor: '#4DA116',
          }}>
          <Icon
            style={{color: '#fff'}}
            type={'MaterialCommunityIcons'}
            name={'chevron-double-right'}
          />
          <Text style={{fontSize: 20, color: '#fff'}}>START</Text>
          <Icon
            style={{color: '#fff'}}
            type={'MaterialCommunityIcons'}
            name={'chevron-double-right'}
          />
        </Button>
      </CardItem>
    </Card>
  );
};
