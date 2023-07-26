var user_turn = true; // True indicate user1 turn
var user1_message;
var user2_message;
const user1_color = 'Red';
const user2_color = 'Green';
const message = $('#usermessage');

//Prepare grid to access each cell as a cell in Matrix
var grid = [];
var cells = $('td > div');
var index = 0
for(let i = 0; i < 6; i++){
    temp = [];
    for(let j = 0; j < 7; j ++){
        temp.push(cells[index++]);
    }
    grid.push(temp);
}



//Take user names from prompts
var user1 = null, user2 = null;
take_users = () => {
    while(user1 == null || user1 == ''){
        user1 = prompt('Enter name of user1. Your color will be Red.').trim();
    }
    while(user2 == null || user2 == ''){
        user2 = prompt('Enter name of user2. Your color will be Green.').trim();
    }
}

//set user message

set_message = (text) => {
    message.text(text);
}

//start game
start = () => {
    $('#start').hide();
    take_users();
    user1_message = 'Its ' + user1 + ' turn';
    user2_message = 'Its ' + user2 + ' turn';
    set_message(user1_message);

    //event listeners for grid
    for(let i=0; i<6; i++){
        for(let j=0; j <7; j++){
            grid[i][j].addEventListener('click', (e) => run(i, j));
        }
    }
    
}

//get last available cell in column
get_available_cell = (j) =>{
    for(let i = 5; i >= 0; i--){
        let color = $(grid[i][j]).css('background-color');
        if(color == 'rgba(0, 0, 0, 0)'){
            return i;
        }
    }
    return -1;
}

//check row if game is over
check_row = (i, j) =>{
    let clr = $(grid[i][j]).css('background-color');
    if(clr == 'rgba(0, 0, 0, 0)'){
        return null;
    }
    let count = 1;
    for(let k=j+1; k<7; k++){
        if(count >= 4){
            break;
        }
        if($(grid[i][k]).css('background-color') != clr){
            break;
        }
        count += 1;
    }
    if(count < 4){
        return null;
    }
    if(clr == 'rgb(255, 0, 0)'){
        return user1;
    }
    return user2;
}

//check col of game is over
check_col = (i, j) =>{
    let clr = $(grid[i][j]).css('background-color');
    if(clr == 'rgba(0, 0, 0, 0)'){
        return null;
    }
    let count = 1;
    for(let k=i+1; k<6; k++){
        if(count >= 4){
            break;
        }
        if($(grid[k][j]).css('background-color') != clr){
            break;
        }
        count += 1;
    }
    if(count < 4){
        return null;
    }
    if(clr == 'rgb(255, 0, 0)'){
        return user1;
    }
    return user2;
}

check_right_dia = (i, j) => {
    let clr = $(grid[i][j]).css('background-color');
    if(clr == 'rgba(0, 0, 0, 0)'){
        return null;
    }
    let count = 0;
    while(i < 6 && j < 7){
        if(count >= 4){
            break;
        }
        if($(grid[i][j]).css('background-color') != clr){
            break;
        }
        count += 1;
        i += 1;
        j += 1;
    }
    if(count < 4){
        return null;
    }
    if(clr == 'rgb(255, 0, 0)'){
        return user1;
    }
    return user2;

}

check_left_dia = (i, j) => {
    let clr = $(grid[i][j]).css('background-color');
    if(clr == 'rgba(0, 0, 0, 0)'){
        return null;
    }
    let count = 0;
    while(i < 6 && j >= 0){
        if(count >= 4){
            break;
        }
        if($(grid[i][j]).css('background-color') != clr){
            break;
        }
        count += 1;
        i += 1;
        j -= 1;
    }
    if(count < 4){
        return null;
    }
    if(clr == 'rgb(255, 0, 0)'){
        return user1;
    }
    return user2;
}

check_gameover = () => {
    for(let i=0; i<6; i++){
        for(let j=0; j<7; j++){
            let temp = check_row(i, j);
            if(temp != null){
                return temp;
            }
            temp = check_col(i, j);
            if(temp != null){
                return temp;
            }
            temp = check_right_dia(i, j);
            if(temp != null){
                return temp;
            }
            temp = check_left_dia(i, j);
            if(temp != null){
                return temp;
            }
        }
    }
    return null;
}


//Function 'run' will execute every time user provides input
function run(i, j){
    var cell_index = get_available_cell(j);
    if(cell_index == -1){
        set_message('No vacant cells in column. Please select again.');
        return;
    }
    if(user_turn){
        set_message(user2_message);
        $(grid[cell_index][j]).css('background', user1_color);
    }else{
        set_message(user1_message);
        $(grid[cell_index][j]).css('background', user2_color);
    }
    player_won = check_gameover()
    if(player_won != null){
        set_message('Game over '+ player_won + ' won the game.');
        $(message).css('color', 'Green');
        $('.board').fadeOut(2000);
    }
    user_turn = !user_turn;
    
}


