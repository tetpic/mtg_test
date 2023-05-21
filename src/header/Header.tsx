import React, { Component } from "react";
import s from "./header.module.scss"
import logo from "../logo-test.webp"
import LanguagePicker from "./LanguagePicker";
import { RootState } from "../redux/store";
import { connect } from "react-redux";
import { setLang } from "../redux/feedBackSlice";
import Clock from "./Clock";


class Header extends Component<any> {    
    render() {
        return (<>
            <div className={s.header}>
                <img src={logo} className={s.logo} alt="logo" />
                <LanguagePicker />
                <Clock/>
            </div>
        </>
        )
    }
}


export default Header
