import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three'; // 引入 THREE 库

// 点云可视化组件
function PointCloudVisualization({ data }) {
  const { x, y, label, file_path } = data;

  const [pointSize, setPointSize] = useState(1); // 默认点大小为1
  const [hovered, setHovered] = useState(null); // 存储当前悬停的点的索引
  const [imageSrc, setImageSrc] = useState(''); // 存储当前显示的图像路径
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 }); // 存储图像的位置，初始化为0，0

  // 渲染点的颜色变化：根据 label 设置不同的颜色
  const getPointColor = (label) => {
    const color = new THREE.Color();
    if (label === 1) {
      color.set(0x4caf50); // 绿色
    } else {
      color.set(0xf44336); // 红色
    }
    return color;
  };

  // 当鼠标悬停在点上时触发
  const handlePointerOver = (index) => {
    setHovered(index); // 设置当前悬停的点
    setImageSrc(file_path[index]); // 获取对应点的图片路径
  };

  // 当鼠标移出时触发
  const handlePointerOut = () => {
    setHovered(null); // 清除悬停的点
    setImageSrc(''); // 清除图像路径
  };

  // 处理鼠标移动事件，更新图像位置
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e; // 获取鼠标的屏幕坐标
    setImagePosition({ x: clientX + 10, y: clientY - 10 }); // 更新图像的位置，稍微偏移一些避免重叠
  };

  // 使用 useEffect 来监听 imageSrc 的变化
  useEffect(() => {
    if (imageSrc) {
      console.log('ImageSrc has been updated:', imageSrc);
    }
  }, [imageSrc]); // 每当 imageSrc 发生变化时打印新的值

  return (
    <div
      style={{ width: '100vw', height: '100vh', position: 'relative' }}
      onMouseMove={handleMouseMove} // 监听鼠标移动事件
    >
      {/* React Three Fiber Canvas */}
      <Canvas camera={{ position: [0, 0, 200], fov: 50, near: 0.1, far: 1000 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        {/* 渲染二维点云 */}
        <group>
          {x.map((px, index) => (
            <mesh
              key={index}
              position={[px, y[index], 0]}
              scale={[pointSize, pointSize, 1]}
              onPointerOver={() => handlePointerOver(index)}
              onPointerOut={handlePointerOut}
            >
              <circleGeometry args={[0.5, 32]} />
              <meshStandardMaterial color={getPointColor(label[index])} />
            </mesh>
          ))}
        </group>
      </Canvas>

      {/* 控制点大小的滑动条 */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', zIndex: 10 }}>
        <label>Point Size</label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={pointSize}
          onChange={(e) => setPointSize(parseFloat(e.target.value))}
          style={{ width: '200px' }}
        />
      </div>

      {/* 显示图像，条件是鼠标悬停在点上 */}
      {hovered !== null && imageSrc && (
        <div
          style={{
            position: 'absolute',
            top: `${imagePosition.y}px`, // 使用鼠标位置更新图像的垂直位置
            left: `${imagePosition.x}px`, // 使用鼠标位置更新图像的水平位置
            zIndex: 20,
            pointerEvents: 'none', // 禁止图像遮挡其他交互
          }}
        >
          <img
            src={imageSrc}
            alt="Hovered Point"
            style={{ width: '100px', height: 'auto' }}
            onLoad={() => console.log('Image loaded')}
            onError={() => console.log('Image loading failed')}
          />
        </div>
      )}
    </div>
  );
}

export default PointCloudVisualization;
