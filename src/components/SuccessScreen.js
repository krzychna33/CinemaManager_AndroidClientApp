import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Button 
} from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { connect } from 'react-redux';

class SuccessScreen extends React.Component {
    onBackButtonPressAndroid = () => {
        this.props.navigation.navigate('ShowingsScreen');
        return true;
    }

    render(){
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <View style={styles.container}>
                        <Text style={styles.title}>Your reservation is complete!</Text>
                        <Text>We send you an email with confirmation to <Text style={styles.boldText}>{this.props.email}</Text>. You can easy cancel reservation by clicking on button in email.</Text>
                        <Button
                            title="Finish"
                            onPress={() => this.props.navigation.navigate('ShowingsScreen')}
                        />
                </View>
            </AndroidBackHandler>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    boldText: {
        fontWeight: 'bold'
    },
});

const mapStateToProps = (state) => {
    return {
        email: state.user.email
    }
}

export default connect(mapStateToProps)(SuccessScreen)

