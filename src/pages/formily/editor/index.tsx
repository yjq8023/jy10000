// @ts-nocheck
import '@sinohealth/designable-react/dist/designable.react.umd.production.css';
import '@sinohealth/designable-react-settings-form/dist/designable.settings-form.umd.production.css';
import React, { useState, useMemo, useEffect } from 'react';
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@sinohealth/designable-react';
import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@sinohealth/designable-react-settings-form';
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@sinohealth/designable-core';
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '@sinohealth/designable-formily-antd';
import { useSearchParams } from 'react-router-dom';
import {
  LogoWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
  LinkagesSetter,
} from './widgets';
import { saveSchema } from './service';
import style from './index.less';
import { getIoComponents } from '@/pages/formily/editor/utils';
import IO from '@/pages/formily/editor/components/IO';

setNpmCDNRegistry('//unpkg.com');

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
    },
  },
  'ko-KR': {
    sources: {
      Inputs: '입력',
      Layouts: '레이아웃',
      Arrays: '배열',
      Displays: '디스플레이',
    },
  },
});

const FormilyEditor = () => {
  const [ioComponents, setIoComponents] = useState([]);
  const [params] = useSearchParams();
  const type = params.get('type');
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine);
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );
  useEffect(() => {
    setIoComponents(getIoComponents());
  }, []);
  // @ts-ignore
  const renderResourceWidget = () => {
    const IoResourceWidget = (
      <ResourceWidget
        title="决策流IO"
        className={style.ioComponents}
        sources={ioComponents}
      />
    );
    const InputResourceWidget = (
      <ResourceWidget
        title="sources.Inputs"
        sources={[
          IO,
          Input,
          Password,
          NumberPicker,
          Rate,
          Slider,
          Select,
          TreeSelect,
          Cascader,
          Transfer,
          Checkbox,
          Radio,
          DatePicker,
          TimePicker,
          Upload,
          Switch,
          ObjectContainer,
        ]}
      />
    );
    const LayoutsResourceWidget = (
      <ResourceWidget
        title="sources.Layouts"
        sources={[
          Card,
          FormGrid,
          FormTab,
          FormLayout,
          FormCollapse,
          Space,
        ]}
      />
    );
    const ArrayResourceWidget = (
      <ResourceWidget
        title="sources.Arrays"
        sources={[ArrayCards, ArrayTable]}
      />
    );
    const TextResourceWidget = (
      <ResourceWidget title="sources.Displays" sources={[Text]} />
    );
    if (type === 'beforeInfo') {
      return (
        <>
          { IoResourceWidget }
          { TextResourceWidget }
        </>
      );
    }
    if (type === 'followUp') {
      return (
        <>
          { IoResourceWidget }
          { InputResourceWidget }
          { LayoutsResourceWidget }
          { ArrayResourceWidget }
          { TextResourceWidget }
        </>
      );
    }
    return (
      <>
        { TextResourceWidget }
        { InputResourceWidget }
        { LayoutsResourceWidget }
        { ArrayResourceWidget }
      </>
    );
  };
  return (
    <div className={style.editor}>
      <Designer engine={engine}>
        <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
          <CompositePanel>
            <CompositePanel.Item title="panels.Component" icon="Component">
              { renderResourceWidget() }
            </CompositePanel.Item>
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            {/* <CompositePanel.Item title="panels.History" icon="History"> */}
            {/*  <HistoryWidget /> */}
            {/* </CompositePanel.Item> */}
          </CompositePanel>
          <Workspace id="form">
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget
                  use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
                />
              </ToolbarPanel>
              <ViewportPanel style={{ height: '100%' }}>
                <ViewPanel type="DESIGNABLE">
                  {(p) => (
                    <ComponentTreeWidget
                      components={{
                        Form,
                        Field,
                        Input,
                        Select,
                        TreeSelect,
                        Cascader,
                        Radio,
                        Checkbox,
                        Slider,
                        Rate,
                        NumberPicker,
                        Transfer,
                        Password,
                        DatePicker,
                        TimePicker,
                        Upload,
                        Switch,
                        Text,
                        Card,
                        ArrayCards,
                        ArrayTable,
                        Space,
                        FormTab,
                        FormCollapse,
                        FormGrid,
                        FormLayout,
                        ObjectContainer,
                        IO,
                      }}
                    />
                  )}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree, onChange) => (
                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                  )}
                </ViewPanel>
                <ViewPanel type="MARKUP" scrollable={false}>
                  {(tree) => <MarkupSchemaWidget tree={tree} />}
                </ViewPanel>
                <ViewPanel type="PREVIEW">
                  {(tree) => <PreviewWidget tree={tree} />}
                </ViewPanel>
              </ViewportPanel>
            </WorkspacePanel>
          </Workspace>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm components={{ LinkagesSetter }} uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </StudioPanel>
      </Designer>
    </div>
  );
};

export default FormilyEditor;
