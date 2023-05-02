import {useEffect} from "react";
import {useState} from "react";

export function useTimer() {
  const [time, setTime] = useState(0)
  const [started, setStarted] = useState(false)

  let t: any
  useEffect(() => {
    if (started) return
    t = setInterval(() => {
      setTime(x => x+1)
    }, 1000)
    return () => clearInterval(t)
  }, [])

  function start() {
    if (started) return
    setStarted(true)
    t = setInterval(() => {
      setTime(x => x+1)
    }, 1000)
  }

  function stop() {
    console.log('sstoping')
    if (!started) return
    setStarted(false)
    clearInterval(t)
  }
  return [time, start, stop]
}
