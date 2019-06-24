import React from 'react';
import { Linking, TouchableOpacity, Platform, Alert } from 'react-native';
import { withRouter } from 'react-router-native';
import { Text, View, Icon } from 'native-base';
import Constants from 'expo-constants';

class FollowUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { socialId: '', websiteUrl: '' };
  }

  async componentDidMount() {
    const { socialId, websiteUrl, facebookId } = global.config;
    this.setState({
      socialId,
      websiteUrl,
      facebookId,
    });
  }

  render() {
    const { manifest } = Constants;
    const { socialId, websiteUrl, facebookId } = this.state;

    return (
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
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              onPress={() => Linking.openURL(websiteUrl)}
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
              onPress={() => {
                if (Platform.OS === 'android') {
                  const FANPAGE_URL_FOR_APP = `twitter://app/${socialId}/`;
                  const FANPAGE_URL_FOR_BROWSER = `https://twitter.com/${socialId}/`;
                  Linking.canOpenURL(FANPAGE_URL_FOR_APP)
                    .then(supported => {
                      if (!supported) {
                        Linking.openURL(FANPAGE_URL_FOR_BROWSER);
                      } else {
                        Linking.openURL(FANPAGE_URL_FOR_APP);
                      }
                    })
                    .catch(err => console.error('An error occurred', err));
                  // run your code here
                }
              }}
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

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              onPress={() => {
                const FANPAGE_URL_FOR_APP = `instagram://app/${socialId}/`;
                const FANPAGE_URL_FOR_BROWSER = `https://www.instagram.com/${socialId}/`;
                Linking.canOpenURL(FANPAGE_URL_FOR_APP)
                  .then(supported => {
                    if (!supported) {
                      Linking.openURL(FANPAGE_URL_FOR_BROWSER);
                    } else {
                      Linking.openURL(FANPAGE_URL_FOR_APP);
                    }
                  })
                  .catch(err => Alert.alert('Erreur', err));
              }}
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
              <Text style={{ color: 'white' }}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const FANPAGE_URL_FOR_APP = `fb://page/${facebookId}`;
                const FANPAGE_URL_FOR_BROWSER = `https://fb.com/${facebookId}`;
                Linking.canOpenURL(FANPAGE_URL_FOR_APP)
                  .then(supported => {
                    if (!supported) {
                      Linking.openURL(FANPAGE_URL_FOR_BROWSER);
                    } else {
                      Linking.openURL(FANPAGE_URL_FOR_APP);
                    }
                  })
                  .catch(err => Alert.alert('Erreur', err));
              }}
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
        <Text style={{ textAlign: 'center' }}>version {manifest.version}</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://fr.openbeautyfacts.org/')}
        >
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              paddingBottom: 10,
            }}
          >
            Powered by OpenBeautyFacts
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withRouter(FollowUs);
