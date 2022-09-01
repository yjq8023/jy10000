import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Spin } from '@sinohealth/butterfly-ui-components/lib';
import AMapLoader from '@amap/amap-jsapi-loader';
import { SearchOutlined } from '@ant-design/icons';

import styles from './styles.less';

const mapKey = '8a2ede810c950e6ad9e0031e9a6064cb';

// eslint-disable-next-line no-underscore-dangle
(window as any)._AMapSecurityConfig = {
  securityJsCode: 'a168f7dcaa8f676b046674d8edb32509',
};

export type MapProps = {
  className?: string; // 样式
  scope?: number; // 范围参数
  onChooseAddress?: (address: string) => void;
  onLnglat?: (lnglat: any) => void;
  setLnglat?: Array<string>;
  setAddress?: string;
};

let map: any;
let placeSearch: any;
let timeout: any;
let marker: any;

const MapComponent: React.FC<MapProps> = ({
  className,
  scope,
  onChooseAddress,
  setLnglat,
  onLnglat,
  setAddress,
}) => {
  const [seeOrEdit, setSeeOrEdit] = React.useState<0 | 1>(0);

  // 2.dom渲染成功后进行map对象的创建
  useEffect(() => {
    console.log(setLnglat);
    AMapLoader.load({
      key: mapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.PlaceSearch', 'AMap.Marker', 'AMap.Geocoder'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map('container', {
          // 设置地图容器id
          viewMode: '3D', // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          // center: [116.368904, 39.913423], // 初始化地图中心点位置
        });
        marker = new AMap.Marker();
        const geocoder = new AMap.Geocoder();
        placeSearch = new AMap.PlaceSearch({
          // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
          city: '全国',
        });

        // 判断显示还是编辑
        if (scope && scope > 0) {
          marker.setPosition(setLnglat);
          map.add(marker);
          // 绘制圆型范围
          const circle = new AMap.Circle({
            // center: new AMap.LngLat(setLnglat),
            center: setLnglat,
            radius: scope * 1000, // 半径
            borderWeight: 2,
            // strokeColor: '#FF33FF',
            // strokeOpacity: 1,
            strokeWeight: 6,
            strokeOpacity: 0.2,
            fillOpacity: 0.4,
            strokeStyle: 'soild',
            strokeDasharray: [10, 10],
            // 线样式还支持 'dashed'
            fillColor: '#1791fc',
            zIndex: 50,
          });
          map.add(circle);
          map.setCenter(setLnglat);
          setSeeOrEdit(0);
        } else {
          // 地图点击事件
          map.on('click', (ev: any) => {
            // 触发事件的对象
            const { target, lnglat, pixel, type } = ev;
            marker.setPosition(lnglat);
            map.add(marker);
            geocoder.getAddress(lnglat, (status: any, result: any) => {
              if (status === 'complete' && result.regeocode) {
                const address = result.regeocode.formattedAddress;
                // 设置地址
                if (onChooseAddress) onChooseAddress(address);
                if (onLnglat) onLnglat(lnglat);
              }
            });
          });
          setSeeOrEdit(1);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map = {};
      placeSearch = {};
    };
  }, [setLnglat]);

  useEffect(() => {
    if (setAddress) {
      deFetchData(setAddress, (data: any) => {
        // setFetching(false);
        // setOptions(data);
        console.log(data);
        if (marker && data.length > 0) {
          map.setCenter(data[0].location);
          map.setZoom(16);
          marker.setPosition(data[0].location);
          // 将创建的点标记添加到已有的地图实例：
          map.add(marker);
          if (onLnglat) onLnglat({ lng: data[0].location[0], lat: data[0].location[1] });
        }
      });
    }
  }, [setAddress]);

  const [searchText, setSearchText] = React.useState<any>([]);
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<any>([]);

  const deFetchData = React.useMemo(() => {
    function fetchData(value: any, callback: any) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      function fake() {
        const str = value;
        placeSearch.search(str, (status: any, result: any) => {
          // console.log(result);
          if (status === 'complete') {
            const data = result.poiList.pois.map((item: any) => ({
              label: `${item.name} ${item.address}`,
              location: [item.location.lng, item.location.lat],
              value: item.id,
            }));
            callback(data);
          } else {
            callback([]);
          }
        });
      }

      timeout = setTimeout(fake, 800);
    }

    return fetchData;
  }, []);

  const handleSearch = (value: any) => {
    if (value) {
      setFetching(true);
      deFetchData(value, (data: any) => {
        setFetching(false);
        setOptions(data);
      });
    } else {
      setOptions([]);
    }
  };

  const handleChange = (newValue: any) => {
    setSearchText(newValue);
  };

  /**
   * 选中定点
   * @param LabeledValue
   * @param optionList
   * @returns
   */
  const handleSelect = (LabeledValue: any, optionList: any) => {
    console.log(LabeledValue, optionList);
    map.setCenter(optionList.location);
    map.setZoom(16);
    if (marker) {
      marker.setPosition(optionList.location);
      // 将创建的点标记添加到已有的地图实例：
      map.add(marker);
      if (onChooseAddress) {
        onChooseAddress(optionList.label);
      }
      // lnglat.lng},${lnglat.lat
      if (onLnglat) onLnglat({ lng: optionList.location[0], lat: optionList.location[1] });
    }
  };
  // 1.初始化创建地图容器,div标签作为地图容器，同时为该div指定id属性；
  return (
    <div className={styles['container-box']}>
      <div id="container" className={`${styles.map} ${className}`} />
      {/* 地图搜索框 */}
      {!!seeOrEdit && (
        <Select
          showSearch
          value={searchText}
          suffixIcon={<SearchOutlined style={{ color: '#BFBFBF' }} />}
          onChange={handleChange}
          filterOption={false}
          onSearch={handleSearch}
          notFoundContent={fetching ? <Spin size="small" /> : null}
          options={options}
          className={styles['container-box-input']}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

MapComponent.defaultProps = {
  scope: 0,
};

// 导出地图组建类
export default MapComponent;
