import { Layout } from 'antd';
import { NavMenu } from '../NavMenu';
import React from 'react';

const { Header, Content } = Layout;

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NavMenu />
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
