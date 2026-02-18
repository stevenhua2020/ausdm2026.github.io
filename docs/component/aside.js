// Create a new HTML document
const templateAsideDoc = document.implementation.createHTMLDocument();

// Set the HTML content of the document
templateAsideDoc.documentElement.innerHTML = `
<template id="template-aside">
    <aside>
        <!--<div id="countdown">
            <h4>Days until Conference</h4>
            <div id="timer">
                <div><p><span id="days"> 000 </span></p> <p>Day</p></div> 
                <div><p><span>:</span></p><p>-</p></div>
                <div><p><span id="hours"> 00 </span> </p> <p>Hrs</p></div>
                <div><p><span>:</span></p><p>-</p></div> 
                <div><p><span id="minutes"> 00 </span> </p> <p>Min</p></div>
                <div><p><span>:</span></p><p>-</p></div> 
                <div><p><span id="seconds"> 00 </span> </p> <p>Sec</p> </div>
            </div>
        </div>-->

        <div id="countdown">
            <h4>Conference has ended</h4>
            <h5>Thanks for your participation. See you at AusDM 2026 in Sydney!</h5>
        </div>


        <div id="Keydates">
            <h4>Important Dates (AoE 11.59pm)</h4>
            <ul>
                <li>Abstract submission: <span style="text-decoration: line-through;">10 Aug 25</span> <span style="color:rgb(243, 25, 25); font-weight:700;"> 17 Aug 25</span></li>
                <li>Paper submission: <span style="text-decoration: line-through;">17 Aug 25</span> <span style="color:rgb(243, 25, 25); font-weight:700;">24 Aug 25</span></li>
                <li>Paper Notification:  <span style="text-decoration: line-through;">7 Sept 25</span> <span style="color:rgb(243, 25, 25); font-weight:700;"> 21 Sept 25 </span></li>
                <li>Camera-Ready Submission: <span style="text-decoration: line-through;">21 Sept 25</span> <span style="color:rgb(243, 25, 25); font-weight:700;"> 5 Oct 25 </span></li>
                <!-- <li>Tutorial/ Workshop Proposal Submission: Sunday 18 August, 2024</li>
                <li>Tutorial/ Workshop Proposal Notification: Sunday 15 September, 2024</li> -->
                <!-- <li>Doctoral Consortium Submission: Sunday 1 September, 2024</li>
                <li>Doctoral Consortium Notification: Sunday 29 September, 2024</li> -->
                <li>Author Registration: <span style="text-decoration: line-through;">21 Sept 25</span> <span style="color:rgb(243, 25, 25); font-weight:700;"> 5 Oct 25 </span></li>
            </ul>
        </div>
    </aside>
</template>
`;

const templateAsideStyleContent = `
        aside {
            display: block;
            line-height: 1.6;
            margin: auto 5px;
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            background-color: #fff;
            padding-top: 10px;
            width: max-content;
        }
        
        #countdown {
            width:240px;
            text-align: center;
            background-color: #056eb4;
            color: #fff;
            padding: 20px;
            margin-top: 20px;
            font-weight: bold;
        }

        #countdown h4{
            margin: 10px 0px;
        }
        
        #timer {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100px;
        }
        
        #timer div {
            display: inline-block;
            font-size: 15px;
            margin: 5px;
        }
        
        #timer span {
            font-size: 20px;
        }
        
        #Keydates {
            margin: 50px 0px;
            text-align: left;
        }

        #Keydates ul{
            padding: 0;
        }
        
        #Keydates h4{
            color: #002d4b;
            font-weight: bold;
        }
        
        #Keydates li{
            list-style-type: none;
            font-size: smaller;
            font-weight: bold;
        }
        
        /* Responsive adjustments */
        @media screen and (max-width: 1300px) {
            aside {
                display: none;
            }
        }
        `   
    


class TemplateAside extends HTMLElement {
    static get TAG_NAME() {
      return 'template-aside';
    };

    constructor() {
      super();
    }

    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'open' });
        const template = templateAsideDoc.getElementById('template-aside');
        const content = template.content.cloneNode(true);
        
        this.shadow.appendChild(content);

        const style = document.createElement("style");
        style.textContent = templateAsideStyleContent;
        this.shadow.appendChild(style);
        
        //this.shadow.getElementById("timer").innerHTML = "Our conference has started!";
        setInterval(this.updateCountdown.bind(this), 1000);
    }

    updateCountdown() {
        
        const countdownDate = new Date("Nov 26, 2025 23:59:59").getTime();
        const now = new Date().getTime();
        const distance = countdownDate - now;
    
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    
        this.shadow.getElementById("days").innerText = days;
        this.shadow.getElementById("hours").innerText = hours;
        this.shadow.getElementById("minutes").innerText = minutes;
        this.shadow.getElementById("seconds").innerText = seconds;
    
        if (distance < 0) {
            clearInterval(interval);
            this.shadow.getElementById("timer").innerHTML = "Our conference has started!";
        }
    }


}

customElements.define(TemplateAside.TAG_NAME, TemplateAside);


  
