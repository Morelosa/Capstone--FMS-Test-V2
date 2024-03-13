//This page tests how the react app would connect to the flask API
//This page is still in the project to record the basics of how the connection works
//Note: I literally just copied Ben's HTML page and put it in a React function 

//Test is a page that displayes the camera feed of your computer, sends it to the API, and displays OpenCV on the page
function Test() {
    return(
        <body>
            <div class = "container">
                <div class = "row">
                    <div class = "col-lg-8 offset-lg-2">
                        <h3 class = "mt-5">
                            Live Streaming
                            <img src = "http://127.0.0.1:5000/video_feed" width = "100%"></img>

                        </h3>


                    </div>
                </div>
            </div>
        </body>


    );


}

export default Test;