import React, { useState, useEffect } from 'react';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

interface IconSliderProps {
  max: number;
  min: number;
}

const IconSlider: React.FC<IconSliderProps> = (props) => {
  const { max, min } = props;
  const [value, setValue] = useState(0); // 초기값 설정

  useEffect(() => {
    setValue(0); // 컴포넌트가 마운트될 때 슬라이더 값을 0으로 설정
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
  const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';

  return (
    <div className="icon-wrapper">
      <FrownOutlined className={preColorCls} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined className={nextColorCls} />
    </div>
  );
};

const App: React.FC = () => <IconSlider min={0} max={10} />;

export default App;
