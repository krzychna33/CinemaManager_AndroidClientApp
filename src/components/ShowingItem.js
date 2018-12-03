import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import numeral from 'numeral';

class ShowingItem extends React.Component {

    onButtonPress = () => {
        this.props.navigation.navigate('ShowingView', {
            id: this.props.showing.id
        })
    }

    render() {
        return (
            <View style={styles.showingItem}>
                <Text style={styles.title}>{this.props.showing.movieTitle}</Text>
                <Text>{moment(this.props.showing.showingTime).format('MMMM Do YYYY, kk:mm')}</Text>
                <Text>{numeral(this.props.showing.price/100).format('$0,0.00')}</Text>
                <Button
                    style={styles.button}
                    title="Make reservation"
                    onPress={this.onButtonPress}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    showingItem: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    title: {
        fontWeight: 'bold'
    }
});

export default withNavigation(ShowingItem);



