import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
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
        height: '10%',
        justifyContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#66C3AE',
          marginLeft: 8,
        }}
      >
        SUIVEZ-NOUS
      </Text>
    </View>
    <View
      style={{
        height: '10%',
        justifyContent: 'center',
        backgroundColor: '#B7B7B7',
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 14,
          marginLeft: 8,
        }}
      >
        Rejoignez Animal Testing sur les réseaux sociaux !
      </Text>
    </View>
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://animaltesting.fr/')}
          style={{
            backgroundColor: '#66C3AE',
            borderRadius: 50,
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="ios-link"
            style={{
              fontSize: 50,
              color: 'white',
            }}
          />
          <Text style={{ color: 'white' }}>Site</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://twitter.com/AnimalTestingFR')}
          style={{
            backgroundColor: '#66C3AE',
            borderRadius: 50,
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="logo-twitter"
            style={{
              fontSize: 50,
              color: 'white',
            }}
          />
          <Text style={{ color: 'white' }}>Twitter</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.instagram.com/animaltestingfr/')
          }
          style={{
            backgroundColor: '#66C3AE',
            borderRadius: 50,
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="logo-instagram"
            style={{
              fontSize: 50,
              color: 'white',
            }}
          />
          <Text style={{ color: 'white' }}>instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL('https://www.facebook.com/animaltestingfrance/')
          }
          style={{
            backgroundColor: '#66C3AE',
            borderRadius: 50,
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon
            name="logo-facebook"
            style={{
              fontSize: 50,
              color: 'white',
            }}
          />
          <Text style={{ color: 'white' }}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default withRouter(FollowUs);
