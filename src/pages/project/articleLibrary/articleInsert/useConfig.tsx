import { Modal } from '@sinohealth/butterfly-ui-components/lib';
import { QuestionCircleFilled, PictureOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import { useNavigate } from 'react-router-dom';
import Table from 'braft-extensions/dist/table';
import ColorPicker from 'braft-extensions/dist/color-picker';
import { useEffect } from 'react';
import { removeLocalStorage } from '@/utils/cookies';

const { confirm } = Modal;

export type MEDIATYPE = {
  id: number;
  url: string;
  type: 'IMAGE' | 'VIDEO';
  name: string;
  data?: {
    controls: boolean;
  };
};

export const useConfig = () => {
  const navigate = useNavigate();

  const Controls: any = [
    'headings',
    // 'font-family',
    'font-size',
    'line-height',
    'letter-spacing',
    'separator',
    'text-color',
    'bold',
    'text-align',
    'text-indent',
    'separator',
    'list-ol',
    'list-ul',
    'italic',
    'strike-through',
    'superscript',
    'subscript',
    'underline',
    'separator',
    // 'blockquote',
    // 'code',
    // 'emoji',
    'table',
    'hr',
    'link',
    // 'media',
    'separator',
    'remove-styles',
    {
      key: 'clear',
      title: '清除全部内容',
    },
    'separator',
    'fullscreen',
    'undo',
    'redo',
  ];

  const DefaultUse = () => {
    BraftEditor.use(
      ColorPicker({ includeEditors: ['editor-id'], theme: 'light', closeButtonText: '关闭' }),
    );
    BraftEditor.use(
      Table({
        defaultColumns: 5, // 默认列数
        defaultRows: 5, // 默认行数
        withDropdown: true, // 插入表格前是否弹出下拉菜单
        columnResizable: true, // 是否允许拖动调整列宽，默认false
        exportAttrString:
          'border="1" style="border-collapse: collapse;table-layout:fixed;width: 100%;border:1px;text-align:center;padding:5px;min-height:100px"', // 指定输出HTML时附加到table标签上的属性字符串
        includeEditors: ['editor-id'],
      }),
    );
  };

  DefaultUse();

  const handleCancelSave = (callback: () => void) => {
    confirm({
      title: '当前编辑还未保存, 是否需要保存?',
      icon: <QuestionCircleFilled style={{ color: '#EA6868' }} />,
      okButtonProps: { danger: true },
      okText: '保存',
      cancelButtonProps: { type: 'info' },
      cancelText: '不保存',
      onOk: async () => {
        return new Promise((resolve) => {
          const timer = setTimeout(() => {
            resolve(true);
            callback();
            clearTimeout(timer);
          }, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {
        navigateBack();
      },
    });
  };

  const navigateBack = () => {
    removeLocalStorage('ARTICLE_DATA');
    navigate(-1);
  };

  useEffect(() => {
    const listener = (ev: any) => {
      ev.preventDefault();
      // eslint-disable-next-line no-param-reassign
      ev.returnValue = '文章还未保存，确定离开吗？';
    };
    window.addEventListener('beforeunload', listener);
    return () => {
      removeLocalStorage('ARTICLE_DATA');
      window.removeEventListener('beforeunload', listener);
    };
  }, []);

  return { Controls, navigateBack, handleCancelSave };
};

export default useConfig;
