import React, { useState, Component, useRef, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MyBtn } from "./MyBtn";
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
    console.log(props);
  }

  // static getDerivedStateFromError() {
  //   console.log("getDerivedStateFromError");
  //   return {
  //     pending: true
  //   };
  // }

  componentDidCatch(e: any) {
    console.log("catch error");
    if (e.promise instanceof Promise) {
      console.log(e);
      this.setState({ pending: true }, () => {
        e.promise.then(() => {
          console.log("777");
          this.setState({ pending: false });
        });
      });
    }
  }

  // componentDidCatch(e: any) {
  // }
  render() {
    return (
      <>
        {/* <div style={{ display: this.state.pending ? "none" : "block" }}>
          {this.props.children}
        </div>
        <div style={{ display: this.state.pending ? "block" : "none" }}>
          {this.props.fallback}
        </div> */}
        {this.state.pending ? this.props.fallback : this.props.children}
      </>
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
      id === 3 ? 6000 : Math.random() * 1000
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

// let { Provider, Consumer } = React.createContext(123);
// let Con = React.createElement(Consumer, null, (data: number) => (
//   <div className={`${data}`}>{data}</div>
// ));

// console.log(React.createElement(Provider, { value: 222 }, Con));
// console.log(Con);
export let initResource = createResource(getData(0));
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
      <MyBtn onClick={fetchData}>fetch</MyBtn>
      {/* <Provider value={123}>
        <Consumer>{data => <div>{data}</div>}</Consumer>
      </Provider>
      <Provider value={345}>
        <Consumer>{data => <div>{data}</div>}</Consumer>
      </Provider> */}
      <Fallback
        fallback={
          <div
            style={{
              display: "flex"
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center"
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

function aaaHOC<P extends aaaHOCProps>(
  ChildComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return class InAaaHOC extends Component<P> {
    render() {
      return (
        <div className="aaa">
          aaaHOC
          <div>
            <ChildComponent {...this.props} aaaP={"aaap"}></ChildComponent>
          </div>
        </div>
      );
    }
  };
}

interface aaaHOCProps {
  aaaP: string;
}

function QQ(props: { id: number; name: string } & aaaHOCProps) {
  return (
    <div className="qq">
      QQ
      <div>QQ id {props.id}</div>
      <div>QQ name {props.name}</div>
      <div>QQ aaaP {props.aaaP}</div>
    </div>
  );
}

let NewQQ = aaaHOC(QQ);

let RR = aaaHOC(
  class R extends Component<{} & aaaHOCProps> {
    render() {
      return <div className="rr">{this.props.aaaP}</div>;
    }
  }
);

let As = aaaHOC(function(props) {
  return (
    <div className="a">
      asd
      {props.aaaP}
    </div>
  );
});

ReactDOM.render(<Root />, document.getElementById("root"));
// @ts-ignore
// ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
