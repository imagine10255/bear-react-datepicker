import {
    useState,
    useCallback,
    Component,
    createElement,
    Fragment,
    ComponentType,
    FunctionComponent,
    ComponentClass, FC
} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import {Datepicker, Timepicker, DateTimepicker, RangeDatepicker, IRangeDateValue} from 'bear-react-datepicker';
import dayjs from 'dayjs';

import './App.css';
import 'bear-react-datepicker/dist/index.css';
import {Flex, GridThemeProvider, IGridThemeProviderProps} from 'bear-react-grid';
import styled from 'styled-components';



type TProviderHasPropsFn<T> = FC<T> | ComponentClass<T, any>
type TComponentFn = FC | ComponentClass

interface IProviderHasProps <T>{
    provider: TProviderHasPropsFn<T>
    props?: Partial<T>
}

type TProps<T> = IProviderHasProps<T>|TProviderHasPropsFn<T>;


export const composeProviders = <T = unknown>(
    providers: Array<TProps<T>>,
    displayName?: string,
) => (Component: TComponentFn) => {
    // Pass providers as outer-first
    // but reduce them as inner-first
        const innerFirstProviders = [...providers, Component].slice().reverse();

        function Composed(props: React.PropsWithChildren<{}>) {
            return innerFirstProviders.reduce<React.ReactElement>(
                (children, provider) => {
                    if ('provider' in provider) {
                        const {provider: Provider, props} = provider;
                        return createElement(Provider as TComponentFn, props, children);
                    }

                    const Provider = provider as TComponentFn;

                    return createElement(Provider, null, children);
                },
                createElement(Fragment, null, props.children),
            );
        }
        Composed.displayName = displayName;

        return Composed;

    };




function App() {
    const [myDateTime, setMyDateTime] = useState('');
    const [myDate, setMyDate] = useState('');
    const [myTime, setMyTime] = useState<string|undefined>();
    const [myDateTimeNoSec, setMyDateTimeNoSec] = useState<string|undefined>();
    const [myRangeDate, setMyRangeDate] = useState<IRangeDateValue>({startDate: undefined, endDate: undefined});


    /**
     * 渲染日期選擇器
     */
    const renderDatePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DatePicker">
            <input type="text" value={myDate} onChange={(event) => setMyTime(event.target.value)}/>
            <Flex className="gap-2">
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" tagDate={['2022-09-08', '2022-09-11']} format="YYYY/MM/DD" className="mr-3"/>
                <Datepicker value={myDate} onChange={setMyDate} isVisibleSetToday locale="zh-CN" tagDate={['2022-08-31','2022-09-08', '2022-09-09', '2022-09-11', '2022-10-01']} isDark onChangeYearMonthPanel={yearMonth => console.log('asdasd', yearMonth)}/>
            </Flex>
        </FormControlGroup>;
    }, [myDate]);


    /**
     * 渲染日期選擇器
     */
    const renderRangeDatePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="RangeDatePicker">
            <input type="text" value={`${myRangeDate.startDate ?? ''}~${myRangeDate.endDate ?? ''}`} onChange={(event) => {
                const dateStr = event.target.value;
                const dateObj = dateStr.split('~');
                setMyRangeDate({startDate: dateObj[0], endDate: dateObj[1]});
            }}/>
            <Flex className="gap-2">
                <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} isVisibleFastPicker locale="zh-TW" format="YYYY/MM/DD"  className="mr-3"/>
                <RangeDatepicker value={myRangeDate} onChange={setMyRangeDate} locale="zh-CN" isDark minDate={dayjs().subtract(7, 'day').format('YYYY-MM-DD')} maxDate={dayjs().add(7, 'day').format('YYYY-MM-DD')}/>
            </Flex>

        </FormControlGroup>;
    }, [myRangeDate]);

    /**
     * 渲染日期時間選擇器
     */
    const renderTimePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="TimePicker">

            <input type="text" value={myTime} onChange={(event) => setMyTime(event.target.value)}/>
            <Flex className="gap-2">
                <Timepicker value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)} className="mr-3"/>
                <Timepicker value={myTime} onChange={setMyTime} onClickOk={(timeStr) => console.log('val', timeStr)} isDark/>
            </Flex>
        </FormControlGroup>;
    }, [myDateTime]);


    /**
     * 渲染日期時間選擇器
     */
    const renderDateTimePicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DateTimePicker">
            <input type="text" value={myDateTime} onChange={(event) => setMyDateTime(event.target.value)}/>
            <Flex className="gap-2">
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)} className="mr-3"/>
                <DateTimepicker value={myDateTime} onChange={setMyDateTime} onClickOk={timeStr => console.log('val', timeStr)} isDark/>
            </Flex>
        </FormControlGroup>;
    }, [myDateTime]);

    /**
     * 渲染日期時間選擇器
     */
    const renderDateTimeHiddenSecondPicker = useCallback(() => {
        return <FormControlGroup className="gap-2" data-label="DateTimePicker No Second">
            <input type="text" value={myDateTimeNoSec} onChange={(event) => setMyDateTime(event.target.value)}/>
            <Flex className="gap-2">
                <DateTimepicker value={myDateTimeNoSec} onChange={setMyDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isVisibleSecond={false}/>
                <DateTimepicker value={myDateTimeNoSec} onChange={setMyDateTimeNoSec} onClickOk={timeStr => console.log('val', timeStr)} isDark isVisibleSecond={false}/>
            </Flex>
        </FormControlGroup>;
    }, [myDateTimeNoSec]);





    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Bear React Datepicker</h1>
            <div className="card">

                {renderDatePicker()}
                {renderRangeDatePicker()}
                {renderTimePicker()}
                {renderDateTimePicker()}
                {renderDateTimeHiddenSecondPicker()}


                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

const Provider = composeProviders([{
    provider: GridThemeProvider,
    props: {gridTheme: {}}
}])(App);



export default Provider;
// export default () => {
//     return <Provider>
//         <App/>
//     </Provider>;
// };



const FormControlGroup = styled(Flex)`
  gap: 1rem;
  flex-direction: column;
  margin-bottom: 1.5rem;
  
  :before{
    content: attr(data-label);
    font-size: 1.5rem;
    color: #00a3e0;
  }
  
  
  input{
    width: 220px;
  }
`;
