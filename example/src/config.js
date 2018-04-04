import Home from './modules/home/Home';
import About from './modules/about/About';
import Api from './modules/api/Api';
import Game from './modules/game/Game';
import ReactReduxTest from './modules/redux/index';
import ContextTest from './modules/context/index';

export const testApiUrl = 'https://api.randomuser.me/?results=';

export const menu = [
		{url: '/about', isExact: false, displayName: 'About', order: 6, component: About},
		{url: '/game', isExact: false, displayName: 'Game', order: 1, component: Game},
		{url: '/api', isExact: false, displayName: 'Api use', order: 2, component: Api},
		{url: '/', isExact: true, displayName: 'Home', order: 0, component: Home},
		{url: '/redux', isExact: false, displayName: 'Redux', order: 4, component: ReactReduxTest},
		{url: '/context', isExact: false, displayName: 'Context', order: 5, component: ContextTest}
	];