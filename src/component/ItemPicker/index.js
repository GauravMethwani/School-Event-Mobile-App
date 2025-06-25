import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { TextInput } from 'react-native-paper';

// Responsive sizes
const { width, height } = Dimensions.get('window');

// Theme variables (you can replace these with your global theme constants)
const COLORS = {
  primary: '#007bff',
  black: '#000',
  gray20: '#ccc',
  white: '#fff',
};

const FONTS = {
  regular: 'System',
};

const SIZES = {
  width,
  height,
  margin: 16,
};

const ClassPicker = ({
  isVisible,
  onBackdropPress,
  onBackButtonPress,
  value,
  onChange,
  data,
  mode,
  enableSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data?.filter(item =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      style={{ justifyContent: 'flex-end', alignItems: 'center' }}
      animationOutTiming={800}
      animationInTiming={500}
      animationOut="slideOutDown"
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
    >
      <View style={styles.modalContainer}>
        {enableSearch && (
          <TextInput
            mode="outlined"
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery || ''}
            onChangeText={setSearchQuery}
            outlineColor={COLORS.gray20}
            activeOutlineColor={COLORS.primary}
            right={<TextInput.Icon icon="magnify" />}
          />
        )}

        <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 16 }}>
          {filteredData?.map(item => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.option,
                value === item._id && styles.selectedOption,
              ]}
              onPress={() => onChange(item)}
            >
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ClassPicker;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.white,
    width: SIZES.width * 0.9,
    maxHeight: SIZES.height * 0.7,
    borderRadius: 10,
    padding: 16,
  },
  scrollView: {
    maxHeight: SIZES.height * 0.5,
  },
  searchInput: {
    marginBottom: 12,
    width: '100%',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray20,
    borderRadius: 6,
  },
  selectedOption: {
    backgroundColor: '#D8DAF7',
  },
  optionText: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.black,
  },
});
