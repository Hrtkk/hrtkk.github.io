// Pattern Challenge Game
class PatternGame {
    constructor() {
        this.patterns = [
            {
                sequence: [2, 4, 8, 16, 32],
                next: 64,
                hint: "Think about multiplication",
                explanation: "Each number is multiplied by 2"
            },
            {
                sequence: [1, 1, 2, 3, 5, 8],
                next: 13,
                hint: "Look at pairs of numbers",
                explanation: "Fibonacci sequence: each number is the sum of the two preceding ones"
            },
            {
                sequence: [1, 4, 9, 16, 25],
                next: 36,
                hint: "Think about square numbers",
                explanation: "Square numbers: 1², 2², 3², 4², 5², next is 6²"
            }
        ];
        this.currentPattern = 0;
        this.attempts = 0;
    }

    checkAnswer(answer) {
        this.attempts++;
        return parseInt(answer) === this.patterns[this.currentPattern].next;
    }

    getCurrentPattern() {
        return this.patterns[this.currentPattern].sequence.join(", ");
    }

    getHint() {
        return this.patterns[this.currentPattern].hint;
    }

    getExplanation() {
        return this.patterns[this.currentPattern].explanation;
    }

    nextPattern() {
        this.currentPattern = (this.currentPattern + 1) % this.patterns.length;
        this.attempts = 0;
    }
}

// Memory Card Game
class MemoryGame {
    constructor() {
        this.cards = [
            { id: 1, content: "HTML", pair: 7 },
            { id: 2, content: "CSS", pair: 8 },
            { id: 3, content: "JavaScript", pair: 9 },
            { id: 4, content: "Python", pair: 10 },
            { id: 5, content: "Ruby", pair: 11 },
            { id: 6, content: "Java", pair: 12 },
            { id: 7, content: "Markup Language", pair: 1 },
            { id: 8, content: "Styling Language", pair: 2 },
            { id: 9, content: "Dynamic Scripting", pair: 3 },
            { id: 10, content: "Snake Language", pair: 4 },
            { id: 11, content: "Gem Language", pair: 5 },
            { id: 12, content: "Coffee Language", pair: 6 }
        ];
        this.flippedCards = [];
        this.matchedPairs = 0;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        return this.cards;
    }

    flipCard(cardId) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card || this.flippedCards.length >= 2) return false;
        
        this.flippedCards.push(card);
        if (this.flippedCards.length === 2) {
            if (this.checkMatch()) {
                this.matchedPairs++;
                this.flippedCards = [];
                return true;
            }
            return false;
        }
        return true;
    }

    checkMatch() {
        if (this.flippedCards.length !== 2) return false;
        return this.flippedCards[0].pair === this.flippedCards[1].id ||
               this.flippedCards[1].pair === this.flippedCards[0].id;
    }

    resetFlippedCards() {
        this.flippedCards = [];
    }

    isGameComplete() {
        return this.matchedPairs === this.cards.length / 2;
    }
}

// Initialize games when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Pattern Game
    const patternGame = new PatternGame();
    const patternForm = document.getElementById('pattern-form');
    const patternSequence = document.getElementById('pattern-sequence');
    const patternResult = document.getElementById('pattern-result');
    const hintButton = document.getElementById('hint-button');
    const nextButton = document.getElementById('next-pattern');

    if (patternForm && patternSequence) {
        patternSequence.textContent = patternGame.getCurrentPattern();
        
        patternForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const answer = document.getElementById('pattern-answer').value;
            const correct = patternGame.checkAnswer(answer);
            
            patternResult.textContent = correct ? 
                `Correct! ${patternGame.getExplanation()}` : 
                'Try again!';
            patternResult.className = correct ? 'correct' : 'incorrect';
        });

        hintButton.addEventListener('click', () => {
            patternResult.textContent = patternGame.getHint();
            patternResult.className = 'hint';
        });

        nextButton.addEventListener('click', () => {
            patternGame.nextPattern();
            patternSequence.textContent = patternGame.getCurrentPattern();
            patternResult.textContent = '';
            document.getElementById('pattern-answer').value = '';
        });
    }

    // Memory Game
    const memoryGame = new MemoryGame();
    const memoryBoard = document.getElementById('memory-board');
    const gameStatus = document.getElementById('game-status');

    if (memoryBoard) {
        const shuffledCards = memoryGame.shuffle();
        shuffledCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.id = card.id;
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">${card.content}</div>
                </div>
            `;
            
            cardElement.addEventListener('click', () => {
                if (!cardElement.classList.contains('flipped') && 
                    !cardElement.classList.contains('matched')) {
                    cardElement.classList.add('flipped');
                    
                    const success = memoryGame.flipCard(parseInt(card.id));
                    if (!success && memoryGame.flippedCards.length === 2) {
                        setTimeout(() => {
                            document.querySelectorAll('.memory-card.flipped:not(.matched)')
                                .forEach(card => card.classList.remove('flipped'));
                            memoryGame.resetFlippedCards();
                        }, 1000);
                    } else if (success && memoryGame.flippedCards.length === 2) {
                        document.querySelectorAll('.memory-card.flipped')
                            .forEach(card => card.classList.add('matched'));
                        
                        if (memoryGame.isGameComplete()) {
                            gameStatus.textContent = 'Congratulations! You\'ve matched all pairs!';
                            gameStatus.className = 'success';
                        }
                    }
                }
            });
            
            memoryBoard.appendChild(cardElement);
        });
    }
}); 