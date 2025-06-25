import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import {
  Card,
  Searchbar,
  Chip,
  IconButton,
  Button,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { eventList, deleteEvent } from '../redux/Actions/eventAction';
import { useFocusEffect } from '@react-navigation/native';
import ItemPicker from '../component/ItemPicker';

function HomeScreen({ events, eventList,deleteEvent, navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      eventList();
    }, [])
  );

  useEffect(() => {
    let data = events?.data || [];
    if (searchQuery) {
      data = data.filter(e =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedDepartment) {
      data = data.filter(e => e.department === selectedDepartment.name);
    }
    setFilteredEvents(data);
  }, [searchQuery, selectedDepartment, events]);

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

    const handleDelete = (eventId) => {
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEvent(eventId);
            } catch (e) {
              Alert.alert('Error', 'Failed to delete event');
            }
          },
        },
      ]
    );
  };

  const renderEvent = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('EventDetail', { event: item.id })}>
      <View style={styles.row}>
        <Image
          source={{
            uri: item.image
              ? `https://schoolevent-backend-production.up.railway.app/storage/${item.image}`
              : 'https://via.placeholder.com/100',
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subText}>{item.date} | {item.location}</Text>

          <Chip
            style={styles.chip}
            textStyle={styles.chipText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.type}
          </Chip>
        </View>

        <IconButton
          icon="delete"
          size={20}
          style={styles.deleteIcon}
          onPress={() => handleDelete(item.id)}
        />
      </View>
    </Card>
  );

  return (
    <View style={{ padding: 16, flex: 1 }}>
      <Searchbar
        placeholder="Search events"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ marginBottom: 12 }}
      />

      <View style={styles.filterRow}>
        <Button
          mode="outlined"
          onPress={() => setDepartmentModalVisible(true)}
        >
          {selectedDepartment ? `Dept: ${selectedDepartment.name}` : 'Filter by Dept'}
        </Button>

        {selectedDepartment && (
          <Button
            mode="text"
            onPress={() => setSelectedDepartment(null)}
            textColor="#f44336"
          >
            Clear Filter
          </Button>
        )}
      </View>

      {filteredEvents.length === 0 ? (
        <Card style={{ padding: 20, alignItems: 'center', marginTop: 50 }}>
          <Card.Content>
            <Text style={{ fontSize: 16 }}>No Events Found</Text>
            <Text style={{ color: '#666' }}>
              Try adjusting your search or filters.
            </Text>
          </Card.Content>
        </Card>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderEvent}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <ItemPicker
        isVisible={departmentModalVisible}
        onBackdropPress={() => setDepartmentModalVisible(false)}
        onBackButtonPress={() => setDepartmentModalVisible(false)}
        value={selectedDepartment?._id}
        onChange={item => {
          setSelectedDepartment(item);
          setDepartmentModalVisible(false);
        }}
        data={departments}
        enableSearch
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    flexShrink: 1,
  },
  subText: {
    color: '#555',
    fontSize: 13,
    marginBottom: 2,
  },
chip: {
  backgroundColor: '#7E57C2',
  alignSelf: 'flex-start',
  marginTop: 6,
  paddingHorizontal: 10,
  borderRadius: 12,
  maxWidth: 160,
  height: 28,
  justifyContent: 'center',
},

chipText: {
  fontSize: 13,
  color: '#fff',
  lineHeight: 12,
  includeFontPadding: false,
  textAlignVertical: 'center',
  flexShrink: 1,
},

  deleteIcon: {
    marginTop: 4,
    marginLeft: 8,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

const mapStateToProps = state => ({
  events: state.event.events,
});

const mapDispatchToProps = {
  eventList,
  deleteEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
