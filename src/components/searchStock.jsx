import React,{useState} from "react"
import style from "./searchstock.module.css"
import data from "../../src/data.json";

export default function SearchStock(){
    
    const [input, setinput] = useState("");
    const [data1, setdata1] = useState([])
    const [wishlist,setwishlist]=useState([])
  
    const handleData = (e) => {
      // console.log(e.target.value);
      let { value } = e.target;
      setinput(value);
      if (value === ""){
           return
        }else{
      value = value.toUpperCase();
      let result = data.filter((el) => el[0].split("::")[0].includes(value));
      setdata1(result);
        }
    };
    function debounce(cb,d) {
      let timer;
      return function (el) {
         clearTimeout(timer);
        timer = setTimeout(function () {
          cb(el);
        }, d);
      };
    }
    function handelWishlist(el){
        if(data.forEach(item=>item[0]===el[0])){
            return
        }else{
        setwishlist((prev)=>{
            return[...prev,el]
        })
        setinput("")
        }
    }

    return(
        <div className={style.container1}>
            <div className={style.container2}>
                <div className={style.inpdiv}>
                  <input type="text" className={style.inp} onChange={debounce(handleData,300)} placeholder="serach stocks" />
                  <div className={`${style.dropdown} ${input !== "" && style.showdropdown}`} >
            {data1.map((el, i) => (
              <div key={i} className={style.stock}>
                <div className={style.stock_1}>
                  <div>{el[0].split("::")[0]}</div>
                  <div>{el[0].split("::")[1]}</div>
                </div>
                <div className={style.stock_1}>
                  <div>{el[1]}</div>
                  <div>{((el[1] - el[2]) / el[2]).toFixed(3)} %</div>
                  
                </div>
                <button className={style.addbutton} onClick={()=>handelWishlist(el)}>Add</button>
              </div>
            ))}
          </div>
                </div>
                <div className={style.wishlist} >
            {wishlist.map((el, i) => (
              <div key={i} className={style.stock}>
                <div className={style.stock_1}>
                  <div>{el[0].split("::")[0]}</div>
                  <div>{el[0].split("::")[1]}</div>
                </div>
                <div className={style.stock_1}>
                  <div>{el[1]}</div>
                  <div>{((el[1] - el[2]) / el[2]).toFixed(3)} %</div>
                  
                </div>
                <button className={style.deletebutton} >Delete</button>
              </div>
            ))}
          </div>

            </div>
        </div>
    )
}