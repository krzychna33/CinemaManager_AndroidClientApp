import React from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {connect} from 'react-redux';
import {setUserEmail} from '../actions/user';

export class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: 'example@exmaple.io'
        }
    }

    onEmailChange = (email) => {
        this.setState(({ email }))
    }

    onButtonPress = () => {
        this.props.navigation.navigate('ShowingsScreen');
        this.props.setUserEmail(this.state.email);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.innerBox}>
                    <Text style={styles.title}>Welcome to the CinemaManager!</Text>
                    <View style={styles.innerFormBox}>
                        <Text>Please type your e-mail adress to continue.</Text>
                        <TextInput
                            style={styles.emailInput}
                            value={this.state.email}
                            onChangeText={this.onEmailChange}
                        />
                        <Button
                            style={styles.button}
                            title="Continue"
                            onPress={this.onButtonPress}
                        />
                    </View>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emailInput: {
        textAlign: 'center',
        width: '75%',
        height: 30,
        borderColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 50
    },
    innerBox: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18
    },
    innerFormBox: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: 60
    }
});

const mapDispatchToProps = (dispatch) => {
    return {
        setUserEmail: (email) => dispatch(setUserEmail(email))
    }
};

export default connect(undefined, mapDispatchToProps)(WelcomeScreen)