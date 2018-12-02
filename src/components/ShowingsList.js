import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import ShowingItem from './ShowingItem';

class ShowingsList extends React.Component {

    render() {
        return (
            <ScrollView>
                {
                    this.props.showings.map((showing) => {
                        return <ShowingItem
                            navigation={this.props.navigation}
                            key={showing.id}
                            showing={showing}
                        />
                    })
                }
            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        showings: state.showings
    }
}

export default connect(mapStateToProps)(ShowingsList);
