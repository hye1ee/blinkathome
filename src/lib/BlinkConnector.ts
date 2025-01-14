import BlinkPort from "@/lib/BlinkPort";
import { BlinkJSON } from "./type";

const portFilters = [
  { vendorId: 0x2341, productId: 0x8036 }, // Arduino Leonardo
  { vendorId: 0x2341, productId: 0x8037 }, // Arduino Micro
  { vendorId: 0x2341, productId: 0x804d }, // Arduino/Genuino Zero
  { vendorId: 0x2341, productId: 0x804e }, // Arduino/Genuino MKR1000
  { vendorId: 0x2341, productId: 0x804f }, // Arduino MKRZERO
  { vendorId: 0x2341, productId: 0x8050 }, // Arduino MKR FOX 1200
  { vendorId: 0x2341, productId: 0x8052 }, // Arduino MKR GSM 1400
  { vendorId: 0x2341, productId: 0x8053 }, // Arduino MKR WAN 1300
  { vendorId: 0x2341, productId: 0x8054 }, // Arduino MKR WiFi 1010
  { vendorId: 0x2341, productId: 0x8055 }, // Arduino MKR NB 1500
  { vendorId: 0x2341, productId: 0x8056 }, // Arduino MKR Vidor 4000
  { vendorId: 0x2341, productId: 0x8057 }, // Arduino NANO 33 IoT
  { vendorId: 0x239a }, // Adafruit Boards!
];

class BlinkConnector {
  private static instance: BlinkConnector;

  private textEncoder!: TextEncoder;
  private textDecoder!: TextDecoder;

  private onReceive?: (output: string) => void;
  private onSend?: (success: boolean) => void;
  private onConnect?: (isConnected: boolean) => void;


  private port: BlinkPort | null = null;

  constructor() {
    if (BlinkConnector.instance) {
      return BlinkConnector.instance;
    }
    BlinkConnector.instance = this;
    this.textEncoder = new TextEncoder();
    this.textDecoder = new TextDecoder();
  }

  static get() {
    if (!BlinkConnector.instance) {
      BlinkConnector.instance = new BlinkConnector();
    }
    return BlinkConnector.instance;
  }

  async connect(): Promise<void> {
    // trigger new device selection regardless of current connection
    if (this.port) this.disconnect();

    this.port = await navigator.usb
      .requestDevice({ filters: portFilters })
      .then((device) => new BlinkPort(device, (data: any) => { if (this.onReceive) this.onReceive(this.textDecoder.decode(data).trim()) }));

    const success = await this.port?.connect();
    if (!success) this.port = null; // if connection has failed, clear the port

    if (this.onConnect) this.onConnect(this.isConnected()); // publish connection changes
  }

  disconnect() {
    if (this.port) {
      this.port.disconnect();
      this.port = null;

      if (this.onConnect) this.onConnect(this.isConnected()); // publish connection changes
    }
  }

  addlistener({ onReceive, onSend, onConnect }: { onReceive?: (output: string) => void, onSend?: (success: boolean) => void, onConnect?: (isConnected: boolean) => void }) {
    this.onReceive = onReceive;
    this.onSend = onSend;
    this.onConnect = onConnect;
  }

  isConnected() {
    return this.port != undefined && this.port != null;
  }

  async runCommand(command: BlinkJSON) {
    if (this.isConnected() && this.port) {
      const successs = await this.port.send(this.textEncoder.encode(JSON.stringify(command)));

      if (this.onSend) this.onSend(successs); // publish send result
    }
  }
}

export default BlinkConnector;
