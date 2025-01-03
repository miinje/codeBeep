import { useRouter } from "expo-router";
import { BackHandler, StyleSheet, View } from "react-native";
import CustomButton from "../components/Custombutton";
import CustomText from "../components/CustomText";
import alarmStore from "../store/alarmStore";
import { stopAudio } from "../utils/audioPlayer";
import { useEffect } from "react";

export default function ActionAlarm() {
  const { currentTime, setIsTimeMatched, setCurrentTime } = alarmStore();
  const router = useRouter();

  const handleClickDone = async () => {
    setIsTimeMatched(false);

    await stopAudio();

    router.replace("/AlarmList");
    BackHandler.exitApp();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
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
      <View style={styles.buttonBox}>
        <CustomButton title="완료!" onPress={handleClickDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#404040",
    gap: 10,
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
    flex: 3,
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBox: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 40,
  },
});
