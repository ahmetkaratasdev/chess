// all the logic for rendering out the view
export default class gameView {
    constructor(root) {
        this.root = root;
        this.root.innerHTML = `
        
        <div class="chessboard">
        <!-- 1st row -->
        <div class="white" data-index="0">&#9820;</div>
        <div class="black" data-index="1">&#9822;</div>
        <div class="white" data-index="2">&#9821;</div>
        <div class="black" data-index="3">&#9819;</div>
        <div class="white" data-index="4">&#9818;</div>
        <div class="black" data-index="5">&#9821;</div>
        <div class="white" data-index="6">&#9822;</div>
        <div class="black" data-index="7">&#9820;</div>
        <!-- 2nd row -->
        <div class="black" data-index="8">&#9823;</div>
        <div class="white" data-index="9">&#9823;</div>
        <div class="black" data-index="10">&#9823;</div>
        <div class="white" data-index="11">&#9823;</div>
        <div class="black" data-index="12">&#9823;</div>
        <div class="white" data-index="13">&#9823;</div>
        <div class="black" data-index="14">&#9823;</div>
        <div class="white" data-index="15">&#9823;</div>
        <!-- 3th row -->
        <div class="white" data-index="16"></div>
        <div class="black" data-index="17"></div>
        <div class="white" data-index="18"></div>
        <div class="black" data-index="19"></div>
        <div class="white" data-index="20"></div>
        <div class="black" data-index="21"></div>
        <div class="white" data-index="22"></div>
        <div class="black" data-index="23"></div>
        <!-- 4st row -->
        <div class="black" data-index="24"></div>
        <div class="white" data-index="25"></div>
        <div class="black" data-index="26"></div>
        <div class="white" data-index="27"></div>
        <div class="black" data-index="28"></div>
        <div class="white" data-index="29"></div>
        <div class="black" data-index="30"></div>
        <div class="white" data-index="31"></div>
        <!-- 5th row -->
        <div class="white" data-index="32"></div>
        <div class="black" data-index="33"></div>
        <div class="white" data-index="34"></div>
        <div class="black" data-index="35"></div>
        <div class="white" data-index="36"></div>
        <div class="black" data-index="37"></div>
        <div class="white" data-index="38"></div>
        <div class="black" data-index="39"></div>
        <!-- 6th row -->
        <div class="black" data-index="40"></div>
        <div class="white" data-index="41"></div>
        <div class="black" data-index="42"></div>
        <div class="white" data-index="43"></div>
        <div class="black" data-index="44"></div>
        <div class="white" data-index="45"></div>
        <div class="black" data-index="46"></div>
        <div class="white" data-index="47"></div>
        <!-- 7th row -->
        <div class="white" data-index="48">&#9817;</div>
        <div class="black" data-index="49">&#9817;</div>
        <div class="white" data-index="50">&#9817;</div>
        <div class="black" data-index="51">&#9817;</div>
        <div class="white" data-index="52">&#9817;</div>
        <div class="black" data-index="53">&#9817;</div>
        <div class="white" data-index="54">&#9817;</div>
        <div class="black" data-index="55">&#9817;</div>
        <!-- 8th -->
        <div class="black" data-index="56">&#9814;</div>
        <div class="white" data-index="57">&#9816;</div>
        <div class="black" data-index="58">&#9815;</div>
        <div class="white" data-index="59">&#9813;</div>
        <div class="black" data-index="60">&#9812;</div>
        <div class="white" data-index="61">&#9815;</div>
        <div class="black" data-index="62">&#9816;</div>
        <div class="white" data-index="63">&#9814;</div>
        </div>
        `;

        this.onTileClick = undefined;
        this.root.querySelectorAll('.black, .white').forEach(tile => {
            tile.addEventListener("click", () => {
                if (this.onTileClick) {
                    this.onTileClick(tile.dataset.index);
                }
            });
        })
    }


}