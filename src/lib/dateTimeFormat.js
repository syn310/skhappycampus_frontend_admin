const dateTimeFormat = (date) => {

    function pad2(n) {  // always returns a string
        return (n < 10 ? '0' : '') + n;
      }

    let dt = new Date(date);
    return dt.getFullYear() + "-" +
            pad2(dt.getMonth() + 1) + "-" + 
            pad2(dt.getDate()) + " " +
            pad2(dt.getHours()) + ":" +
            pad2(dt.getMinutes());
            
 }

 export default dateTimeFormat;


/** Day 계산 */
export const dDayCount = (date) => {
    const dt = new Date(date);
    const today = new Date();
    const gap = dt.getDate()-today.getDate();
    // const dday = Math.floor(gap/(1000*60*60*24));
    // console.log(`gap: ${gap}`);
    /** D-Day가 지난 경우, 0으로 처리 해둠. 로직에 맞게 변경 가능 */
    return (gap<0 ? 0 : gap);
}