import { Component } from "react";
import { getCurrentTime } from "../helpers/getCurrentTime";
import s from "./header.module.scss"

class Clock extends Component<any> {
    state: {time: string} = {time: getCurrentTime()}

    constructor(props: any) {
        super(props)       
    }

    componentDidMount(): void {
        this.ticker()
    }

    ticker() {
        setInterval(()=>{
            this.setState({time: getCurrentTime()})
        }, 1000)
    }

    render() {
        return (
            <div className={s.clock}> 
            {this.state.time}
            </div>
        )
    }
}
export default Clock