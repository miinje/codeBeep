import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/Custombutton";
import CustomText from "../components/CustomText";
import alarmStore from "../store/alarmStore";
import { stopAudio } from "../utils/audioPlayer";

export default function ActionAlarm() {
  const { currentTime, alarmTestCode, setIsTimeMatched, setCurrentTime } =
    alarmStore();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const router = useRouter();

  const handleClickDone = async () => {
    setIsTimeMatched(false);

    await stopAudio();

    router.replace("/AlarmList");
    BackHandler.exitApp();
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.currentTimeBox}>
          <CustomText
            text={
              String(currentTime.getHours()).length < 2
                ? "0" + currentTime.getHours()
                : currentTime.getHours()
            }
            style={styles.titleText}
          />
          <CustomText text=":" style={styles.titleText} />
          <CustomText
            text={
              String(currentTime.getMinutes()).length < 2
                ? "0" + currentTime.getMinutes()
                : currentTime.getMinutes()
            }
            style={styles.titleText}
          />
          <CustomText text=":" style={styles.titleText} />
          <CustomText
            text={
              String(currentTime.getSeconds()).length < 2
                ? "0" + currentTime.getSeconds()
                : currentTime.getSeconds()
            }
            style={styles.titleText}
          />
        </View>
        <CustomText text="일어날 시간이에요!" style={{ fontSize: 15 }} />
      </View>
      <View
        style={{
          flex: 4,
          gap: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0, gap: 5 }}>
          <Text
            style={{
              width: 200,
              height: 100,
              color: "#fff",
              borderColor: "#fff",
              borderWidth: 2,
              padding: 10,
            }}
          >{`${alarmTestCode}`}</Text>
          <TextInput
            ref={inputRef}
            onChangeText={(value) => setInputValue(value)}
            defaultValue={inputValue}
            placeholder={alarmTestCode}
            placeholderTextColor="#ACACAC"
            multiline={inputValue.length !== alarmTestCode.length}
            style={{
              width: 200,
              height: 100,
              color: "#fff",
              borderColor: "#fff",
              borderWidth: 2,
              padding: 5,
            }}
          />
        </View>
        <CustomButton title="완료!" onPress={handleClickDone} />
      </View>
      <View style={styles.buttonBox}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
    margin: 5,
  },
  titleText: {
    fontSize: 80,
  },
  currentTimeBox: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  topBox: {
    flex: 2,
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
