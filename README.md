Web USB API types - https://www.npmjs.com/package/@types/w3c-web-usb

React example

```
  const [commandVal, setCommandVal] = useState("");
  const [isConnected, setIsConnected] = useState(
    BlinkConnector.get().isConnected()
  );
  const [outputVal, setOutputVal] = useState("");

  useEffect(() => {
    BlinkConnector.get().addlistener({
      onReceive: (output) => setOutputVal(output),
      onConnect: (isConnected) => setIsConnected(isConnected),
    });
  }, []);

  function runCommand() {
    // type check is needed
    BlinkConnector.get().runCommand(JSON.parse(commandVal) as BlinkJSON);
  }

  async function connectDevice() {
    BlinkConnector.get().connect();
  }

  const disconnectDevice = () => {
    BlinkConnector.get().disconnect();
  };
```

NextJS + styled-components : `https://dev.to/rashidshamloo/using-styled-components-with-nextjs-v13-typescript-2l6m`
