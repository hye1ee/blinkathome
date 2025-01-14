class BlinkPort {
  private device: USBDevice;
  private interfaceNumber: number;
  private endpointIn: number;
  private endpointOut: number;

  private onReceive: (data: any) => void; // data receive handler

  constructor(device: USBDevice, onReceive: (data: any) => void) {
    this.device = device
    this.interfaceNumber = 2; // original interface number of WebUSB Arduino demo
    this.endpointIn = 5; // original in endpoint ID of WebUSB Arduino demo
    this.endpointOut = 4; // original out endpoint ID of WebUSB Arduino demo

    this.onReceive = onReceive;
  }

  send(data: BufferSource): Promise<boolean> {
    return this.device.transferOut(this.endpointOut, data).then((result: USBOutTransferResult) => {
      if (result.status === "ok") {
        return true;
      } else if (result.status === "stall") {
        this.device.clearHalt("out", this.endpointOut);
      }
      return false;
    });
  }

  connect(): Promise<boolean> {
    // *--------------------------------
    // Define data receive callback 
    // *--------------------------------
    const readLoop = () => {
      this.device.transferIn(this.endpointIn, 64).then(
        (result: any) => {
          this.onReceive(result.data);
          readLoop();
        },
        (error: Error) => {
          console.log(error);
        }
      );
    };

    console.log("debug", this.device.configuration?.interfaces)

    return (
      this.device
        .open()
        .then(() => {
          if (this.device.configuration === null) {
            return this.device.selectConfiguration(1);
          }
        })
        .then(() => {
          const interfaces = this.device.configuration?.interfaces || [] as USBInterface[];
          interfaces.forEach((interfaceEl: USBInterface) => {
            interfaceEl.alternates.forEach((interfaceAl: USBAlternateInterface) => {
              // The vendor-specific interface provided by a device using this
              // Arduino library is a copy of the normal Arduino USB CDC-ACM
              // interface implementation and so reuses some requests defined by
              // that specification. This request sets the DTR (data terminal
              // ready) signal high to indicate to the device that the host is
              // ready to send and receive data.
              // *--------------------------------
              // Find Vendor specific interface 
              // *--------------------------------
              if (interfaceAl.interfaceClass === 0xff) {
                this.interfaceNumber = interfaceEl.interfaceNumber;
                interfaceAl.endpoints.forEach((endpoint: USBEndpoint) => {
                  if (endpoint.direction === 'out') {
                    this.endpointOut = endpoint.endpointNumber;
                  }
                  if (endpoint.direction === 'in') {
                    this.endpointIn = endpoint.endpointNumber;
                  }
                });
              }
            });
          });
        })
        .then(() => this.device.releaseInterface(this.interfaceNumber))
        .then(() => this.device.claimInterface(this.interfaceNumber))
        .then(() =>
          this.device.selectAlternateInterface(this.interfaceNumber, 0)
        )
        .then(() =>
          this.device.controlTransferOut({
            requestType: "class",
            recipient: "interface",
            request: 0x22,
            value: 0x01,
            index: this.interfaceNumber,
          })
        )
        .then(() => {
          readLoop();
          return true;
        })
        .catch((error) => {
          console.log(error);
          return false;
        })
    );
  }

  disconnect(): Promise<void> {
    // This request sets the DTR (data terminal ready) signal low to
    // indicate to the device that the host has disconnected.
    return this.device
      .controlTransferOut({
        requestType: 'class',
        recipient: 'interface',
        request: 0x22,
        value: 0x00,
        index: this.interfaceNumber,
      })
      .then(() => this.device.close());
  }
}
export default BlinkPort;