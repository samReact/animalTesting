import React from 'react';
import { Linking } from 'react-native';
import { withRouter } from 'react-router-native';
import { Text, View, Icon } from 'native-base';

const FollowUs = () => (
  <View
    style={{
      flex: 1,
    }}
  >
    <View
      style={{
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: 'rgb(102, 195, 174)',
          height: 40,
          textAlignVertical: 'center',
          margin: 8,
        }}
      >
        SUIVEZ-NOUS
      </Text>
      <Text
        style={{
          backgroundColor: 'rgb(183, 183, 183)',
          fontWeight: 'bold',
          fontSize: 14,
          height: 60,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
      >
        Rejoignez Animal Testing sur les réseaux sociaux !
      </Text>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 120 / 2,
          backgroundColor: '#66C3AE',
          marginTop: 40,
        }}
      >
        <Icon
          onPress={() => Linking.openURL('https://animaltesting.fr/')}
          name="ios-link"
          style={{
            fontSize: 40,
            textAlign: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: 20,
          }}
        />
        <Text style={{ color: 'white', textAlign: 'center' }}>Site</Text>
      </View>
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 120 / 2,
          backgroundColor: '#66C3AE',
          marginTop: 40,
        }}
      >
        <Icon
          onPress={() => Linking.openURL('https://twitter.com/AnimalTestingFR')}
          name="logo-twitter"
          style={{
            fontSize: 40,
            textAlign: 'center',
            textAlignVertical: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: 20,
          }}
        />
        <Text style={{ color: 'white', textAlign: 'center' }}>Twitter</Text>
      </View>
    </View>
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 40,
      }}
    >
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 120 / 2,
          backgroundColor: '#66C3AE',
        }}
      >
        <Icon
          onPress={() =>
            Linking.openURL('https://www.instagram.com/animaltestingfr/')
          }
          name="logo-instagram"
          style={{
            fontSize: 40,
            textAlign: 'center',
            textAlignVertical: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: 20,
          }}
        />
        <Text style={{ color: 'white', textAlign: 'center' }}>Instagram</Text>
      </View>

      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 120 / 2,
          backgroundColor: '#66C3AE',
        }}
      >
        <Icon
          onPress={() =>
            Linking.openURL('https://www.facebook.com/animaltestingfrance/')
          }
          name="logo-facebook"
          style={{
            fontSize: 40,
            textAlign: 'center',
            justifyContent: 'center',
            color: 'white',
            marginTop: 20,
          }}
        />
        <Text style={{ color: 'white', textAlign: 'center' }}>Facebook</Text>
      </View>
    </View>
  </View>
);

export default withRouter(FollowUs);
