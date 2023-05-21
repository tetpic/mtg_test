export function getCurrentTime() {
    let time = new Date()
    let hours = time.getHours().toString()
    let minutes = time.getMinutes().toString()
    let seconds = time.getSeconds().toString()
    return (hours.length < 2? ("0"+hours):hours)+":"+
    (minutes.length < 2? ("0"+minutes):minutes)+":"+
    (seconds.length < 2?("0"+seconds):seconds)
}