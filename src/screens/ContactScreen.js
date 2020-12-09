import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { instagram, odnoklasniki } from '../ui/svg/svg_const'
import { Header } from '../components/header'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class ContactScreen extends Component {

  render() {

    const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]

    const content = (
      <View>
        <View style={styles.contact}>
          <Text style={styles.title}>Напишите мне :</Text>
          <View style={styles.socialBox}>
            <SvgXml xml={odnoklasniki} width={40} height={40} />
            <Text style={styles.socialName}>Oksana Pavlova</Text>
          </View>
          <View style={styles.socialBox}>
            <SvgXml xml={instagram} width={40} height={40} />
            <Text style={styles.socialName}>Oksana Pavlova</Text>
          </View>
        </View>
        <View style={styles.mapBox}>
          <Text style={styles.title}>Прийдите ко мне в ателье :</Text>
          <View style={styles.map}>
            <MapView
              style={{ width: '100%', height: 450,zIndex:10000 }}
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: 48.472769,
                longitude: 38.817460,
                latitudeDelta: 0.002,
                longitudeDelta: .002,
              }}
            >
              <Marker
                key={32}
                coordinate={{latitude:48.472769,longitude: 38.817460}}
                title='Ателье мод'
                description='Желто синий офис с надписью "Адвокат"'
              />
            </MapView>
          </View>
        </View>
      </View>
    )
    return (
      <View style={styles.content}>
        <Header
          title='Как сделать заказ?' />
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: '100%',
  },
  contact: {
    width: '100%',
    height: '40%'
  },
  title: {
    fontSize: 25,
    padding: 20
  },
  socialBox: {
    flexDirection: 'row',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    paddingLeft: 20
  },
  socialName: {
    fontSize: 20,
    color: 'grey',
    marginLeft: 30
  },
  mapBox: {
    width: '100%',
    height: '30%',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    marginTop: 10,
    zIndex:100
  }
})