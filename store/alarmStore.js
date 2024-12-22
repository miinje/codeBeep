import { create } from "zustand";

const alarmStore = create((set) => ({
  allAlarmData: null,
  isTimeMatched: false,
  currentTime: new Date(),
  alarmTestCode: String(`function handleSize(e) {
  size = e.target.value;

  generateQRCode();
}`),
  setAllAlarmData: (state) => set({ allAlarmData: state }),
  setIsTimeMatched: (state) => set({ isTimeMatched: state }),
  setCurrentTime: (state) => set({ currentTime: state }),
  setAlarmTestCode: (state) => set({ alarmTestCode: state }),
}));

export default alarmStore;
