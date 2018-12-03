import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { startGetShowings } from '../actions/showings';
import ShowingsList from './ShowingsList';

class ShowingsScreen extends React.Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            showingsGot: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.startGetShowings().then(() => {
            if (this._isMounted) {
                this.setState(() => ({ showingsGot: true }))
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View>
                <Text style={styles.header}>Currently played:</Text>
                {
                    this.state.showingsGot ? (
                        <ShowingsList navigation={this.props.navigation} />
                    ) : (
                            <Text>Fetching data from server. Please wait...</Text>
                        )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 20
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        startGetShowings: () => dispatch(startGetShowings())
    }
}

export default connect(undefined, mapDispatchToProps)(ShowingsScreen);

