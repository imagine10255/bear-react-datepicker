import React from 'react';
import CSS from 'csstype';
import dayjs,{Dayjs} from 'dayjs';
import cx from 'classnames';
import { defaultFormat, getDatetime } from '../utils';
import elClassNames from './el-class-names';
import Datepicker from '../Datepicker/Datepicker';
import Timepicker from '../Timepicker/Timepicker';

import './styles.css';


interface IProps {
    className?: string;
    style?: CSS.Properties;
    value?: string;
    dateFormat?: string;
    onChange: (newDate: string) => void;
    isVisibleSetToday?: boolean;
    locale?: string;
    minYear?: number;
    maxYear?: number;
    isDark?: boolean,
    startDate?: string,
    endDate?: string,
}



/**
 * DateTimepicker
 * 日期選擇器
 */
const DateTimepicker = ({
    className,
    style,
    value,
    dateFormat = defaultFormat.date,
    onChange,
    locale = 'en-US',
    minYear = 1911,
    maxYear,
    isDark = false,
    startDate,
    endDate,
}: IProps) => {
    const propsDate = getDatetime(value);

    /**
     * 取得時間
     * @param dayObj
     */
    const getTime = (dayObj: Dayjs) => {
        if(propsDate.isValid()){
            return dayObj.format(defaultFormat.time);
        }
        return dayjs().format(defaultFormat.time);
    }

    /**
     * 取得日期
     * @param dayObj
     */
    const getDate = (dayObj: Dayjs) => {
        if(propsDate.isValid()){
            return dayObj.format(dateFormat);
        }
        return dayjs().format(dateFormat);
    }


    /**
     * 處理日期異動
     * @param newValue
     */
    const handleChangeDate = (newValue: string) => {
        const oldTime = getTime(propsDate);
        onChange(`${newValue} ${oldTime}`);
    }

    /**
     * 處理時間異動
     * @param newValue
     */
    const handleChangeTime = (newValue: string) => {
        const oldDate = getDate(propsDate);
        onChange(`${oldDate} ${newValue}`);
    }

    return (
        <div className={cx(elClassNames.root, className)} style={style}>
            <Datepicker value={getDate(propsDate)} onChange={handleChangeDate} locale={locale} minYear={minYear} maxYear={maxYear} format={dateFormat} isDark={isDark} startDate={startDate} endDate={endDate}/>
            <Timepicker value={getTime(propsDate)} onChange={handleChangeTime} locale={locale} isDark={isDark}/>
        </div>
    );

};


export default DateTimepicker;
