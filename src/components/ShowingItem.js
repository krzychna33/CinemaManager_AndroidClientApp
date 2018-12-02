import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

class ShowingItem extends React.Component {

    onButtonPress = () => {
        this.props.navigation.navigate('ShowingView', {
            id: this.props.showing.id
        })
    }

    render() {
        return (
            <View style={styles.showingItem}>
                <Text>{this.props.showing.movieTitle}</Text>
                <Text>{this.props.showing.showingTime}</Text>
                <Text>{this.props.showing.price}</Text>
                <Button
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
    }
});

export default withNavigation(ShowingItem);



