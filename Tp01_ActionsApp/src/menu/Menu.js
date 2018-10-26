import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({changeFilter}) => (
    <View style={styles.menu}>
        <OptionMenu name='Toutes' onSelect={() => changeFilter('all')}/>
        <OptionMenu name='En cours' onSelect={() => changeFilter('pending')}/>
        <OptionMenu name='Terminées' onSelect={() => changeFilter('ended')}/>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu