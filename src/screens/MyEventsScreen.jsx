import React, { useEffect } from 'react';
import { FlatList, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Paragraph, Title } from 'react-native-paper';
import { deleteEvent, fetchEvents } from '../redux/eventActions';

export default function MyEventsScreen() {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.event);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const handleDelete = id => {
    Alert.alert('Delete Event', 'Are you sure?', [
      { text: 'Cancel' },
      { text: 'Delete', onPress: () => dispatch(deleteEvent(id)) },
    ]);
  };

  return (
    <FlatList
      data={events}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 10 }}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.date} – {item.location}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleDelete(item.id)} color="red">Delete</Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}
