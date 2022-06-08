
// MAIN MENU
const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");
const btn = document.getElementById("btn");

navToggle.addEventListener('click', function(){
    links.classList.toggle('show-links');
})

// Complete logic of game inside this function
const game = () => {
	let playerScore = 0;
	let computerScore = 0;
    let moves = 0;
	let wr = 0;

	// Function to
	const playGame = () => {
		const rockBtn = document.querySelector('.rock');
		const paperBtn = document.querySelector('.paper');
		const scissorBtn = document.querySelector('.scissor');
		const playerOptions = [rockBtn,paperBtn,scissorBtn];
		const computerOptions = ['rock','paper','scissors']
		
		// Function to start playing game
		playerOptions.forEach(option => {
			option.addEventListener('click',function(){

                const movesCount = document.querySelector('.moves');
                moves++;
                movesCount.innerText = `Moves: ${moves}`;
				
				const choiceNumber = Math.floor(Math.random()*computerOptions.length);
				const computerChoice = computerOptions[choiceNumber];

				// Function to check who wins
				winner(this.innerText,computerChoice)
			})
		})
		
	}

	// Function to decide winner
	const winner = (player,computer) => {
		const result = document.querySelector('.result');
		const playerScoreBoard = document.querySelector('.p-count');
		const computerScoreBoard = document.querySelector('.c-count');
		player = player.toLowerCase();
		computer = computer.toLowerCase();
		if(player === computer){
			result.textContent = 'Tie'
		}
		else if(player == 'rock'){
			if(computer == 'paper'){
				result.textContent = 'Computer Won';
				computerScore++;
				computerScoreBoard.textContent = computerScore;

			}else{
				result.textContent = 'Player Won'
				playerScore++;
				playerScoreBoard.textContent = playerScore;
			}
		}
		else if(player == 'scissors'){
			if(computer == 'rock'){
				result.textContent = 'Computer Won';
				computerScore++;
				computerScoreBoard.textContent = computerScore;
			}else{
				result.textContent = 'Player Won';
				playerScore++;
				playerScoreBoard.textContent = playerScore;
			}
		}
		else if(player == 'paper'){
			if(computer == 'scissors'){
				result.textContent = 'Computer Won';
				computerScore++;
				computerScoreBoard.textContent = computerScore;
			}else{
				result.textContent = 'Player Won';
				playerScore++;
				playerScoreBoard.textContent = playerScore;
			}
		}

		const wrCount = document.querySelector('.wr');
		let totalscore = playerScore + computerScore;
		if(totalscore==0)
		{
			wr=0;
		}
		else
		{
			wr = (playerScore*100)/totalscore;
		}
			
		wrCount.innerText = `WinRate: ${wr}%`;

	}



	// Calling playGame function inside game
	playGame();
	
}

// Calling the game function
game();
