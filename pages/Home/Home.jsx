import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import images from "../../assets/images";
import { width } from "../../assets/styles/common";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";
import InternalShadow from "../../commponents/BoxShadow/InternalShadow";
import HearderHome from "./HearderHome/HearderHome";
import StyleHome from "./StyleHome";

// Tạo data Carousel
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
      <View key={index} style={StyleHome.card}>
        <Text style={StyleHome.text}>{item.title}</Text>
        <Image source={item.imgUrl} style={StyleHome.image} />
      </View>
    </ExternalShadow>
  );
};
//  ========================
// ======= List Conten Item =======
const ContentItems = () => {
  return (
    <ExternalShadow
      key={1}
      style={{
        paddingHorizontal: width(3),
        paddingVertical: 5,
      }}
    >
      <View style={StyleHome.contentItem}>
        <ExternalShadow
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          padding={0.1}
        >
          <InternalShadow style={StyleHome.innnerShadow}>
            <Image source={images.iconETH} style={StyleHome.contentImage} />
          </InternalShadow>
        </ExternalShadow>
        <View style={StyleHome.contentTwoItem}>
          <Text style={[StyleHome.textShadow, StyleHome.contentNameorTotal]}>
            ETH
          </Text>
          <Text
            style={[StyleHome.textShadow, StyleHome.contentPriceorPercentage]}
          >
            $ 10000
          </Text>
        </View>
        <View style={StyleHome.contentTwoItem}>
          <Text style={[StyleHome.textShadow, StyleHome.contentNameorTotal]}>
            3 ETH
          </Text>
          <Text style={[StyleHome.textShadow, StyleHome.contentMoney]}>
            $ 10000
          </Text>
        </View>
        <View
          style={[
            StyleHome.contentTwoItem,
            {
              borderBottomRightRadius: 10,
            },
          ]}
        >
          {/* <Charts
            style={{
              width: 90,
              height: "100%",
            }}
          /> */}
          <Text>Chart</Text>
          <Text
            style={[
              StyleHome.textShadow,
              {
                textShadowColor: "rgba(38, 43, 70, 1)",
                position: "absolute",
                textAlign: "center",
                width: "100%",
                fontSize: 14,
                lineHeight: 20,
                fontWeight: "500",
                // color:
                //   caculatePercentage(1000, 200000) >= 0
                //     ? "#48FFDE"
                //     : "#f97771",
              },
            ]}
          >
            100 %
          </Text>
        </View>
      </View>
    </ExternalShadow>
  );
};

export default function HomePages() {
  return (
    <>
      <SafeAreaView style={StyleHome.container}>
        <HearderHome />
        <View
          style={{
            backgroundColor: "#e6e7ee",
            flex: 1,
          }}
        >
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
          {/* ====== Button Send || Button Receive || Button Buy ====== */}
          <View style={StyleHome.threeButtonWrap}>
            <ExternalShadow>
              <Pressable style={StyleHome.button}>
                <ExternalShadow
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  padding={0.1}
                >
                  <InternalShadow style={StyleHome.innnerShadow}>
                    <Image
                      source={images.iconSend}
                      style={StyleHome.contentImage}
                    />
                  </InternalShadow>
                </ExternalShadow>
                <Text style={[StyleHome.textButton, StyleHome.textShadow]}>
                  Send
                </Text>
              </Pressable>
            </ExternalShadow>
            {/*Button Receive*/}
            <ExternalShadow>
              <Pressable style={StyleHome.button}>
                <ExternalShadow
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  padding={0.1}
                >
                  <InternalShadow style={StyleHome.innnerShadow}>
                    <Image
                      source={images.iconReceive}
                      style={StyleHome.contentImage}
                    />
                  </InternalShadow>
                </ExternalShadow>
                <Text style={[StyleHome.textButton, StyleHome.textShadow]}>
                  Receive
                </Text>
              </Pressable>
            </ExternalShadow>
            {/*Button Buy*/}
            <ExternalShadow>
              <Pressable style={StyleHome.button}>
                <ExternalShadow
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  padding={0.1}
                >
                  <InternalShadow style={StyleHome.innnerShadow}>
                    <Image
                      source={images.iconBuy}
                      style={StyleHome.contentImage}
                    />
                  </InternalShadow>
                </ExternalShadow>
                <Text style={[StyleHome.textButton, StyleHome.textShadow]}>
                  Buy
                </Text>
              </Pressable>
            </ExternalShadow>
          </View>
          {/* ===== Line ==== */}
          <View
            style={[
              StyleHome.line,
              {
                marginTop: 10,
                opacity: 0.6,
              },
            ]}
          />
          <View
            style={[
              StyleHome.line,
              {
                marginBottom: 10,
                opacity: 0.4,
              },
            ]}
          />
          {/* ======= List Conten Item ======= */}
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={StyleHome.menus}>
              <ExternalShadow>
                <Pressable style={[StyleHome.buttonMenu, StyleHome.buttonAZ]}>
                  <Image source={images.iconAZ} />
                  <Text style={StyleHome.textShadow}>A - Z</Text>
                </Pressable>
              </ExternalShadow>
              <ExternalShadow>
                <Pressable style={StyleHome.buttonMenu}>
                  <Image source={images.settingHome} />
                </Pressable>
              </ExternalShadow>
            </View>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <ContentItems />
              <ContentItems />
              <ContentItems />
              <ContentItems />
              <ContentItems />
              <ContentItems />
              <ContentItems />
            </ScrollView>
          </View>
          
        </View>
      </SafeAreaView>
    </>
  );
}