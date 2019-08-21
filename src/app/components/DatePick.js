import React, { Component } from 'react'
import {DatePicker} from 'native-base'

class DatePick extends Component {

    render(){
        return(
            <DatePicker
            // dari Native Base Date Picker
                defaultDate={new Date()}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select Created Date"
                textStyle={{ color: "green" }}
                // funDate adalah function yang di kirim dari komponen AddEmployeeScreen
                onDateChange={this.props.funDate}
                disabled={false}
            />
        )
    }
}

export default DatePick