import {
  Button,
  Icon,
  Cell,
  CellGroup,
  Field,
  List,
  Toast,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  NavBar,
  Tab,
  Tabs,
  SwipeCell,
  Dialog,
  Panel,
  PullRefresh,
  Actionsheet,
  Tag,
  Loading,
  Popup,
  Search,
  Checkbox,
  RadioGroup,
  Radio,
  Swipe,
  SwipeItem
} from 'vant'
// 按需引入，不需要的就删掉
export const install = (Vue) => {
  Vue.use(Button)
    .use(Icon)
    .use(Cell)
    .use(CellGroup)
    .use(Field)
    .use(List)
    .use(Toast)
    .use(Row)
    .use(Col)
    .use(Tabbar)
    .use(TabbarItem)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(SwipeCell)
    .use(Dialog)
    .use(Panel)
    .use(PullRefresh)
    .use(Actionsheet)
    .use(Tag)
    .use(Loading)
    .use(Popup)
    .use(Search)
    .use(Checkbox)
    .use(RadioGroup)
    .use(Radio)
    .use(Swipe)
    .use(SwipeItem)
}

export default install
