import React from 'react';
import CreateEventScreen from './CreateEventScreen';

export default function UpdateEventScreen({ route }) {
  const { event } = route.params || {};

  return <CreateEventScreen eventToEdit={event} />;
}
