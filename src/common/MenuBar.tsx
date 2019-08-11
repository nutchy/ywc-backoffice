import { Icon, Layout, Menu } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useReactRouter from 'use-react-router'

import Panel from '../ui/Panel'

import LogoSVG from '../assets/logo.white.svg'

import { SelectParam } from 'antd/lib/menu'
import SubMenu from 'antd/lib/menu/SubMenu'
import { Padding } from '../utils/styled-helper'

const { Sider } = Layout

const SideSlider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`

const Logo = styled.img`
  width: 100%;
  height: 80px;
  padding: 0 1em;
  margin: 1em 0;
`

// const Heading = styled.h1`
//   padding: 0;
//   color: #333;
//   font-size: 25px;
//   margin-bottom: 30px;
// `

const ContentLayout = styled.div`
  position: absolute;
  width: calc(100vw - 200px);
  left: 200px;
  padding: 20px;
`

const Footer = styled.div`
  color: #777;
  font-size: 14px;
  width: 100%;
  margin: 30px 0;
  text-align: center;
`

interface MenuItem {
  icon: string
  name: string
  to: string
}

interface MenuItems {
  icon: string
  name: string
  to: string
  submenu?: MenuItem[]
}

interface MenuBarProps {
  children: React.ReactChildren | any
  menus: MenuItems[]
  header: string
}

const MenuBar = (props: MenuBarProps) => {
  const { menus, children } = props

  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(['1'])

  const { location } = useReactRouter()

  const handleChange = (param: SelectParam) => {
    setSelected([param.key])
  }

  useEffect(() => {
    menus.forEach((menu, i) => {
      if (menu.submenu) {
        menu.submenu.forEach((submenu, j) => {
          if (submenu.to === location.pathname) {
            setSelected([`${i + 1}${j + 1}`])
          }
        })
      }
      if (menu.to === location.pathname) {
        setSelected([`${i + 1}`])
      }
    })
  }, [menus, location.pathname])

  return (
    <Fragment>
      <Layout>
        <SideSlider
          collapsible={true}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Logo src={LogoSVG} />

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selected}
            onSelect={handleChange}
          >
            {menus.map((menu, i) => {
              if (menu.submenu) {
                const subMenus = menu.submenu.map((submenu, j) => {
                  return (
                    <Menu.Item key={`${i + 1}${j + 1}`}>
                      <Link to={submenu.to}>
                        {submenu.icon && <Icon type={submenu.icon} />}
                        <span className="nav-text">{submenu.name}</span>
                      </Link>
                    </Menu.Item>
                  )
                })
                return (
                  <SubMenu
                    key={i + 1}
                    title={
                      <>
                        <Icon type={menu.icon} />
                        <span className="nav-text">{menu.name}</span>
                      </>
                    }
                  >
                    {subMenus}
                  </SubMenu>
                )
              }

              return (
                <Menu.Item key={i + 1}>
                  <Link to={menu.to}>
                    <Icon type={menu.icon} />
                    <span className="nav-text">{menu.name}</span>
                  </Link>
                </Menu.Item>
              )
            })}
          </Menu>
        </SideSlider>

        <ContentLayout>
          <Padding>
            <Panel>{children}</Panel>
          </Padding>

          <Footer>
            YWC Grading System @2019 Created by Wiput Pootong, Chun Rapeepat
          </Footer>
        </ContentLayout>
      </Layout>
    </Fragment>
  )
}

export default MenuBar
