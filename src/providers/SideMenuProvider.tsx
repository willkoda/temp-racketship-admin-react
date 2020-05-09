import React, {useState} from 'react';

interface Props {
    children: Array<JSX.Element> | JSX.Element;
}

interface Context {
    sideMenuVisible: boolean;
    toggleSideMenu(): void;
}

function SideMenuProvider(props: Props) {
    const [sideMenuVisible, setSideMenuVisible] = useState(true);

    const toggleSideMenu = () => {
        setSideMenuVisible(!sideMenuVisible);
    }

    const state = {
        sideMenuVisible: sideMenuVisible,
        toggleSideMenu: toggleSideMenu
    }

    return (
        <SideMenuContext.Provider value={state}>
            {props.children}
        </SideMenuContext.Provider>
    )
}

export const SideMenuContext = React.createContext<Context>(null!);
export default SideMenuProvider;