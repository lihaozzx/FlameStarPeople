import Vue from 'vue';

import {
	Button,
	Container,
	Aside,
	Main,
	Menu,
	MenuItem,
	MenuItemGroup,
	Submenu,
	Tooltip,
	Input,
	Tabs,
	TabPane,
	Checkbox,
	Notification,
	Table,
	TableColumn,
	Pagination,
	Dialog,
	Form,
	FormItem,
	Col,
	CheckboxGroup,
} from 'element-ui';

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Tooltip);

Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(Tabs);
Vue.use(TabPane);

Vue.use(Table);
Vue.use(TableColumn);

Vue.use(Pagination);
Vue.use(Dialog);

Vue.use(Form);
Vue.use(FormItem);

Vue.use(Col)

Vue.prototype.$notify = Notification;