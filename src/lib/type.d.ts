export type BlinkCommand = "status" | "version" | "reset" | "analogRead" | "setV" | "setHigh" | "setLow" | "setPwm" | "setLed" | "setCmdLed" | "setBrightness" | "animate";

export interface BlinkJSON {
  cmd: BlinkCommand;
  samples?: string;
  value?: string;
  pin?: string;
  duty?: string;
  led?: string;
  pattern?: "on" | "off" | "blink" | "blink2";
}

export interface Note {
  index: number;
  label: string;
  command: BlinkJSON | null;
}

export interface VideoData {
  id: string;
  label: string;
  notes: Note[];
}