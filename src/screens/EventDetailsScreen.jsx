import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import {
  Title,
  Paragraph,
  Surface,
  Divider,
  Button,
} from 'react-native-paper';
import { connect } from 'react-redux';
import { fetchEventById } from '../redux/Actions/eventAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

function EventDetailsScreen({ route, navigation, eventDetails, fetchEventById }) {
  const { event } = route.params;

  useEffect(() => {
    fetchEventById(event);
  }, [event]);

  if (!eventDetails) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Event Image */}
        <Image
          source={{
            uri: eventDetails.image
              ? `https://schoolevent-backend-production.up.railway.app/storage/${eventDetails.image}`
              : 'https://via.placeholder.com/600x300',
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Event Info */}
        <Surface style={styles.surface}>
          <Title style={styles.title}>{eventDetails.title}</Title>
          <Divider style={{ marginVertical: 8 }} />

          <View style={styles.infoRow}>
            <Icon name="calendar-month" size={20} color="#7E57C2" />
            <Text style={styles.infoText}>{eventDetails.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color="#7E57C2" />
            <Text style={styles.infoText}>{eventDetails.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="account-tie" size={20} color="#7E57C2" />
            <Text style={styles.infoText}>Organizer: {eventDetails.organizer}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="office-building" size={20} color="#7E57C2" />
            <Text style={styles.infoText}>Department: {eventDetails.department}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="bookmark-outline" size={20} color="#7E57C2" />
            <Text style={styles.infoText}>Type: {eventDetails.type}</Text>
          </View>

          <Divider style={{ marginVertical: 12 }} />
          <Paragraph style={styles.description}>{eventDetails.description}</Paragraph>
        </Surface>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View style={styles.bottomButtonContainer}>
        <Button
          mode="contained"
          style={styles.editButton}
          onPress={() =>navigation.navigate('UpdateEvent', { event: eventDetails })}

        >
          Edit Event
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  image: {
    width: width,
    height: 240,
  },
  surface: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#333',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  editButton: {
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#7E57C2',
  },
});

const mapStateToProps = state => ({
  eventDetails: state.event.eventDetails,
});

const mapDispatchToProps = {
  fetchEventById,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsScreen);
