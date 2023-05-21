import { Component } from "react";
import { connect } from "react-redux";
import { getCountryFeedbacks, setLang } from "../redux/feedBackSlice";
import { RootState } from "../redux/store";
import s from "./header.module.scss"

class LanguagePicker extends Component<any> {
    state: {
        buttonActive: boolean,
    }

    constructor (props: any) {
        super(props)
        this.state={
            buttonActive: false
        }
    }

    langChangeHandler(e:any) {
        let lang = e.target.dataset.type
        
        if(lang != this.props.lang) {
            this.props.getFeed(lang)
            this.props.changeLang(lang) 
        }
        this.setState({...this.state, buttonActive: false})
    }

    openCloseHandler(e:any) {                        
        if(e.target.classList.contains("active")) {
            this.setState({...this.state, buttonActive: false})
        } else {
            this.setState({...this.state, buttonActive: true})
        }
    }

    render() {      
        return (
            <div className={s.lang} >
                <div className={`${s.lang__title} ` + (this.state.buttonActive?"active":"")} onClick={(e)=>{this.openCloseHandler(e)}}>
                    <p className={s.paragraph}>{this.props.lang == "ru"? "Выбран язык: Русский": "Language: English"}</p>  
                    <svg className={`${s.svg} ` + (this.state.buttonActive?s.svg_active:'')} xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="white">
                        <path d="M0.746582 1.10492L5.69617 6.0545L10.6457 1.10492L9.82092 0.279505L5.69617 4.40484L1.57142 0.279506L0.746582 1.10492Z"></path>
                    </svg>
                </div>
                <ul className={`${s.list} ` + (this.state.buttonActive?s.list_active:'')}>
                    <li data-type={"en"} onClick={(e)=>{this.langChangeHandler(e)}}>English</li>
                    <li data-type={"ru"} onClick={(e)=>{this.langChangeHandler(e)}}>Русский</li>
                </ul>
            </div>
        )
    }
}


const mapStateToProps = (state: RootState) => ({
    lang: state.feedbacks.currentLang
});


const mapDispatchToProps = (dispatch: any) => {
    return {
      changeLang: (lang: string)=> {
        dispatch(setLang(lang))
      },
      getFeed: (lang: string)=> {
        dispatch(getCountryFeedbacks(lang))
      }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);