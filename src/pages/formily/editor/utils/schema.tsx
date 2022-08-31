import { TreeNode } from '@sinohealth/designable-core';

type categoryType = 'Number' | 'Datetime' | 'Boolean'
type labelOptionsItem = { label: string, labelCode: string, sort: number }
type AiSchema = {
  fieldId: string;
  label: string;
  required: boolean;
  type: categoryType;
  enum: any[]
}

const defaultSchemaConfig = {
  Boolean: {
    type: 'string',
    title: '布尔',
    enum: [
      {
        label: '是',
        value: '1',
      },
      {
        label: '否',
        value: '0',
      },
    ],
    key: 'IoRadio.Group',
    'x-decorator': 'FormItem',
    'x-component': 'Radio.Group',
  },
  Datetime: {
    title: '日期时间',
    key: 'IoDatePicker',
    'x-decorator': 'FormItem',
    'x-component': 'DatePicker',
    'x-component-props': {
      placeholder: '请选择时间',
      showTime: true,
    },
    type: 'string',
  },
  Number: {
    title: '数字',
    key: 'IoNumberPicker',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-component-props': {
      placeholder: '请输入',
    },
    type: 'string',
  },
};

export const getSchemaItem = (aiSchema: AiSchema) => {
  const defaultSchemaItem = defaultSchemaConfig[aiSchema.type] || {};
  return {
    ...defaultSchemaItem,
    name: aiSchema.fieldId,
    title: aiSchema.label,
  };
};

const transformOptions = (labelOptions: labelOptionsItem[] = []) => {
  return labelOptions?.map((item) => ({
    label: item.label,
    value: item.labelCode,
  }));
};

export const transformDataSource = (nodeR: TreeNode) => {
  const currentNode = nodeR;
  const dots = (count: number) => {
    let dotsStr = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < count; i++) {
      dotsStr += '.';
    }
    return dotsStr;
  };
  const targetPath = (parentNode: TreeNode, targetNode: TreeNode) => {
    const path: any = [];
    const transform = (node: TreeNode) => {
      if (node && node !== parentNode) {
        path.push(node.props?.name || node.id);
      } else {
        transform(node.parent);
      }
    };
    transform(targetNode);
    return path.reverse().join('.');
  };
  const hasNoVoidChildren: any = (n: TreeNode) => {
    return n.children?.some((node: any) => {
      if (node.props.type !== 'void' && node !== currentNode) return true;
      return hasNoVoidChildren(node);
    });
  };
  const findRoot = (node: TreeNode): TreeNode => {
    if (!node?.parent) return node;
    if (node?.parent?.componentName !== node.componentName) return node.parent;
    return findRoot(node.parent);
  };
  const findArrayParent: any = (node: TreeNode) => {
    if (!node?.parent) return;
    // eslint-disable-next-line consistent-return
    if (node.parent?.props?.type === 'array') return node.parent;
    if (node.parent === root) return;
    // eslint-disable-next-line consistent-return
    return findArrayParent(node.parent);
  };
  const transformRelativePath = (arrayNode: TreeNode, targetNode: TreeNode) => {
    if (targetNode.depth === currentNode.depth) return `.${targetNode.props?.name || targetNode.id}`;
    return `${dots(currentNode.depth - arrayNode.depth)}[].${targetPath(
      arrayNode,
      targetNode,
    )}`;
  };
  const transformChildren: any = (children: TreeNode[], path = []) => {
    return children.reduce((buf, node: any) => {
      if (node === currentNode) return buf;
      if (node.props.type === 'array' && !node.contains(currentNode)) return buf;
      if (node.props.type === 'void' && !hasNoVoidChildren(node)) return buf;
      const currentPath = path.concat(node.props.name || node.id);
      const arrayNode = findArrayParent(node);
      const label =
        node.props.title ||
        node.props['x-component-props']?.title ||
        node.props.name ||
        node.designerProps.title;
      const value = arrayNode
        ? transformRelativePath(arrayNode, node)
        : currentPath.join('.');
      return buf.concat({
        // @ts-ignore
        label,
        value: `$${value}`,
        node,
        children: transformChildren(node.children, currentPath),
      });
    }, []);
  };
  const root = findRoot(nodeR);
  if (root) {
    return transformChildren(root.children);
  }
  return [];
};

export default {
  getSchemaItem,
  transformDataSource,
};
