import { VideoData } from "./type";

export const mockVideos: VideoData[] = [
  {
    id: "cd04o5yqSAU",
    label: "How to Use an Arduino (Lesson #1)",
    notes: [

    ]
  },
  {
    id: "FKekzzj5844",
    label: "How to Blink an LED with Arduino (Lesson #2)",
    notes: [
      {
        index: 10,
        label: "Connect GND on Arduino to (-) rail on blinkboard.",
        command: { "cmd": "animate" }
      }
      ,
      {
        index: 15,
        label: "Connect VCC on Arduino to (+) rail on blinkboard.",
        command: { "cmd": "setLed", "led": "1", "pattern": "blink2" }
      },
      {
        index: 20,
        label: "Connect pin 7 on Arduino to row 10 on blinkboard.",
        command: { "cmd": "setLed", "led": "10", "pattern": "blink2" }
      },
      {
        index: 25,
        label: "Connect pin 8 on Arduino to row 10 on blinkboard.",
        command: { "cmd": "animate" }
      },
      {
        index: 30,
        label: "Prepare red LED and connect to row 15 on blinkboard. Make sure to place the longer leg.",
        command: { "cmd": "setLed", "led": "15", "pattern": "blink" }
      },
      {
        index: 35,
        label: "Prepare 100 ohm resistor and connect to row 20 on blinkboard.",
        command: { "cmd": "setLed", "led": "20", "pattern": "blink2" }
      },
      {
        index: 40,
        label: "This is a test command. Row 25 will blink.",
        command: { "cmd": "setLed", "led": "25", "pattern": "blink" }
      },
      {
        index: 45,
        label: "This is a test command. Row 30 will blink.",
        command: { "cmd": "setLed", "led": "30", "pattern": "blink2" }
      },
      {
        index: 50,
        label: "This is a test command. All LED will be animated.",
        command: { "cmd": "animate" }
      },
      {
        index: 55,
        label: "This is a test command. All LED will be animated.",
        command: { "cmd": "animate" }
      },
    ]
  },
  {
    id: "9GLaU-BCEQM",
    label: "How to Debug a Circuit (Lesson #3)",
    notes: [

    ]
  }, {
    id: "9RF_BZ1Cg4k",
    label: "Introduction to Tinkercad Circuits (Lesson #4)",
    notes: [

    ]
  },
  // Add more mock videos as needed
];