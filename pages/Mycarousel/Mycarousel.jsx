import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import images from '../../assets/images';

const MyCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
//   const data = [
//     { title: 'Slide 1' },
//     { title: 'Slide 2' },
//     { title: 'Slide 3' },
//   ];

const data = [
    {
      id: 1,
      image: images.privacy,
      title: "All assets in one placea",
      description: "View and store your assets easily.",
    },
    {
      id: 2,
      image: images.privacy,
      title: "All assets in one placea",
      description: "View and store your assets easily.",
    },
    {
      id: 3,
      image: images.privacy,
      title: "All assets in one placea",
      description: "View and store your assets easily.",
    },
  ];


  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image}/>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title1}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    // paddingTop: 10,
    // paddingHorizontal: 3,
  },
  slide: {
    width: 300,
    height: 540,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#333',
  },
  title: {
    color: "#8F9FF8",
    fontSize: 24,
    lineHeight: 29,
    textAlign: "center",
    fontWeight: 500,
  },
  title1:{
    color: "#404358",
    textShadowColor: "rgba(38, 43, 70, 0.32)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  paginationContainer: {
    // paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#007aff',
  },
  paginationInactiveDot: {
    backgroundColor: '#8e8e93',
  },
});

export default MyCarousel;