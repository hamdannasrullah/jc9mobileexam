import React, { Component } from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {Container, Text, Textarea, Button, Item, Input} from 'native-base'

import DatePick from './components/DatePick'

import Fire from '../firebase'

class AddEmployeeScreen extends Component {

    state = {
        title: '',
        Employee: '',
        Age: '',
        date: new Date()
    }

    // variable tanggal akan di isi tanggal yang dipilih oleh user
    getDate = (tanggal) => {
        this.setState({date: tanggal})
    }

    addEmployee = async () => {
        await Fire.database().ref(`Employee/${this.props.uid}`)
        .push({
            title: this.state.title,
            Employee: this.state.Employee,
            Age: this.state.Age,
            date: this.state.date.toString().substr(4,12)
        })

        // kembali ke halaman sebelumnya
        this.props.navigation.goBack()

    }


    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Text style={{fontWeight: 'bold', color: 'blue', fontSize: 20}}>INPUT DATA KARYAWAN</Text>
                    <View style={styles.wrapper}>
                        <Text style={{fontWeight: 'bold'}}>Tanggal Input: </Text>
                        <DatePick funDate={this.getDate}/>

                        <Text style={{fontWeight: 'bold'}}>Nama Karyawan:</Text>
                        <Item rounded>
                            <Input
                                placeholder='Nama Karyawan'
                                onChangeText={(text) => this.setState({title: text})}
                            />
                        </Item>

                        <Text style={{fontWeight: 'bold'}}>Jabatan:</Text>
                        <Item rounded>
                            <Input
                            placeholder = 'Jabatan'
                            onChangeText={(text) => this.setState({Employee: text})}
                            />
                        </Item>

                        <Text style={{fontWeight: 'bold'}}>Usia:</Text>
                        <Item rounded>
                            <Input
                            placeholder = 'Usia' keyboardType={'numeric'} maxLength={3}
                            onChangeText={(text) => this.setState({Age: text})}
                            />
                        </Item>

                        {/* <Textarea
                            placeholder = 'Your Story'
                            bordered
                            rowSpan = {15}
                            onChangeText={(text) => this.setState({Employee: text})}
                        />
                        <View style={styles.button}> */}
                        <View style={styles.button}>
                            <Button block onPress={this.addEmployee}>
                                <Text>Input Karyawan</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    },
    button: {
        marginTop: 10
    }
})

const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}

export default connect(mapStateToProps)(AddEmployeeScreen)