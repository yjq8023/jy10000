import { useState, useEffect } from 'react';
import {
  getMenuConfig,
  mapMenuConfig,
  mapMenuParent,
  MenuItem,
} from '@/config/menu';

type defaultSelectedDataProps = {
  headerMenuSelectedKeys?: string[],
  sideMenuSelectedKeys?: string[],
  defaultOpenKeys?: string[],
  sideMenuData?: MenuItem[],
}
function getDefaultSelectedMenu(menuConfig: MenuItem[]): defaultSelectedDataProps {
  const { pathname } = window.location;
  const headerMenuSelectedKeys: string[] = [];
  const sideMenuSelectedKeys: string[] = [];
  const defaultOpenKeys: string[] = [];
  let sideMenuData: never[] = [];
  mapMenuConfig(menuConfig, (item: any) => {
    if (item.key === pathname) {
      sideMenuSelectedKeys.push(item.key);
      mapMenuParent(item, (parent: any) => {
        if (parent.parent) {
          defaultOpenKeys.push(parent.key);
        } else {
          headerMenuSelectedKeys.push(parent.key);
          sideMenuData = parent.children;
        }
      });
    }
  });
  return {
    headerMenuSelectedKeys, sideMenuSelectedKeys, defaultOpenKeys, sideMenuData,
  };
}
export function useMenuConfig(): [MenuItem[], MenuItem[], defaultSelectedDataProps] {
  const [menuConfig, setMenuConfig] = useState<MenuItem[]>([]);
  const [defaultSelected, setDefaultSelected] = useState<defaultSelectedDataProps>({});
  const [sideMenu, setSideState] = useState<MenuItem[]>([]);
  const [headerMenu, setHeaderState] = useState<MenuItem[]>([]);
  useEffect(() => {
    getMenuConfig().then((data) => {
      setMenuConfig(data);
      const defaultSelectedData = getDefaultSelectedMenu(data);
      setDefaultSelected(defaultSelectedData);
      if (defaultSelectedData.sideMenuData && defaultSelectedData.sideMenuData.length > 0) {
        setSideState(defaultSelectedData.sideMenuData);
      }
    });
  }, []);
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
  return [headerMenu, sideMenu, defaultSelected];
}

export default useMenuConfig;
