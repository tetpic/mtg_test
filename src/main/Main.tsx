import { Component, ReactNode } from 'react';
import { connect } from "react-redux";
import { getCountryFeedbacks } from '../redux/feedBackSlice';
import { RootState } from '../redux/store';
import Feedback from './Feedback';
import s from "./feedback.module.scss"

class Main extends Component<any> { 
    state:{feedsToShow?: Object[], currentPage: number, maxItems: number} = 
    {   
        currentPage: 1,
        maxItems: 10
    }

    pages: number[] = []  

    constructor(props: any) {
        super(props)
    }

    componentDidMount = () => {             
        let getFeed = this.props.getFeed
        getFeed(this.props.feedbacks.currentLang)
    }


    // index+1>=(pageSize*(pageNumber-1))+1 && index+1<=pageSize*pageNumber
    setItems(): any[] {
        let feedbacks = this.props.feedbacks.currentFeedbacks
        let feedArray: any[] = []
        Object.keys(feedbacks).forEach((el, index)=>{            
            if(index+1 >= (this.state.maxItems*(this.state.currentPage-1)+1) && index+1 <= (this.state.maxItems*this.state.currentPage)) {
                feedArray.push(feedbacks[el])
            } else if(feedbacks.length < this.state.maxItems) {
                feedbacks.push(feedbacks[el]) 
            }
        })        
        return feedArray
    }

    changePage(page: number) {
        
        if (page>0&&page<=this.pages.length) {
            this.setState({...this.state, currentPage: page})
        }
    }

    setMaxPages() {
        
        let fbLength = Object.keys(this.props.feedbacks.currentFeedbacks).length  
        let counter = fbLength/this.state.maxItems
        counter = counter > ~~counter?~~counter+1:~~counter
        let pagesArr = []
        for(let i = 1; i <= counter; i++) {
            pagesArr.push(i)
        }
        this.pages = pagesArr     
        return pagesArr
    }


    render (): ReactNode {
        if(this.props.feedbacks.isSet) {
            let pages = this.setMaxPages()
            return (<>
                <div className={s.feedback__title}>{this.props.feedbacks.currentLang == "ru"?"Отзывы клиентов":"Clients Feedbacks"}</div>
                
                {this.setItems().map((el:any)=>{
                    return (<Feedback feedback={el} />)
                })}  
                
                <div className={s.paginator}>

                    <button 
                    className={`${s.feedback__button} ` + (this.state.currentPage == 1?s.feedback__button_disabled:'')} 
                    onClick={()=> {this.changePage(this.state.currentPage - 1)}}>
                        Назад
                    </button>

                    {pages.map((el, index)=> {
                        return <p 
                        className={(index+1 == this.state.currentPage?s.feedback__pager_active:s.feedback__pager)} 
                        onClick={()=> {this.changePage(index+1)}}>
                            {el}
                        </p>
                    })}       

                    <button 
                    className={`${s.feedback__button} ` + (this.state.currentPage == pages.length?s.feedback__button_disabled:'')} 
                    onClick={()=> {this.changePage(this.state.currentPage + 1)}}>
                        Далее
                    </button>   

                </div>
            </>)
        }
        else if(this.props.feedbacks.error) {
            return (<> <p className={s.status}>{this.props.feedbacks.currentLang == "ru"?"Ошибка загрузки данных": this.props.feedbacks.error}</p> </>)
        }
        else {
            return (<> <p className={s.status}>{this.props.feedbacks.currentLang == "ru"?"...Загрузка": "...Loading"}</p> </>)
        }
    }
}

const mapStateToProps = (state: RootState) => ({
    feedbacks: state.feedbacks
});
  
const mapDispatchToProps = (dispatch: any) => {
    return {
      getFeed: (lang: string)=> {
        dispatch(getCountryFeedbacks(lang))
      }
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);