import * as React from 'react';
import { TouchableOpacity, Image } from 'react-native';

interface ProfileButtonProps {
  onPress: () => void;
}

const ProfileButton = ({ onPress }: ProfileButtonProps) => {
  return (
    <TouchableOpacity className="mr-3" onPress={onPress}>
      <Image
        source={require('../assets/sileighty vintage.png')}
        className="h-8 w-8 rounded-full"
      />
    </TouchableOpacity>
  );
};

export default ProfileButton;