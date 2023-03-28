import type { ProColumns } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useState } from 'react';
import { searchUsers } from '@/services/ant-design-pro/api';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 64,
    valueType: 'indexBorder',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    copyable: true,
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    copyable: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: '邮件',
    dataIndex: 'email',
    copyable: true,
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'updateTime',
    valueType: 'dateTime',
  },
  {
    title: (_, type) => (type === 'table' ? '状态' : '列表状态'),
    dataIndex: 'state',
    initialValue: 'all',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
      },
    },
  },
  {
    title: '排序方式',
    key: 'direction',
    hideInTable: true,
    hideInDescriptions: true,
    dataIndex: 'direction',
    filters: true,
    onFilter: true,
    valueType: 'select',
    valueEnum: {
      asc: '正序',
      desc: '倒序',
    },
  },
];
// {
//   title: '标签',
//   dataIndex: 'labels',
//   width: 120,
//   render: (_, row) => (
//     <Space>
//       {row.labels.map(({ name, color }) => (
//         <Tag color={color} key={name}>
//           {name}
//         </Tag>
//       ))}
//     </Space>
//   ),
// },
//   {
//     title: 'option',
//     valueType: 'option',
//     dataIndex: 'id',
//     render: (text, row) => [
//       <a href={row.url} key="show" target="_blank" rel="noopener noreferrer">
//         查看
//       </a>,
//       <TableDropdown
//         key="more"
//         onSelect={(key) => message.info(key)}
//         menus={[
//           { key: 'copy', name: '复制' },
//           { key: 'delete', name: '删除' },
//         ]}
//       />,
//     ],
//   },
// ];

export default () => {
  const [type, setType] = useState('table');
  return (
    <ProCard>
      <Tabs activeKey={type} onChange={(e) => setType(e)}>
        <Tabs.TabPane tab="table" key="table" />
        <Tabs.TabPane tab="form" key="form" />
        <Tabs.TabPane tab="descriptions" key="descriptions" />
      </Tabs>
      {['table', 'form'].includes(type) && (
        <ProTable<API.CurrentUser>
          columns={columns}
          type={type as 'table'}
          request={async (params = {}) => {
            const userList = await searchUsers();
            return {
              date: userList,
            };
          }}
        />
      )}
    </ProCard>
  );
};
