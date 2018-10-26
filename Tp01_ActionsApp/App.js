import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        actions: [],
        filter: 'all',
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie);
        this.setState({
            texteSaisie: nouvelleSaisie,
        });
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        console.log('Vous avez cliqué sur Valider !');
        this.setState((prevState) => ({
            actions: [
                ...prevState.actions, 
                {
                    name: prevState.texteSaisie,
                    state: 'pending',
                },
            ],
            texteSaisie: '',
        }));
    }

    /**
     * Méthode appelée pour modifier une action
     * 
     * @param action l'action a modifier 
     * @param type type de l'action à réaliser
     */
    alterAction = (action, type) => {
        console.log(action);
        switch(type) {
            case 'Supprimer':
                this.deleteAction(action);
                break;
            case 'Terminer':
                this.endAction(action);
                break;
            default:
                console.log("Action non définie");
        };
    };

    /**
     * Méthode appelée pour supprimer une action
     * 
     * @param action l'action a supprimer
     */
    deleteAction(toDeleteAction) {
        this.setState((oldState) => ({
            actions: oldState.actions.filter((action) => action.name != toDeleteAction.name)
        }));
    }

    /**
     * Méthode appelée pour supprimer une action
     * 
     * @param action l'action a supprimer
     */
    endAction(toEndAction) {
        this.setState((oldState) => {
            let newStateActions = oldState.actions;
            let actionToEnd = newStateActions.filter((action) => (action.name == toEndAction.name))[0];
            actionToEnd.state = actionToEnd.state === 'ended' ? 'pending' : 'ended';
            return { actions: newStateActions };
        });
    }

    /**
     * Retourne les actions filtrés
     */
    getActionsForFilter() {
        switch(this.state.filter) {
            case 'all':
                return this.state.actions;
                break;
            case 'ended':
                return this.state.actions.filter((action) => (action.state === 'ended'));
                break;
            case 'pending':
                return this.state.actions.filter((action) => (action.state === 'pending'));
                break;
            default:
                console.log('Filtre inconnu');
                return this.state.actions;
        }
    }

    /**
     * Méthode invoquée lorsque que le filtre change.
     *
     * @param filter le nouveau filtre
     */
    quandLeFiltreChange(filter) {
        console.log(filter);
        this.setState({
            filter: filter,
        });
    }

    render() {
        const {texteSaisie, actions} = this.state

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions actions={this.getActionsForFilter(actions)} onAlter={this.alterAction}/>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu changeFilter={(filtre) => this.quandLeFiltreChange(filtre)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})