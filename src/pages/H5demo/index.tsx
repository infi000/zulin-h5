import React from 'react'
import { CapsuleTabs } from 'antd-mobile'

export default () => {
  return (
    <>
        <CapsuleTabs>
          <CapsuleTabs.Tab title='水果' key='fruits'>
            菠萝
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='蔬菜' key='vegetables'>
            西红柿
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='动物' key='animals'>
            蚂蚁
          </CapsuleTabs.Tab>
        </CapsuleTabs>

      <div title='超长自动滑动'>
        <CapsuleTabs defaultActiveKey='1'>
          <CapsuleTabs.Tab title='Espresso' key='1'>
            1
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Coffee Latte' key='2'>
            2
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Cappuccino' key='3'>
            3
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Americano' key='4'>
            4
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Flat White' key='5'>
            5
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Caramel Macchiato' key='6'>
            6
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='Cafe Mocha' key='7'>
            7
          </CapsuleTabs.Tab>
        </CapsuleTabs>
      </div>

      <div title='没有内容区'>
        <CapsuleTabs>
          <CapsuleTabs.Tab title='水果' key='fruits' />
          <CapsuleTabs.Tab title='蔬菜' key='vegetables' />
          <CapsuleTabs.Tab title='动物' key='animals' />
        </CapsuleTabs>
      </div>

      <div title='禁用状态'>
        <CapsuleTabs>
          <CapsuleTabs.Tab title='水果' key='fruits' />
          <CapsuleTabs.Tab title='蔬菜' key='vegetables' />
          <CapsuleTabs.Tab title='动物' key='animals' disabled />
        </CapsuleTabs>
      </div>
    </>
  )
}