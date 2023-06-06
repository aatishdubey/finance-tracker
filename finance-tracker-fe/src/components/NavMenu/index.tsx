import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import menu_items from './menu_items';
import { useEffect, useState } from 'react';

const { Sider } = Layout;

export const NavMenu = () => {
  const { pathname } = useLocation();
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const selected_menu_item = [
      menu_items.findIndex(item => item.link === pathname).toString(),
    ];
    setSelectedKeys(selected_menu_item);
  }, [pathname]);

  return (
    <Sider>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
        {menu_items.map((item, index) => (
          <Menu.Item key={index}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
