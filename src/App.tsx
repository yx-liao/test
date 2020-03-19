import React from "react";
import "./App.css";
// import {
//   FormattedMessage,
//   FormattedDate,
//   FormattedTime,
//   FormattedRelativeTime,
//   FormattedDateParts,
//   useIntl
// } from "react-intl";

function App({
  // setLocale,
  resource
}: {
  // setLocale: (locale: string) => void;
  resource: { read: () => any };
}) {
  // const intl = useIntl();
  // console.log(intl);
  // const [data, setData] = useState<{ read: () => string }>();
  // console.log(data);
  // let str = data;
  console.log("app render");
  return (
    <div
      className="App"
      style={{
        display: "flex"
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center"
      }}
    >
      {/* <button onClick={() => setLocale("en")} style={{ margin: 20 }}>
        英文
      </button>
      <button onClick={() => setLocale("zh-TW")} style={{ margin: 20 }}>
        中文
      </button> */}
      <div>data:{resource.read()}</div>
      {/* <div>
        <FormattedMessage
          id="appTitle"
          values={{
            titleName: <span style={{ color: "blue" }}>react-intl</span>
          }}
          tagName="p"
        ></FormattedMessage>
        <div className="date" style={{ padding: 20 }}>
          <FormattedDate
            value={new Date()}
            year="numeric"
            month="long"
            day="2-digit"
            weekday="long"
          ></FormattedDate>
        </div>
        <div className="date-part">
          <FormattedDateParts
            value={new Date()}
            year="numeric"
            month="long"
            day="2-digit"
            weekday="long"
          >
            {parts => (
              <>
                {parts.map((part, i) => (
                  <div key={part.value + i}>{part.value}</div>
                ))}
              </>
            )}
          </FormattedDateParts>
        </div>
        <div className="time" style={{ padding: 20 }}>
          <FormattedTime value={new Date()}></FormattedTime>
        </div>
        <div className="relative-time">
          <FormattedRelativeTime
            value={
              // (new Date("2020-01-10T15:39:00").getTime() -
              //   new Date().getTime()) /
              // 1000
              0
            }
            numeric="auto"
            style="short"
            unit="second"
            updateIntervalInSeconds={1}
          ></FormattedRelativeTime>
        </div>
      </div> */}
    </div>
  );
}

// class App extends Component<
//   { setLocale: (locale: string) => void },
//   { data: { read: () => string | void } }
// > {
//   state = {
//     data: { read() {} }
//   };

//   fetchData = () => {
//     // setData(getData(""));
//     let res = getResource(getData("ok"));
//     this.setState({ data: res });
//   };
//   render() {
//     return (
//       <div
//         className="App"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center"
//         }}
//       >
//         <button
//           onClick={() => this.props.setLocale("en")}
//           style={{ margin: 20 }}
//         >
//           英文
//         </button>
//         <button
//           onClick={() => this.props.setLocale("zh-TW")}
//           style={{ margin: 20 }}
//         >
//           中文
//         </button>
//         <button onClick={this.fetchData}>fetch</button>
//         <div>data:{this.state.data?.read()}</div>
//         <div>
//           <FormattedMessage
//             id="appTitle"
//             values={{
//               titleName: <span style={{ color: "blue" }}>react-intl</span>
//             }}
//             tagName="p"
//           ></FormattedMessage>
//           <div className="date" style={{ padding: 20 }}>
//             <FormattedDate
//               value={new Date()}
//               year="numeric"
//               month="long"
//               day="2-digit"
//               weekday="long"
//             ></FormattedDate>
//           </div>
//           <div className="time" style={{ padding: 20 }}>
//             <FormattedTime value={new Date()}></FormattedTime>
//           </div>
//           <div className="relative-time">
//             <FormattedRelativeTime
//               value={0}
//               numeric="auto"
//               style="short"
//               unit="second"
//               updateIntervalInSeconds={1}
//             ></FormattedRelativeTime>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
export default App;
