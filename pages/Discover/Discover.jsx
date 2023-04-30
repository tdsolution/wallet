import {View, Text, SafeAreaView, Image, Pressable, Dimensions} from "react-native";
import React from "react";
import StyleDiscover from "./StyleDiscover";
import images from "../../assets/images";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";
import ButtonToBack from "../../commponents/ButtonToBack/ButtonToBack";
import Carousel from "react-native-snap-carousel";

const Discover = ({ navigation }) => {
  // Setting Carousel
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
  const data = [
    {
      title: "Defi Solution",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: images.astroNcoins,
    },
    {
      title: "Defi Solution",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: images.astroNcoins,
    },
  ];
  const CarouselCardItem = ({ item, index }) => {
    return (
      <ExternalShadow
        key={index}
        style={{
          // shadowColor: 'transparent',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          // paddingHorizontal: 10,
          padding: 10,
        }}
      >
        <View key={index} style={StyleDiscover.card}>
          <Text style={StyleDiscover.text}>{item.title}</Text>
          <Image source={item.imgUrl} style={StyleDiscover.image} />
        </View>
      </ExternalShadow>
    );
  };
  // ========================
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e7ee" }}>
      {/* =================== */}
      <View style={StyleDiscover.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Button To Back */}
          {/* ============== */}
          <ButtonToBack navigation={navigation} />

          <Text style={StyleDiscover.title}>ChanID</Text>
          <View style={StyleDiscover.backBtn}>
            <ExternalShadow>
              <Pressable style={StyleDiscover.buttonBack} onPress={() => {}}>
                <Image
                  style={[
                    StyleDiscover.image,
                    {
                      width: 18,
                      height: 18,
                    },
                  ]}
                  source={images.iconSpline}
                />
              </Pressable>
            </ExternalShadow>
          </View>
        </View>
      </View>
      {/* ===== Carousel ==== */}
      <View>
        <Carousel
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          loop
          inactiveSlideScale={1}
          autoplay
        />
      </View>
    {/*    ==== Button Send and Receive ===== */}
    {/*    Button Send */}

    </SafeAreaView>
  );
};

export default Discover;
