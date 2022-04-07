import { useState, useEffect } from 'react';
import { getMenuConfig } from '@/config/menu';

export function useMenuConfig() {
  const [menuConfig, setMenuConfig] = useState([]);
  useEffect(() => {
    getMenuConfig().then((data) => {
      setMenuConfig(data);
    });
  }, []);
  const [sideMenu, setSideState] = useState([]);
  const [headerMenu, setHeaderState] = useState([]);
  useEffect(() => {
    const menuList = menuConfig.map((item) => ({
      ...item,
      children: [],
      onClick() {
        setSideState(item.children);
      },
    }));
    setHeaderState(menuList);
  }, [menuConfig]);
  return [headerMenu, sideMenu];
}

export default useMenuConfig;
