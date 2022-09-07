import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mapMenuConfig, mapMenuParent, MenuItem } from '@/config/menu';
import usePermission from '@/hooks/usePermission';

type defaultSelectedDataProps = {
  headerMenuSelectedKeys?: string[];
  sideMenuSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  sideMenuData?: MenuItem[];
};
type getDefaultSelectedMenuRes = {
  headerMenuSelectedKeys: string[];
  sideMenuSelectedKeys: string[];
  defaultOpenKeys: string[];
  sideMenuData: MenuItem[];
};
// 根据当前路由获取默认菜单数据
function getDefaultSelectedMenu(menuConfig: MenuItem[]): getDefaultSelectedMenuRes {
  const { pathname } = window.location;
  let headerMenuSelectedKeys: string[] = [];
  const sideMenuSelectedKeys: string[] = [];
  const defaultOpenKeys: string[] = [];
  let sideMenuData: never[] = [];
  mapMenuConfig(menuConfig, (item: any) => {
    // 当没有任意菜单与当前页面匹配时，采取模糊匹配
    if (
      pathname.indexOf(item.key) > -1 &&
      item.key !== pathname &&
      headerMenuSelectedKeys.length === 0
    ) {
      if (item.parent) {
        defaultOpenKeys.push(item.key);
      } else {
        headerMenuSelectedKeys.push(item.key);
        sideMenuData = item.children;
      }
    }
    // 当有菜单与页面匹配时
    if (item.key === pathname) {
      sideMenuSelectedKeys.push(item.key);
      mapMenuParent(item, (parent: any) => {
        if (parent.parent) {
          defaultOpenKeys.push(parent.key);
        } else {
          headerMenuSelectedKeys = [parent.key];
          sideMenuData = parent.children;
        }
      });
    }
  });
  return {
    headerMenuSelectedKeys,
    sideMenuSelectedKeys,
    defaultOpenKeys,
    sideMenuData,
  };
}

function getNoOnePath(menuConfig: MenuItem[]): string {
  let path = '';
  mapMenuConfig(menuConfig, (item: any) => {
    if (item.path && !path) {
      path = item.path;
    }
  });
  return path;
}
export function useMenuConfig(): [MenuItem[], MenuItem[], defaultSelectedDataProps] {
  const navigate = useNavigate();
  const { menuConfig } = usePermission();
  const [defaultSelected, setDefaultSelected] = useState<defaultSelectedDataProps>({});
  const [sideMenu, setSideState] = useState<MenuItem[]>([]);
  const [headerMenu, setHeaderState] = useState<MenuItem[]>([]);
  const changeDefaultSelected = (data: MenuItem[]) => {
    const defaultSelectedData = getDefaultSelectedMenu(data);
    setDefaultSelected({
      ...defaultSelectedData,
      defaultOpenKeys:
        defaultSelectedData.defaultOpenKeys.length > 0
          ? defaultSelectedData.defaultOpenKeys
          : defaultSelected.defaultOpenKeys,
      sideMenuSelectedKeys:
        defaultSelectedData.sideMenuSelectedKeys.length > 0
          ? defaultSelectedData.sideMenuSelectedKeys
          : defaultSelected.sideMenuSelectedKeys,
    });
    if (defaultSelectedData.sideMenuData && defaultSelectedData.sideMenuData.length > 0) {
      setSideState(defaultSelectedData.sideMenuData);
    }
  };
  // 提取头部菜单数据以及设置头部菜单和左侧菜单联动逻辑
  useEffect(() => {
    if (menuConfig.length === 0) return;
    const menuList = menuConfig.map((item) => ({
      ...item,
      children: [],
      onClick() {
        if (item.children) {
          setSideState(item.children);
          navigate(getNoOnePath(item.children));
          changeDefaultSelected(menuConfig);
        }
        if (item.path) {
          navigate(item.path);
        }
      },
    }));
    setHeaderState(menuList);
    changeDefaultSelected(menuConfig);
  }, [menuConfig]);
  useEffect(() => {
    if (menuConfig.length === 0) return;
    changeDefaultSelected(menuConfig);
  }, [navigate]);
  return [headerMenu, sideMenu, defaultSelected];
}

export default useMenuConfig;
