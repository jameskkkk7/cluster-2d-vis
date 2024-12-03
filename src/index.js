import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const data = {
  x: [10, 20, 30, 40],  // 每个点的 x 坐标
  y: [15, 25, 35, 45],  // 每个点的 y 坐标
  label: [1, 2, 1, 2]    // 每个点的标签，用来区分不同类别的点
};

const file_path = '/images/point_images';  // 图像路径
root.render(
  <React.StrictMode>
    <App data={data} file_path={file_path}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
