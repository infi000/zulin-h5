import * as React from 'react';
import { useEffect, useState } from 'react';

const Daojishi = (props:{ctime: number}) => {
    const [timerID, setTimerID] = useState(null);

    const [counter, setCounter] = useState(60*60*3);
  
    useEffect(() => {
  
      if (counter > 0 ) {
        let timer: any = setTimeout(() => {
           const now =  Math.round(Number(new Date().getTime()) / 1000)
           const last = Number(props.ctime) + 60*60*3

          setCounter(last - now)
        }, 1000);
        setTimerID(timer)
      }
      return () => {
        setTimerID(null)
      }
    }, [counter]);

    const format = (t:number) => {
        const l = parseInt(`${counter/60}`);
        const r = counter % 60;
        return `${l<10?'0'+l:l}:${r<10?'0'+r:r}`
    }

    return <span>{counter>0? format(counter):'已超时' }</span>
}


export default Daojishi;