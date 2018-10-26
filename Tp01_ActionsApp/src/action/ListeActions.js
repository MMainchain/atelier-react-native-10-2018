import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, onAlter}) => {

    const actionItems = [];
    for (var i=0; i < actions.length; i++) {
        actionItems.push(<UneAction onAlterClicked={onAlter} key={i} action={actions[i]} />);
    }

    return (
        <View>
            {
                actionItems
            } 
        </View>
    )
}

export default ListeActions