import {Button, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

export default function Calender({onConfirm, onCancel, perviousDate, open}) {
  const [date, setDate] = useState(perviousDate);
  return (
    <>
      <DatePicker
        modal
        title={"Select Expense Date"}
        open={open}
        date={date}
        mode="date"
        androidVariant= {Platform.OS === 'android' ? 'nativeAndroid' : 'iosClone'}
        onConfirm={date => {
          setDate(date);
          onConfirm(date);
        }}
        onCancel={() => {
          onCancel();
        }}
        onDateChange={date => console.log(date)}
      />
    </>
  );
};
