import React from "react";
import { StatusBar } from "react-native";
import NavigationService from "./Navigation";
import createStore from "./Store";
import { StoreProvider } from "easy-peasy";

import PrimaryNav from "./Navigation/AppNavigation";
import { Provider as PaperProvider } from "react-native-paper";

import { ThemeProvider } from "./Themes/Context/ThemeContext";
import { AppContextProvider } from "./Services/Auth/AppContext";
import { LocaleContextProvider } from "./i18n/LocaleContext";

import { Screen } from "./Components";
import colors from "./Themes/Colors";
import useTheme from "./Themes/Context";
import { APP_PREFIX } from "./Config/index";
import BottomPanel from "./Components/Panel";
import useNetInfo from "./Lib/NetInfo";

export let BottomAlert = null;
//create the easy store
const store = createStore();

const NetworkInfo = props => {
	const netinfo = useNetInfo();
	console.log("LOG_NETINFO", netinfo);

	return null;
};

//return root component
export default () => {
	return (
		<Screen>
			<NetworkInfo />
			<LocaleContextProvider>
				<StoreProvider store={store}>
					<StatusBar
						translucent
						backgroundColor={"rgba(0,0,0,0.2)"}
					/>
					<ThemeProvider>
						<ThemeConsumer />
					</ThemeProvider>
				</StoreProvider>
			</LocaleContextProvider>

			<BottomPanel
				ref={ref => {
					BottomAlert = ref;
				}}
			/>
		</Screen>
	);
};

const ThemeConsumer = props => {
	const { theme } = useTheme();

	return (
		<PaperProvider theme={theme}>
			<AppContextProvider>
				<PrimaryNav
					uriPrefix={APP_PREFIX}
					screenProps={{ theme }}
					ref={nav => NavigationService.setTopLevelNavigator(nav)}
				/>
			</AppContextProvider>
		</PaperProvider>
	);
};
