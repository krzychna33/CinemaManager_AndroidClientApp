import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    Button 
} from 'react-native';
import axiosInstance from '../utils/axios';

export default class ShowingView extends React.Component {
    _isMounted = false;
    constructor(props) {
        super();
        this.state = {
            id: props.navigation.getParam('id', undefined),
            showing: {},
            cinemaMap: [],
            seatsSelectedByUser: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        axiosInstance.get(`/showings-unauthenticated/${this.state.id}`).then((res) => {
            if(this._isMounted && res.status === 200){
                this.setState(() => ({showing: res.data.data}))
                this.mapCinema();
            }
        })
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    mapCinema = () => {
        let cinemaMap = [];
        const reservations = this.state.showing.reservations; //This nested for-loops makes me crying, i will repair this some time, I promise.
        let iterator = 0;
        for(let i=1; i<=16; i++){
            for(let j=1; j<=14; j++){
                let isFree = true;
                for(let k=0; k<reservations.length; k++){
                    if(reservations[k].row == i && reservations[k].seat == j){
                        isFree = false;
                        break;
                    }
                }
                if(isFree){
                    cinemaMap.push({
                        seat: j,
                        row: i,
                        key: iterator,
                        text: `${j}`,
                        isFree: true
                    })
                    iterator++;
                } else {
                    cinemaMap.push({
                        seat: j,
                        row: i,
                        key: iterator,
                        text: `${j}`,
                        isFree: false
                    })
                    iterator++;
                }
            }
        }
        this.setState(() => ({cinemaMap}))
    }

    onSeatPress = (key = 'test') => {
        // let newSeat = {};
        const newCinemaMap = this.state.cinemaMap.map((seat) => {
            if(seat.key == key){
                // newSeat = {
                //     seat: seat.seat,
                //     row: seat.row
                // }
                return {
                    ...seat,
                    selectedByUser: !seat.selectedByUser
                }
            }
            return seat;
        })

        this.setState(() => ({cinemaMap: newCinemaMap}));
        // this.setState((old) => ({
        //     seatsSelectedByUser: [
        //         ...old.seatsSelectedByUser,
        //         newSeat
        //     ]
        // }))
    }

    onButtonPress = () => {
        const seatsSelectedByUser = this.state.cinemaMap.filter((seat) => {
            if(seat.selectedByUser){
                return {
                    seat: seat.seat,
                    row: seat.row
                }
            }
        });
        console.log(seatsSelectedByUser)
        this.props.navigation.navigate('ReservationConfirm', {
            seats: seatsSelectedByUser,
            showingId: this.state.showing.id
        });
    }

    render() {


        return (
            <ScrollView>
                <Text>{this.state.showing.movieTitle}</Text>
                <Text>{this.state.showing.showingTime}</Text>
                <View style={styles.cinemaContainer}>
                    <View style={styles.cinemaScreen}><Text style={{color: 'white'}}>Screen</Text></View>
                    <View style={styles.seatsContainer}>
                    {
                        this.state.cinemaMap.map((item, key) => {
                            if(item.isFree){
                                if(item.selectedByUser){
                                    return (
                                        <TouchableHighlight onPress={() => this.onSeatPress(key)} key={key} style={[styles.cinemaSeat, styles.seatSelectedByUser]}>
                                            <Text>{item.text}</Text>
                                        </TouchableHighlight>
                                    )
                                } else {
                                    return (
                                    <TouchableHighlight onPress={() => this.onSeatPress(key)} key={key} style={[styles.cinemaSeat, styles.freeSeat]}>
                                        <Text>{item.text}</Text>
                                    </TouchableHighlight>
                                    )
                                }

                            } else {
                                return (
                                    <View key={key} style={[styles.cinemaSeat, styles.takenSeat]}>
                                        <Text>{item.text}</Text>
                                    </View>
                                )
                            }
                            
                        })
                    }
                    </View>
                </View>

                <Button
                    title="Make reservation"
                    onPress={this.onButtonPress}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    freeSeat: {
        backgroundColor: 'green'
    },
    takenSeat: {
        backgroundColor: 'red'
    },
    seatSelectedByUser: {
        backgroundColor: 'orange'
    },
    cinemaContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cinemaSeat: {
        width: `${84/14}%`,
        height: 20,
        margin: `${16/28}%`
    },
    cinemaScreen: {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        backgroundColor: '#2B3A42',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seatsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})