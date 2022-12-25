import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import clear from "./clear.png";
import clouds from "./cloud.png";

function App() {
  const API_KEY = "46440481cc49f42f6fc2289fc89736ae";
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchWeather = async e => {
    if (e.key === "Enter") {
      try {
        const data = await axios({
          method: "get",
          url: url,
        });
        setResult(data);
        console.log(data);
      } catch (error) {
        alert(error);
      }
    }
  };

  function SkyImage() {
    return result.data.weather[0].main === "Clear" ? (
      <span>
        <img src={clear}></img>
      </span>
    ) : result.data.weather[0].main === "Clouds" ? (
      <span>
        <img src={clouds}></img>
      </span>
    ) : null;
  }

  return (
    <AppWrap>
      <div className="subName">API로 날씨 정보 확인하기</div>
      <div className="appContentWrap">
        <input
          className="input01"
          placeholder="도시명을 영문으로 입력하세요"
          value={location}
          onChange={e => setLocation(e.target.value)}
          type="text"
          width={"500px"}
          onKeyDown={searchWeather}></input>
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">지역 : {result.data.name}</div>
            <div className="temperature">
              온도 : {Math.round((result.data.main.temp - 273.15) * 10) / 10}
              ºC(섭씨)
            </div>
            <div className="sky">하늘 : {result.data.weather[0].main}</div>
            <div className="skyimg">
              <SkyImage />
            </div>
            <div className="country">나라 : {result.data.sys.country}</div>
          </ResultWrap>
        )}
        {Object.keys(result).length === 0 && <div></div>}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;
  border: 1px red solid;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    box-shadow: 0px 0px 5px #aeaeae;
    padding: 20px;
  }
  .subName {
    position: absolute;
    left: 41%;
    top: 25%;
    font-size: 30px;
    font-weight: 600;
  }
  .input01 {
    border: none;
    box-shadow: 0px 0px 5px #aeaeae;
    width: 200px;
    padding: 5px 5px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 0.5px black solid;
  border-radius: 8px;

  .skyimg {
    padding: 5px 0px;
  }
`;
