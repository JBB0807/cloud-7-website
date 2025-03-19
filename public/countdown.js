'use-strict'

$(document).ready(function() {
    let endDate = Date.parse($("#remaining-time").text());

    setInterval(function() {
        let remainingDate = endDate - Date.now();

        let days = Math.floor(remainingDate / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remainingDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remainingDate % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remainingDate % (1000 * 60)) / 1000);

        const readableDate = `${days} day(s): ${hours}:${minutes}:${seconds}`;

        $("#remaining-time").text(readableDate)
    }, 1000);
});