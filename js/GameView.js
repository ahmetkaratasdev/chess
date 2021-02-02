// all the logic for rendering out the view
export default class gameView {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
        
        <div class="chessboard">
        <!-- 1st row -->
        <div class="white">&#9820;</div>
        <div class="black">&#9822;</div>
        <div class="white">&#9821;</div>
        <div class="black">&#9819;</div>
        <div class="white">&#9818;</div>
        <div class="black">&#9821;</div>
        <div class="white">&#9822;</div>
        <div class="black">&#9820;</div>
        <!-- 2nd row -->
        <div class="black">&#9823;</div>
        <div class="white">&#9823;</div>
        <div class="black">&#9823;</div>
        <div class="white">&#9823;</div>
        <div class="black">&#9823;</div>
        <div class="white">&#9823;</div>
        <div class="black">&#9823;</div>
        <div class="white">&#9823;</div>
        <!-- 3th row -->
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <!-- 4st row -->
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <!-- 5th row -->
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <!-- 6th row -->
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <div class="black"></div>
        <div class="white"></div>
        <!-- 7th row -->
        <div class="white">&#9817;</div>
        <div class="black">&#9817;</div>
        <div class="white">&#9817;</div>
        <div class="black">&#9817;</div>
        <div class="white">&#9817;</div>
        <div class="black">&#9817;</div>
        <div class="white">&#9817;</div>
        <div class="black">&#9817;</div>
        <!-- 8th -->
        <div class="black">&#9814;</div>
        <div class="white">&#9816;</div>
        <div class="black">&#9815;</div>
        <div class="white">&#9813;</div>
        <div class="black">&#9812;</div>
        <div class="white">&#9815;</div>
        <div class="black">&#9816;</div>
        <div class="white">&#9814;</div>
        </div>
        `;

    }

}