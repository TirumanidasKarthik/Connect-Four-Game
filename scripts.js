var user1 = null, user2 = null;

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
take_users = () => {
    while(user1 == null || user1 == ''){
        user1 = prompt('Enter name of user1. Your color will be Red.').trim();
    }
    while(user2 == null || user2 == ''){
        user2 = prompt('Enter name of user2. Your color will be Green.').trim();
    }
    console.log(user1);
    console.log(user2);
};