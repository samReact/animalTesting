import React from 'react';
import { View, Text } from 'native-base';

const PermissionDenied = () => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: 20,
    }}
  >
    <Text style={{ textAlign: 'center' }}>
      Le bon fonctionnement de l&#39;application Animal Testing nécessite
      d&#39;avoir un accès à votre appareil photo pour scanner les codes-barres
      des produits cosmétiques. Vous pouvez modifier cet autorisation dans les
      paramètres du téléphone, à la rubrique Applications.
    </Text>
  </View>
);

export default PermissionDenied;
