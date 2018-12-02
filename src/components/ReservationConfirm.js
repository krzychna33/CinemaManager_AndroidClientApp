import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Button 
} from 'react-native';
import {connect} from 'react-redux';
import axiosInstance from '../utils/axios';

class ReservationConfirm extends React.Component {
    constructor(props){
        super();
        this.state = {
            seats: props.navigation.getParam('seats', undefined),
            showingId: props.navigation.getParam('showingId', undefined)
        }
    }

    onButtonPress = () => {
        let postData = {
            showingId: this.state.showingId,
            email: this.props.email,
            seats: this.state.seats
        }
        axiosInstance.post('/reservations', postData).then((res) => {
            if(res.status === 201){
                this.props.navigation.navigate('ShowingsScreen')
            }
        })
    }

    render(){
        return (
            <View>
                <Text>Your e-mail: <Text>{this.props.email}</Text></Text>
                {
                    this.state.seats.map((seat, key) => {
                        return <Text key={key}>{`Row: ${seat.row}, Seat: ${seat.seat}`}</Text>
                    })
                }
                <Button
                    title="Finalize reservation"
                    onPress={this.onButtonPress}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email
    }
}

export default connect(mapStateToProps)(ReservationConfirm);