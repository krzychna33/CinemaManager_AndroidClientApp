import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import axiosInstance from '../utils/axios';

class ReservationConfirm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            seats: props.navigation.getParam('seats', undefined),
            showingId: props.navigation.getParam('showingId', undefined),
            error: ''
        }
    }

    onButtonPress = () => {
        let postData = {
            showingId: this.state.showingId,
            email: this.props.email,
            seats: this.state.seats
        }
        axiosInstance.post('/reservations', postData).then((res) => {
            if (res.status === 201) {
                this.props.navigation.navigate('SuccessScreen')
            }
        }).catch((e) => {
            this.setState(() => ({error: 'Something went wrong with your reservation. Please try again.'}))
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Your e-mail: <Text style={styles.boldText}>{this.props.email}</Text></Text>
                {
                    this.state.seats.map((seat, key) => {
                        return <Text key={key}>{`Row: ${seat.row}, Seat: ${seat.seat}`}</Text>
                    })
                }
                <Button
                    style={styles.button}
                    title="Finalize reservation"
                    onPress={this.onButtonPress}
                />
                {
                    <Text style={styles.error}>{this.state.error && this.state.error}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boldText: {
        fontWeight: 'bold'
    },
    button: {
        margin: 60
    },
    error: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold'
    }
})

const mapStateToProps = (state) => {
    return {
        email: state.user.email
    }
}

export default connect(mapStateToProps)(ReservationConfirm);