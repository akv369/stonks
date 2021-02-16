import {React, Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './searchSuggestions.module.css';

class searchSuggestions extends Component{
    render(){
        let displayData = (data) => {
            let i=0, j=0, arrLen, dispLen=0, dispArr=[], nameArr=[], codeArr=[];
            arrLen = data ? data.length : 0;
            for(let i=0;i<arrLen;i++){
                let j=0,k=0;
                Object.values(data[i]).map( value => {
                    if(j===1&&value.length<30)k=1;
                    if(k===1&&j===2&&value==="Equity")k=2;
                    if(k===2&&j===7&&value==="USD"){
                        dispLen++;
                        dispArr.push(data[i]);
                    }
                    j++;
                })
            }
            if(dispLen>0){
                for(i=0;i<dispLen;i++){
                    let j=0;
                    Object.values(dispArr[i]).map( value => {
                        j++;
                        if(j===1)codeArr.push(value);
                        else if(j===2)nameArr.push(value);
                    })
                }
                j=0;
                return(
                    <div className={styles.Item}>
                        {nameArr.map(stockName => {
                            return(
                                <a href={"/stock/"+codeArr[j]}>
                                    <span className="float-left">{stockName}</span>
                                    <span className="float-right">{codeArr[j++]}</span>
                                    <br/>
                                    <hr className="text-muted" style={{margin:'1px'}}/>
                                </a>
                            )
                        })}
                    </div>
                )
            }
        }
        return (
            <div className={styles.Box}> 
                <div className="shadow">
                    {displayData(this.props.dataResults.bestMatches)}
                </div>
            </div>
        );
    }
}

export default searchSuggestions;
