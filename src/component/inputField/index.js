import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DynamicTouchableOpacity from '../DynamicTouchableOpacity';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primary: '#007bff',
  black: '#000',
  gray20: '#aaa',
  white: '#fff',
};

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType,
  returnKeyType,
  numberOfLines,
  multiline,
  secureTextEntry,
  onBlur,
  onFocus,
  icon,
  iconstyle,
  tintColor,
  error,
  disabled,
  maxLength,
  editable,
  autoFocus,
  onSubmitEditing,
  outlineStyle,
  onPress,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <DynamicTouchableOpacity
        activeOpacity={0.8}
        disabled={!onPress}
        onPress={onPress}
        style={styles.inputWrapper}
      >
        <TextInput
          label={label}
          placeholder={placeholder}
          value={value || ''}
          onChangeText={onChangeText || (() => {})}
          onBlur={onBlur}
          onFocus={onFocus}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          autoFocus={autoFocus}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={secureTextEntry && !showPassword}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
          disabled={disabled}
          mode="outlined"
          style={[styles.textInput, disabled && styles.disabledInput]}
          outlineStyle={outlineStyle || styles.outline}
          textColor={COLORS.black}
          outlineColor={COLORS.gray20}
          activeOutlineColor={COLORS.primary}
          placeholderTextColor={COLORS.gray20}
          cursorColor={COLORS.primary}
        />

        {icon && (
          <View style={styles.iconContainer}>
            <Image
              source={icon}
              resizeMode="contain"
              style={[styles.icon, iconstyle, { tintColor: tintColor || COLORS.primary }]}
            />
          </View>
        )}
      </DynamicTouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: height * 0.015,
  },
  inputWrapper: {
    width: '100%',
    alignSelf: 'center',
  },
  textInput: {
    fontSize: 14,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  disabledInput: {
    backgroundColor: '#EBEBEB',
  },
  outline: {
    borderWidth: 1.5,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 11,
    color: 'red',
    marginLeft: 4,
    marginTop: 4,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    height: height * 0.062,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
