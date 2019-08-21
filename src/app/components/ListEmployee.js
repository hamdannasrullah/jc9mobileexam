import React, { Component } from 'react'
import {View,TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'native-base'
import {withNavigation} from 'react-navigation'

class ListEmployee extends Component {
    touchable = () => {
        // Pindah ke screen Detail dengan membawa object Employee nya
        // object Employee berada di this.props.data.item
        this.props.navigation.navigate('DetailEmployee', {data_Employee:this.props.data.item})
    }

    render() {
        return(
            <TouchableOpacity onPress={this.touchable}>
                <View style={styles.list}>
                    <Text>{this.props.data.item.title}</Text>
                    <Text>{this.props.data.item.Employee}</Text>
                    <Text>{this.props.data.item.Age}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(220,220,220)',
        padding : 10,
        marginVertical: 5,
    }
})


export default withNavigation(ListEmployee)