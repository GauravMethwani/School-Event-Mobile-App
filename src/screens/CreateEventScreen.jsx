// CreateEventScreen.js (Reusable for both Create and Update)
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { Button, Title, HelperText } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import InputField from '../component/inputField';
import ItemPicker from '../component/ItemPicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { createEvent, updateEvent } from '../redux/Actions/eventAction';
const departments = [
  { _id: 'Science', name: 'Science' },
  { _id: 'Mathematics', name: 'Mathematics' },
  { _id: 'English', name: 'English' },
  { _id: 'Sports', name: 'Sports' },
  { _id: 'Cultural', name: 'Cultural' },
  { _id: 'Art & Craft', name: 'Art & Craft' },
  { _id: 'Computer Science', name: 'Computer Science' },
  { _id: 'Social Studies', name: 'Social Studies' },
  { _id: 'Commerce', name: 'Commerce' },
  { _id: 'General', name: 'General' },
];
const eventTypes = [
  { _id: 'seminar', name: 'Seminar' },
  { _id: 'workshop', name: 'Workshop' },
  { _id: 'celebration', name: 'Celebration' },
  { _id: 'exhibition', name: 'Exhibition' },
  { _id: 'orientation', name: 'Orientation' },
  { _id: 'sports', name: 'Sports' },
  { _id: 'cultural', name: 'Cultural' },
  { _id: 'tour', name: 'Tour' },
];

const eventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  date: Yup.string().required('Date is required'),
  location: Yup.string().required('Location is required'),
  organizer: Yup.string().required('Organizer is required'),
  department: Yup.string().required('Department is required'),
  type: Yup.string().required('Type is required'),
  description: Yup.string().required('Description is required'),
  image: Yup.mixed().required('Image is required'),
});

function CreateEventScreen({ eventToEdit, createEvent, updateEvent }) {
  const navigation = useNavigation();
  const isEdit = !!eventToEdit;
  const existingEvent = eventToEdit || {};
 console.log(isEdit)

  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(
    departments.find(d => d.name === existingEvent.department) || null
  );
  const [selectedType, setSelectedType] = useState(
    eventTypes.find(t => t.name === existingEvent.type) || null
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleImagePick = async setFieldValue => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (!result.didCancel && result.assets?.length > 0) {
      setFieldValue('image', result.assets[0]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>{isEdit ? 'Update Event' : 'Create New Event'}</Title>

      <Formik
        initialValues={{
          title: existingEvent.title || '',
          date: existingEvent.date || '',
          location: existingEvent.location || '',
          organizer: existingEvent.organizer || '',
          department: existingEvent.department || '',
          type: existingEvent.type || '',
          description: existingEvent.description || '',
          image: existingEvent.image ? { uri: `https://schoolevent-backend-production.up.railway.app/storage/${existingEvent.image}` } : null,
        }}
        validationSchema={eventSchema}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          const formData = new FormData();
          for (const key in values) {
            if (key === 'image' && values.image?.uri) {
              formData.append('image', {
                uri: values.image.uri,
                type: values.image.type || 'image/jpeg',
                name: values.image.fileName || 'photo.jpg',
              });
            } else {
              formData.append(key, values[key]);
            }
          }

          try {
            if (isEdit) {
              await updateEvent(existingEvent.id, formData);
              Alert.alert('Success', 'Event updated successfully!');
            } else {
              await createEvent(formData);
              Alert.alert('Success', 'Event created successfully!');
            }
            resetForm();
            navigation.navigate('Home');
          } catch (error) {
            console.log('Error:', error.response?.data || error.message);
            Alert.alert('Error', 'Something went wrong!');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            {values.image && (
              <Image
                source={{ uri: values.image.uri }}
                style={styles.imagePreview}
              />
            )}

            <Button mode="outlined" onPress={() => handleImagePick(setFieldValue)}>
              {values.image ? 'Change Image' : 'Select Image'}
            </Button>
            {touched.image && errors.image && (
              <HelperText type="error">{errors.image}</HelperText>
            )}

            <InputField label="Title" value={values.title} onChangeText={handleChange('title')} onBlur={handleBlur('title')} error={touched.title && errors.title} />
            <InputField label="Date" value={values.date} onPress={() => setDatePickerVisibility(true)} editable={false} error={touched.date && errors.date} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={date => {
                const formattedDate = date.toISOString().split('T')[0];
                setFieldValue('date', formattedDate);
                setDatePickerVisibility(false);
              }}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <InputField label="Location" value={values.location} onChangeText={handleChange('location')} onBlur={handleBlur('location')} error={touched.location && errors.location} />
            <InputField label="Organizer" value={values.organizer} onChangeText={handleChange('organizer')} onBlur={handleBlur('organizer')} error={touched.organizer && errors.organizer} />
            <InputField label="Department" value={selectedDepartment?.name || ''} onPress={() => setDepartmentModalVisible(true)} editable={false} error={touched.department && errors.department} />
            <InputField label="Type" value={selectedType?.name || ''} onPress={() => setTypeModalVisible(true)} editable={false} error={touched.type && errors.type} />
            <InputField label="Description" value={values.description} onChangeText={handleChange('description')} onBlur={handleBlur('description')} multiline numberOfLines={16} error={touched.description && errors.description} />
            <Button mode="contained" onPress={handleSubmit} disabled={isSubmitting} style={{ marginTop: 20 }}>
              {isEdit ? 'Update Event' : isSubmitting ? 'Submitting...' : 'Submit Event'}
            </Button>

            <ItemPicker
              isVisible={departmentModalVisible}
              onBackdropPress={() => setDepartmentModalVisible(false)}
              onBackButtonPress={() => setDepartmentModalVisible(false)}
              value={selectedDepartment?._id}
              onChange={item => {
                setSelectedDepartment(item);
                setFieldValue('department', item.name);
                setDepartmentModalVisible(false);
              }}
              data={departments}
              enableSearch
            />

            <ItemPicker
              isVisible={typeModalVisible}
              onBackdropPress={() => setTypeModalVisible(false)}
              onBackButtonPress={() => setTypeModalVisible(false)}
              value={selectedType?._id}
              onChange={item => {
                setSelectedType(item);
                setFieldValue('type', item.name);
                setTypeModalVisible(false);
              }}
              data={eventTypes}
              enableSearch
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
});

const mapDispatchToProps = {
  createEvent,
  updateEvent,
};

export default connect(null, mapDispatchToProps)(CreateEventScreen);
