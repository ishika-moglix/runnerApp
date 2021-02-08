import React, {useState} from 'react';
import {View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import {
  Container,
  Header,
  Title,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';

export default VerificationScreen = (props) => {
  const [otp, setOtp] = useState('');

  const onVerify = () => {
    if (otp.length === 4) {
      props.route.params.setIsLoggedIn(true);
    }
  };

  return (
    <Container>
      <Header
        androidStatusBarColor={'#D9232D'}
        style={{
          backgroundColor: '#D9232D',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center',
          }}>
          <Title style={{textAlign: 'center'}}>Verification</Title>
        </View>
      </Header>
      <View style={{flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMode={'contain'}
            source={require('../../assets/moglix-logo.jpg')}
            style={{
              width: Dimensions.get('window').width * 0.4,
              height: Dimensions.get('window').width * 0.3,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: Dimensions.get('window').width * 0.1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}>
            <Label style={{marginBottom: 12}}>
              Enter OTP sent to {'\n'}
              +91 {props.route.params.phone}
            </Label>
            <Button transparent onPress={() => props.navigation.goBack()}>
              <Text style={{color: '#097EFF'}}>Edit Number</Text>
            </Button>
          </View>
          <Item regular>
            <Input
              keyboardType={'numeric'}
              maxLength={4}
              value={otp}
              onChangeText={(text) => setOtp(text)}
              style={{textAlign: 'center'}}
              placeholder="-      -      -      -"
            />
          </Item>
          <Button
            onPress={onVerify}
            block
            disabled={otp.length !== 4}
            style={{
              backgroundColor: otp.length === 4 ? '#2680EB' : '#C3C3C3',
              marginTop: 20,
            }}>
            <Text style={{color: '#fff'}}>VERIFY</Text>
          </Button>
          <Button
            style={{marginTop: 20, alignSelf: 'center'}}
            transparent
            // onPress={}
          >
            <Text style={{color: '#097EFF'}}>Resend OTP</Text>
          </Button>
          <Text
            style={{
              lineHeight: 20,
              alignSelf: 'center',
              textAlign: 'center',
              position: 'absolute',
              bottom: 40,
            }}>
            By continuing, you agree to our {'\n'}
            <Text style={{color: '#097EFF'}}>Privacy Policy</Text> and{' '}
            <Text style={{color: '#097EFF'}}>Terms and Condition</Text>
          </Text>
        </View>
      </View>
    </Container>
  );
};
