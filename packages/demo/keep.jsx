import React ,{button,input}from "react";
import {
  KeepaliveItem,
  KeepaliveScope,
  useCacheDestroy
} from "react-ui-gm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

function CompForm() {
  const [value, setValue] = React.useState("");
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}

function Atom({ propsNumber }) {
  const [number, setNumber] = React.useState(0);
  return (
    <div>
      props:{propsNumber} | 当前:{number}
      <button onClick={() => setNumber(number + 1)}>add++</button>
      <button onClick={() => setNumber(number - 1)}>del--</button>
    </div>
  );
}

function CompNumber() {
  const [number, setNumber] = React.useState(0);
  const [isShow, setShow] = React.useState(true);
  return (
    <div>
      <p>this is a number component</p>
      {isShow && <Atom propsNumber={number} />}
      {isShow && (
        <KeepaliveItem cacheId="number_atom">
          <Atom propsNumber={number} />
        </KeepaliveItem>
      )}
      <button onClick={() => setShow(!isShow)}>
        局部 {isShow ? "隐藏" : "展示"}
      </button>
      <br />
      <button onClick={() => setNumber(number + 1)}>add props</button>
    </div>
  );
}

function CompText() {
  const destroy = useCacheDestroy();
  return (
    <div>
      清除input的缓存
      {/* 销毁 cacheId = form 的组件 */}
      <button onClick={() => destroy("form")}>clean form cache</button>
      <br></br>
      清除number的缓存
      {/* 销毁 cacheId = form 的组件 */}
      <button onClick={() => destroy("number_atom")}>clean form cache</button>
    </div>
  );
}
/* 菜单栏组件 */
function Menus() {
  const navigate = useNavigate();
  return (
    <div>
      路由切换:
      <button style={{ marginRight: "10px" }} onClick={() => navigate("/form")}>
        输入页面
      </button>
      <button
        style={{ marginRight: "10px" }}
        onClick={() => navigate("/number")}
      >
        数字增减
      </button>
      <button style={{ marginRight: "10px" }} onClick={() => navigate("/text")}>
        清除cache页面
      </button>
    </div>
  );
}

export default function Keep() {
  return (
    <Router>
      <Menus />
      <KeepaliveScope>
        <Routes>
          <Route
            element={
              <KeepaliveItem cacheId="form">
                <CompForm />
              </KeepaliveItem>
            }
            path="/form"
          />
          <Route element={<CompNumber />} path="/number" />
          <Route element={<CompText />} path="/text" />
        </Routes>
      </KeepaliveScope>
    </Router>
  );
}