import { Component } from "react";
import { FeedbackType } from "../redux/feedBackSlice";
import s from "./feedback.module.scss"

class Feedback extends Component<FeedbackType> {
    render() {
        let feedback = this.props.feedback  
        return (<>
        <div className={s.feedback}>
            <p className={s.feedback__name}>Отзыв от: {feedback.name}</p>
            <p className={s.feedback__review}>"{feedback.review}"</p>
            <p className={s.feedback__date}>Оставлен {feedback.date}</p>
        </div>
        </>)        
    }
}

export default Feedback