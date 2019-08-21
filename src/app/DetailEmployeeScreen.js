import React, { Component } from 'react'
import {StyleSheet, View, TextInput, Alert } from 'react-native'
import {connect} from 'react-redux'
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Button,
    Input,
    Item,
    Textarea
} from 'native-base'

import Fire from '../firebase'

// Untuk mengambil data dari navigate menggunakan
// navigation.getParam('nama parameternya') / 'data_Employee'
class DetailEmployeeScreen extends Component {

    state = {
        // obtained from ListEmployee.js -> this.props.navigation.navigate('DetailEmployee', { data_Employee : this.props.data.item } ) 
        objEmployee: this.props.navigation.getParam('data_Employee'),    // Employee : { title, Employee, date }
        edit : false,
        editTitle : this.props.navigation.getParam('data_Employee').title,
        editEmployee: this.props.navigation.getParam('data_Employee').Employee,
        editAge: this.props.navigation.getParam('data_Employee').Age
    }

    onDeleteButton = async () => {
        Alert.alert(
            'Are you sure?',
            'This cannot be undone',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Delete', onPress: async () => {
                                    // Menghapus data
                                await Fire.database().ref(`Employee/${this.props.uid}/${this.state.objEmployee.id}`).remove()

                                    // kembali ke halaman sebelumnya. 
                                this.props.navigation.goBack()
              }},
            ],
            {cancelable: false},
          );

    }

    onEditButton = () => {
        this.setState( { edit : true } )
    }

    saveEdit = async () => { 
        Alert.alert(
            'Do you want to save now?',
            'You can edit again later',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'Save', onPress: async () => {
                                await Fire.database().ref(`Employee/${this.props.uid}/${this.state.objEmployee.id}`)
                                .update({
                                    title : this.state.editTitle,
                                    Employee : this.state.editEmployee,
                                    Age : this.state.editAge
                                })
                    
                                this.updateEmployee()
              }},
            ],
            {cancelable: false},
          );
    }

    updateEmployee = () => {
        this.props.navigation.goBack()
        this.props.navigation.goBack()
    }

    cancelEdit = () => {
        this.setState( { edit:false } )
    }

    
    render() {
        // Mengambil data yang di kirim dari navigate
        var objEmployee = this.state.objEmployee

        // Edit UI
        if (this.state.edit === true) {
            return (
                <Container>
                    <Content>
                        <Card><Text style={{fontWeight: 'bold', color: 'blue', fontSize: 20}}>EDIT DATA KARYAWAN</Text ><Text></Text>
                            <CardItem rounded>
                                <View><Text style={{fontWeight: 'bold'}}>Nama:</Text>
                                    <Textarea defaultValue={objEmployee.title} onChangeText={ (text) => this.setState( { editTitle : text } )} />
                                    {/* <Input defaultValue={objEmployee.date} />  */}
                                </View>
                            </CardItem>
                            <CardItem>
                                <View><Text style={{fontWeight: 'bold'}}>Jabatan:</Text>
                                    <Textarea defaultValue={objEmployee.Employee} onChangeText={ (text) => this.setState( { editEmployee : text } )} />
                                </View>
                            </CardItem>
                            <CardItem>
                                <View><Text style={{fontWeight: 'bold'}}>Usia:</Text>
                                    <Textarea keyboardType={'numeric'} maxLength={3} defaultValue={objEmployee.Age} onChangeText={ (text) => this.setState( { editAge : text } )} />
                                </View>
                            </CardItem>
                            <View style={styles.button} maxLength={2}>
                                <Button block onPress={this.saveEdit}><Text>Save</Text></Button>
                                <Button block onPress={this.cancelEdit}><Text>Cancel</Text></Button>
                            </View>
                        </Card>
                    </Content>
                </Container>
            )
        }

        // initial render (edit : false)
        return (
            <Container>
                <Content>
                    <Card><Text style={{fontWeight: 'bold', color: 'blue', fontSize: 20}}>DETAIL KARYAWAN</Text>
                        <CardItem header bordered style={styles.row}><Text style={{fontWeight: 'bold'}}>Created Date: </Text>
                            <Text>{objEmployee.date}</Text>
                        </CardItem>

                        <CardItem>
                        <Text style={{fontWeight: 'bold'}}>Nama Karyawan: </Text>
                            <Text>{objEmployee.title}</Text>
                        </CardItem>

                        <CardItem>
                        <Text style={{fontWeight: 'bold'}}>Jabatan: </Text>
                            <Text>{objEmployee.Employee}</Text>
                        </CardItem>

                        <CardItem>
                        <Text style={{fontWeight: 'bold'}}>Usia: </Text>
                            <Text>{objEmployee.Age}</Text>
                        </CardItem>

                        <View style={styles.button}>
                            <Button block onPress={this.onEditButton}><Text>Edit</Text></Button>
                            <Button block onPress={this.onDeleteButton}><Text>Delete</Text></Button>
                        </View>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    button: {
        height: 100,
        justifyContent: 'space-between',
        marginTop: 10
    },
    wrapper: {
        width: '90%',
        marginTop: 15
    }
})


const mapStateToProps = state => {
    return {
        uid: state.auth.uid
    }
}
export default connect(mapStateToProps)(DetailEmployeeScreen)