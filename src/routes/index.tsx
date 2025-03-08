import Home from '../pages/Home';
import DefaultLayout from '../layouts/DefaultLayout';

// 配置每个路由的 component 和 layouts
const routeConfig = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,  // 指定布局
    }
];

export default routeConfig;
