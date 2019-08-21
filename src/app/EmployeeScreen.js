import React, { Component } from 'react'
import {View, BackHandler, StyleSheet, FlatList,  ScrollView} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {connect} from 'react-redux'
import {Button, Text, Container} from 'native-base'

import Fire from '../firebase'

import ListEmployee from './components/ListEmployee'

class EmployeeScreen extends Component {

    state = {
        snapShot: {}
    }

    onBackButton = () => {
        alert('Tombol back ditekan')
        // Menonaktifkan default function (kembali ke halaman sebelumnya)
        return true
    }

    onAddEmployee = () => {
        this.props.navigation.navigate('AddEmployee')
    }

    getData = () => {
        // Get data
        Fire.database().ref(`Employee/${this.props.uid}`)
        .once('value', (snapShot) => {
            // Cek apakah data di temukan
            if(snapShot.exists()){
                this.setState({snapShot: snapShot.val()})
            } else {
                this.setState( { snapShot: {} } )
            }
        })
    }

    renderList = () => {
        // array of id dari setiap Employee
        let keysEmployee = Object.keys(this.state.snapShot)
        let listEmployee = []

        // key : id dari Employee
        keysEmployee.forEach((key) => {
            listEmployee.push({
                title : this.state.snapShot[key].title,
                Employee : this.state.snapShot[key].Employee,
                Age : this.state.snapShot[key].Age,
                date : this.state.snapShot[key].date,
                id: key
            })
        })

        // console.log(this.state.snapShot)
        // console.log(listEmployee)

        // listEmployee.map()
        // [{title, Employee, date}{}{}]
        return <FlatList
                    keyExtractor = {(item) => item.id}
                    style = {styles.flatlist}
                    data={listEmployee}
                    renderItem ={(ITEM)=>{
                        return <ListEmployee data={ITEM} key={ITEM.id}/>
                    }}
                />
        
    }

    render() {
        return (
            <Container>
                <NavigationEvents
                    // ComponentDidMount
                    onDidFocus = {() => {
                        // non aktifkan tombol back pada device
                        BackHandler.addEventListener('hardwareBackPress', this.onBackButton)
                        // get semua Employee milik user
                        this.getData()
                    }}

                    // ComponentWillUnmount
                    onWillBlur = {() => {
                        BackHandler.removeEventListener('hardwareBackPress', this.onBackButton)
                    }}
                />

                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 20}}>EMPLOYEES MANAGER</Text><Text style={{fontWeight: 'italic', fontSize: 15}}>List Data Karyawan</Text>
                    
                    {/* <View style={styles.button}>
                        <Button onPress={this.renderList}>
                            <Text>Nyoba bikin array</Text>
                        </Button>
                    </View> */}

                    {this.renderList()}
                    <View style={styles.button}>
                        <Button onPress={this.onAddEmployee}>
                            <Text>Add Employee Data</Text>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        marginVertical: 20
    },
    flatlist: {
        alignSelf: 'stretch'
    }
})


const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(EmployeeScreen)