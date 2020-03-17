import React, { useState, Component, useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import { IntlProvider } from "react-intl";

// import { en } from "./i18n/en";
// import { zh_TW } from "./i18n/zh_TW";

class Fallback extends Component<
  { fallback: React.ReactNode },
  { pending: boolean }
> {
  constructor(props: { fallback: React.ReactNode }) {
    super(props);
    this.state = {
      pending: false
    };
  }

  // static getDerivedStateFromError() {
  //   return {};
  // }

  componentDidCatch(e: any) {
    console.log("catch error");
    if (e.promise instanceof Promise) {
      console.log(e);
      // return { pending: true };
      this.setState({ pending: true }, () => {
        e.promise.then(() => {
          this.setState({ pending: false });
        });
      });
    }
  }

  // componentDidCatch(e: any) {
  // }
  render() {
    return (
      <>{this.state.pending ? this.props.fallback : this.props.children}</>
    );
  }
}

const getData = (id: number): Promise<string> => {
  console.log("fetch start ", id);
  return new Promise(r =>
    setTimeout(
      () => {
        switch (id) {
          case 0:
            r("user 0");
            break;
          case 1:
            r("user 1");
            break;
          case 2:
            r("user 2");
            break;
          case 3:
            r("user 3");
            break;
          default:
            r("defulat user");
        }
      },
      id === 3 ? 3000 : Math.random() * 1000
    )
  );
};

function createResource<T extends any>(promise: Promise<T>) {
  let response: T;
  let status = "pending";
  let reason: any;
  let suspender = promise
    .then(res => {
      console.log("fetch ok", res);
      response = res;
      status = "resolved";
    })
    .catch(e => {
      reason = e;
      throw e;
    });
  let data = {
    read() {
      if (status === "pending") {
        console.log("pending", promise);

        throw { promise: suspender };
      } else if (status === "resolved") {
        console.log("resolved", response);

        return response;
      } else {
        console.log(reason);
        throw reason;
      }
    }
  };
  return () => {
    return data;
  };
}

function getNextId(id: number) {
  return id === 3 ? 0 : id + 1;
}

let initResource = createResource(getData(0));
function Other() {
  const [resource, setResource] = useState(initResource);
  const ref = useRef(0);
  const fetchData = () => {
    ref.current = getNextId(ref.current);
    setResource(createResource(getData(ref.current)));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
      }}
    >
      <button onClick={fetchData}>fetch</button>

      <Fallback
        fallback={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            Loading...
          </div>
        }
      >
        <App resource={resource}></App>
      </Fallback>
    </div>
  );
}

const Root = () => {
  // const [locale, setLocale] = useState(navigator.language);
  // let messages;
  // if (locale.includes("zh-TW")) {
  //   messages = zh_TW;
  // } else {
  //   messages = en;
  // }
  // console.log("root render");

  return (
    // <IntlProvider
    //   locale={locale}
    //   key={locale}
    //   defaultLocale="zh-TW"
    //   messages={messages}
    // >

    <Other></Other>
    // </IntlProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
