import { getUuid } from '@/utils';

const menuConfig = [
  {
    label: '模版菜单',
    children: [
      {
        label: '模板页面',
        children: [
          {
            path: '/page1',
            label: '页面一',
          },
          {
            path: '/page2',
            label: '页面二',
          },
        ],
      },
    ],
  },
  {
    label: 'Demo',
    children: [
      {
        label: 'demo页',
        children: [
          {
            path: '/page11',
            label: 'demo页面一',
          },
          {
            path: '/page22',
            label: 'demo页面二',
          },
        ],
      },
    ],
  },
];
function mapMenuConfig(menu) {
  return menu.map((item) => ({
    key: item.path || getUuid(),
    ...item,
    children: item.children ? mapMenuConfig(item.children) : [],
  }));
}
export function getMenuConfig() {
  return Promise.resolve(mapMenuConfig(menuConfig));
}
export default menuConfig;
