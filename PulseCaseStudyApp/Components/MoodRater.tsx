import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Slider, Icon } from "@rneui/themed";

type SlidersComponentProps = {};

const MoodSlider = ({ data, childToParent }) => {
  const [value, setValue] = useState(0);

  //console.log(data);
  //childToParent("selam");

  const interpolate = (start: number, end: number) => {
    let k = (value - 0) / 100; // 0 =>min  && 10 => MAX
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(50, 0);
    let g = interpolate(50, 200);
    let b = interpolate(50, 0);
    return `rgb(${r},${g},${b})`;
  };
  const emoji = () => {
    let emojiname = ""; /*
    if (value < 40) {
      emojiname = "emoji-sad";
    } else if (value < 60) {
      emojiname = "emoji-neutral";
    } else {
      emojiname = "emoji-happy";
    }*/
    if (value < 5) {
      emojiname = "numeric-0";
    } else if (value < 15) {
      emojiname = "numeric-1";
    } else if (value < 25) {
      emojiname = "numeric-2";
    } else if (value < 35) {
      emojiname = "numeric-3";
    } else if (value < 45) {
      emojiname = "numeric-4";
    } else if (value < 55) {
      emojiname = "numeric-5";
    } else if (value < 65) {
      emojiname = "numeric-6";
    } else if (value < 75) {
      emojiname = "numeric-7";
    } else if (value < 85) {
      emojiname = "numeric-8";
    } else if (value < 95) {
      emojiname = "numeric-9";
    } else {
      emojiname = "numeric-10";
    }
    return emojiname;
  };
  function useChildToParent() {
    if (Math.trunc(value + 5) / 10 != Math.trunc(value) / 10) {
      childToParent(Math.trunc((value + 5) / 10));
    }
  }
  return (
    <View style={{ width: "90%", alignSelf: "center" }}>
      <Slider
        value={value}
        onValueChange={setValue}
        onSlidingComplete={useChildToParent}
        maximumValue={100}
        minimumValue={0}
        minimumTrackTintColor="#0"
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: "transparent" }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
        thumbProps={{
          children: (
            <Icon
              name={emoji()}
              type="material-community"
              size={20}
              reverse
              containerStyle={{ bottom: 20, right: 20 }}
              color={color()}
            />
          ),
        }}
      />
      {/*
      <Text style={{ paddingTop: 20 }}>
        Moodlevel: {Math.trunc((value + 5) / 10)}/10
      </Text>*/}
    </View>
  );
};

const stylesSlider = StyleSheet.create({
  contentView: {
    padding: 20,
    width: "95%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default MoodSlider;
