window.addEventListener('DOMContentLoaded',()=>{
    const op=Array.from(document.querySelectorAll('.op'));
    const player=document.querySelector('.display-player');
    const resetButton=document.querySelector('#reset');
    const announcer=document.querySelector('.announcer');
    let board=['','','','','','','','',''];
    let currentPlayer='X';
    let isGameActive=true;
    const Playerx='PLAYER X WON';
    const Playery='PLAYER Y WON';
    const Tie='Tie';
    const winningConditions=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    function handleResultValidation(){
        let roundWon=false;
        for(let i=0;i<=7;i++) {
            const winCondition=winningConditions[i];
            const a=board[winCondition[0]];
            const b=board[winCondition[1]];
            const c=board[winCondition[2]];
            if(a===''||b===''||c===''){
                continue;
            }
            if(a===b&&b===c) {
                roundWon=true;
                break;
            }
        }
        if(roundWon){
            announce(currentPlayer==='X'? Playerx:Playery);
            isGameActive=false;
            return;
        }
        if(!board.includes('')) {
             announce(Tie);
        }
    }
    const announce=(type)=>{
        switch(type){
            case Playery:
                announcer.innerHTML='Player <span class="playerY">Y</span> Won';
                break;
            case Playerx:
                announcer.innerHTML='Player <span class="playerX">X</span> Won';
                break;
            case Tie:
                announcer.innerHTML='Tie';  
                break;      
        }
        announcer.classList.remove('hide');
    }
    const isValidAction=(tile)=>{
        if(tile.innerText==='X'||tile.innerText==='Y'){
            return false;
        }
        return true;
    }
    const updateBoard=(index)=>{
        board[index]=currentPlayer;
    }
    const changePlayer=()=>{
        player.classList.remove(`player${currentPlayer}`);
        currentPlayer=currentPlayer==='X'?'Y':'X';
        player.innerText=currentPlayer;
        player.classList.add(`player${currentPlayer}`);
    }
    const userAction=(tile,index)=>{
        if(isValidAction(tile)&&isGameActive){
            tile.innerText=currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    const resetBoard=()=>{
        board=['','','','','','','','',''];
        isGameActive=true;
        announcer.classList.add('hide');
        if(currentPlayer==='Y') {
            changePlayer();
        }
        op.forEach(tile=>{
            tile.innerText='';
            tile.classList.remove('playerX');
            tile.classList.remove('playerY');
        })
    }
    op.forEach((tile,index)=>{
        tile.addEventListener('click',()=> userAction(tile,index));
    });
    resetButton.addEventListener('click',resetBoard);
});
