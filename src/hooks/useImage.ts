import { useToast } from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

type ImageFile = {
  name: string;
  uri: string;
  type: string;
};

interface IImage {
  pickImage: () => Promise<ImageFile>;
}

export const useImage = (): IImage => {
  const toast = useToast();
  const pickImage = async () => {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4],
      allowsEditing: true,
    });

    if (photoSelected.canceled) {
      return;
    }

    if (photoSelected.assets[0].uri) {
      const photoInfo = await FileSystem.getInfoAsync(
        photoSelected.assets[0].uri,
      );

      if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
        return toast.show({
          title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
          placement: 'top',
          bgColor: 'red.middle',
        });
      }

      const fileExtension = photoSelected.assets[0].uri.split('.').pop();

      const photoFile = {
        name: `${fileExtension}`.toLowerCase(),
        uri: photoSelected.assets[0].uri,
        type: `${photoSelected.assets[0].type}/${fileExtension}`,
      };

      return photoFile;
    }
  };

  return {
    pickImage,
  };
};
