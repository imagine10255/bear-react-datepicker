# Bear React Datepicker

<p align="center">
    This is a date/time picker component developed using React + Dayjs, which can be used with TextField input.
</p>

<div align="center">

[![NPM](https://img.shields.io/npm/v/bear-react-datepicker.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/bear-react-datepicker.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-datepicker)
[![npm](https://img.shields.io/npm/dt/bear-react-datepicker.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-react-datepicker)
[![npm](https://img.shields.io/npm/l/bear-react-datepicker?style=for-the-badge)](https://github.com/imagine10255/bear-react-datepicker/blob/main/LICENSE)

</div>

<img src="https://raw.githubusercontent.com/imagine10255/bear-react-datepicker/main/docs/datepicker.jpg" width="500"/>


## Features

- Support date picker
- Support time picker
- Support date+time picker
- Support date range selector
- Support date range + time selector

## Install

```bash
yarn add bear-react-datepicker dayjs
```

## Usage

add in your index.tsx
```tst
import "bear-react-datepicker/dist/index.css";
```

then in your page
```tsx
import {Datepicker, Timepicker, DateTimepicker} from 'bear-react-datepicker';


const BaseUsed = () => {
    const [myDate, setMyDate] = useState('2023-10-08');
    const [myTime, setMyTime] = useState<string>('12:00:08');
    const [myDateTime, setMyDateTime] = useState('2023-10-02 12:00:08');
    const [myDateTimeNoSec, setMyDateTimeNoSec] = useState<string>('2023-10-02 12:00');
    const [myRangeDate, setMyRangeDate] = useState<IRangeDateValue>({startDate: '2023-10-02', endDate: '2023-10-08'});
    const [myRangeDateTime, setMyRangeDateTime] = useState<IRangeDateTimeValue>({date: '2023-10-02', startTime: '08:00:10', endTime: '10:10:00'});
    const [myRangeDateTimeNoSec, setMyRangeDateTimeNoSec] = useState<IRangeDateTimeValue>({date: '2023-10-02', startTime: '08:00', endTime: '10:10'});

    
    return (
        <div>
            <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-TW" tagDate={['2022-09-08', '2022-09-11']} format="YYYY/MM/DD"/>

            <Timepicker locale="ja-JP" value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)}/>

            <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)}/>

            <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} isVisibleFastPicker isDark locale="en-US" format="YYYY/MM/DD" />
            
            <RangeTimeDatepicker value={myRangeDateTime} onChange={setMyRangeDateTime} onClickOk={timeStr => console.log('val', timeStr)} />
            
        </div>
    );

};
```


There is also a codesandbox template that you can fork and play with it:

[![Edit react-editext-template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9he8m8)


## License

MIT © [imagine10255](https://github.com/imagine10255)
