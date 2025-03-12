// Color Catcher Game
class ColorCatcher {
    constructor() {
        this.canvas = document.getElementById('colorCatcherCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameRunning = false;
        this.colors = ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f'];
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Paddle properties
        this.paddle = {
            width: 100,
            height: 20,
            x: this.canvas.width / 2 - 50,
            y: this.canvas.height - 30,
            color: this.colors[0],
            speed: 7
        };
        
        // Falling blocks array
        this.blocks = [];
        
        // Controls
        this.keys = {
            left: false,
            right: false
        };
        
        // Event listeners
        const startButton = document.getElementById('startGame');
        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log('Start button clicked');
                this.startGame();
            });
        }
        
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Draw initial state
        this.draw();
        
        // Add touch controls for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            
            if (x < this.canvas.width / 2) {
                this.keys.left = true;
                this.keys.right = false;
            } else {
                this.keys.right = true;
                this.keys.left = false;
            }
        });
        
        this.canvas.addEventListener('touchend', () => {
            this.keys.left = false;
            this.keys.right = false;
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            
            if (x < this.canvas.width / 2) {
                this.keys.left = true;
                this.keys.right = false;
            } else {
                this.keys.right = true;
                this.keys.left = false;
            }
        });
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        
        this.canvas.width = Math.min(600, containerWidth - 20);
        this.canvas.height = 400;
        
        // Adjust paddle position after resize
        if (this.paddle) {
            this.paddle.x = Math.min(this.paddle.x, this.canvas.width - this.paddle.width);
            this.paddle.y = this.canvas.height - 30;
        }
    }
    
    startGame() {
        console.log('Starting game...');
        if (this.gameRunning) {
            console.log('Game already running');
            return;
        }
        
        this.gameRunning = true;
        this.score = 0;
        this.blocks = [];
        document.getElementById('score').textContent = this.score;
        document.getElementById('startGame').textContent = 'Restart Game';
        
        // Clear any existing intervals
        if (this.spawnBlockInterval) {
            clearInterval(this.spawnBlockInterval);
        }
        
        // Start game loop
        this.gameLoop();
        this.spawnBlockInterval = setInterval(() => this.spawnBlock(), 1000);
        console.log('Game started');
    }
    
    handleKeyDown(e) {
        if (e.key === 'ArrowLeft') this.keys.left = true;
        if (e.key === 'ArrowRight') this.keys.right = true;
        e.preventDefault();
    }
    
    handleKeyUp(e) {
        if (e.key === 'ArrowLeft') this.keys.left = false;
        if (e.key === 'ArrowRight') this.keys.right = false;
        e.preventDefault();
    }
    
    spawnBlock() {
        if (!this.gameRunning) return;
        
        const block = {
            width: 40,
            height: 40,
            x: Math.random() * (this.canvas.width - 40),
            y: -40,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            speed: 3
        };
        this.blocks.push(block);
    }
    
    update() {
        if (!this.gameRunning) return;
        
        // Update paddle position
        if (this.keys.left) this.paddle.x -= this.paddle.speed;
        if (this.keys.right) this.paddle.x += this.paddle.speed;
        
        // Keep paddle within canvas bounds
        this.paddle.x = Math.max(0, Math.min(this.canvas.width - this.paddle.width, this.paddle.x));
        
        // Update blocks
        for (let i = this.blocks.length - 1; i >= 0; i--) {
            const block = this.blocks[i];
            block.y += block.speed;
            
            // Check for collision with paddle
            if (block.y + block.height > this.paddle.y &&
                block.x < this.paddle.x + this.paddle.width &&
                block.x + block.width > this.paddle.x) {
                
                if (block.color === this.paddle.color) {
                    // Correct color match
                    this.score += 10;
                    document.getElementById('score').textContent = this.score;
                    this.blocks.splice(i, 1);
                    // Change paddle color
                    this.paddle.color = this.colors[Math.floor(Math.random() * this.colors.length)];
                } else {
                    // Game over on wrong color
                    this.gameOver();
                    return;
                }
            }
            
            // Remove blocks that fall off screen
            if (block.y > this.canvas.height) {
                this.blocks.splice(i, 1);
            }
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw paddle
        this.ctx.fillStyle = this.paddle.color;
        this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        
        // Draw blocks
        this.blocks.forEach(block => {
            this.ctx.fillStyle = block.color;
            this.ctx.fillRect(block.x, block.y, block.width, block.height);
        });
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    gameOver() {
        console.log('Game Over');
        this.gameRunning = false;
        clearInterval(this.spawnBlockInterval);
        document.getElementById('startGame').textContent = 'Play Again';
        
        // Draw game over message
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 40);
    }
}

// Pattern Master Game
class PatternMaster {
    constructor() {
        this.canvas = document.getElementById('patternMasterCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameRunning = false;
        
        // Pattern properties
        this.gridSize = 8;
        this.tileSize = 40;
        this.grid = [];
        this.currentPattern = [];
        this.selectedTile = null;
        this.patternType = 'mandala';
        
        // Colors
        this.colors = [
            '#e74c3c', '#3498db', '#2ecc71', '#f1c40f',
            '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
        ];
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Event listeners
        const startButton = document.getElementById('startPatternMaster');
        const rotateButton = document.getElementById('rotatePattern');
        const mirrorButton = document.getElementById('mirrorPattern');
        const clearButton = document.getElementById('clearPattern');
        const patternSelect = document.getElementById('patternSelect');
        
        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log('Starting Pattern Master game...');
                this.startGame();
            });
        }
        
        if (rotateButton) rotateButton.addEventListener('click', () => this.rotatePattern());
        if (mirrorButton) mirrorButton.addEventListener('click', () => this.mirrorPattern());
        if (clearButton) clearButton.addEventListener('click', () => this.clearPattern());
        if (patternSelect) {
            patternSelect.addEventListener('change', (e) => {
                this.patternType = e.target.value;
                if (this.gameRunning) this.generatePattern();
            });
        }
        
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // Initialize game
        this.initializeGrid();
        this.draw();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const size = Math.min(600, containerWidth - 20);
        
        this.canvas.width = size;
        this.canvas.height = size;
        this.tileSize = size / this.gridSize;
        
        if (this.gameRunning) this.draw();
    }
    
    initializeGrid() {
        this.grid = [];
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = {
                    color: null,
                    highlighted: false
                };
            }
        }
    }
    
    startGame() {
        this.gameRunning = true;
        this.score = 0;
        document.getElementById('patternScore').textContent = this.score;
        this.initializeGrid();
        this.generatePattern();
        this.draw();
    }
    
    generatePattern() {
        this.currentPattern = [];
        const center = Math.floor(this.gridSize / 2);
        
        switch (this.patternType) {
            case 'mandala':
                this.generateMandalaPattern(center);
                break;
            case 'geometric':
                this.generateGeometricPattern(center);
                break;
            case 'floral':
                this.generateFloralPattern(center);
                break;
        }
        
        document.getElementById('patternHint').textContent = 
            `Create a ${this.patternType} pattern using the highlighted tiles`;
    }
    
    generateMandalaPattern(center) {
        const radius = Math.floor(this.gridSize / 4);
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const x = center + Math.round(radius * Math.cos(angle));
            const y = center + Math.round(radius * Math.sin(angle));
            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                this.currentPattern.push({ x, y, color: this.colors[i % this.colors.length] });
            }
        }
    }
    
    generateGeometricPattern(center) {
        const patterns = [
            [[-1, -1], [1, -1], [1, 1], [-1, 1]], // Square
            [[-1, 0], [0, -1], [1, 0], [0, 1]], // Diamond
            [[-1, -1], [1, -1], [0, 1]] // Triangle
        ];
        
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        pattern.forEach((pos, i) => {
            const x = center + pos[0];
            const y = center + pos[1];
            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                this.currentPattern.push({ x, y, color: this.colors[i % this.colors.length] });
            }
        });
    }
    
    generateFloralPattern(center) {
        const petalCount = 6;
        for (let i = 0; i < petalCount; i++) {
            const angle = (i * 2 * Math.PI) / petalCount;
            const x = center + Math.round(2 * Math.cos(angle));
            const y = center + Math.round(2 * Math.sin(angle));
            if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
                this.currentPattern.push({ x, y, color: this.colors[i % this.colors.length] });
            }
        }
        // Add center
        this.currentPattern.push({ x: center, y: center, color: this.colors[this.colors.length - 1] });
    }
    
    handleClick(e) {
        if (!this.gameRunning) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.tileSize);
        const y = Math.floor((e.clientY - rect.top) / this.tileSize);
        
        if (x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize) {
            if (this.selectedTile) {
                this.grid[y][x].color = this.selectedTile;
                this.selectedTile = null;
                this.checkPattern();
            } else if (this.grid[y][x].color) {
                this.selectedTile = this.grid[y][x].color;
                this.grid[y][x].color = null;
            }
            this.draw();
        }
    }
    
    handleMouseMove(e) {
        if (!this.gameRunning) return;
        
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / this.tileSize);
        const y = Math.floor((e.clientY - rect.top) / this.tileSize);
        
        let updated = false;
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j].highlighted !== (i === y && j === x)) {
                    this.grid[i][j].highlighted = (i === y && j === x);
                    updated = true;
                }
            }
        }
        
        if (updated) this.draw();
    }
    
    rotatePattern() {
        const newGrid = [];
        for (let i = 0; i < this.gridSize; i++) {
            newGrid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                newGrid[i][j] = this.grid[this.gridSize - 1 - j][i];
            }
        }
        this.grid = newGrid;
        this.checkPattern();
        this.draw();
    }
    
    mirrorPattern() {
        this.grid.forEach(row => row.reverse());
        this.checkPattern();
        this.draw();
    }
    
    clearPattern() {
        this.initializeGrid();
        this.draw();
    }
    
    checkPattern() {
        let correct = 0;
        this.currentPattern.forEach(pattern => {
            if (this.grid[pattern.y][pattern.x].color === pattern.color) {
                correct++;
            }
        });
        
        if (correct === this.currentPattern.length) {
            this.score += 100;
            document.getElementById('patternScore').textContent = this.score;
            this.generatePattern();
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const tile = this.grid[i][j];
                
                // Draw tile background
                this.ctx.fillStyle = tile.highlighted ? '#bdc3c7' : '#ecf0f1';
                this.ctx.fillRect(
                    j * this.tileSize,
                    i * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
                
                // Draw tile color if exists
                if (tile.color) {
                    this.ctx.fillStyle = tile.color;
                    this.ctx.fillRect(
                        j * this.tileSize + 2,
                        i * this.tileSize + 2,
                        this.tileSize - 4,
                        this.tileSize - 4
                    );
                }
                
                // Draw grid lines
                this.ctx.strokeStyle = '#95a5a6';
                this.ctx.strokeRect(
                    j * this.tileSize,
                    i * this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
        
        // Draw pattern preview if game is running
        if (this.gameRunning) {
            const previewSize = this.tileSize * 0.8;
            this.currentPattern.forEach((pattern, index) => {
                this.ctx.fillStyle = pattern.color;
                this.ctx.fillRect(
                    10 + (index * (previewSize + 5)),
                    10,
                    previewSize,
                    previewSize
                );
            });
        }
        
        // Draw selected tile
        if (this.selectedTile) {
            this.ctx.fillStyle = this.selectedTile;
            this.ctx.fillRect(
                this.canvas.width - this.tileSize - 10,
                10,
                this.tileSize,
                this.tileSize
            );
        }
    }
}

// Algorithm Visualizer Game
class AlgorithmVisualizer {
    constructor() {
        this.canvas = document.getElementById('algoVisualizerCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.array = [];
        this.arraySize = 20;
        this.comparing = [-1, -1];
        this.swapping = [-1, -1];
        this.sorted = false;
        this.animationSpeed = 50;
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Event listeners
        const startButton = document.getElementById('startAlgoVisualizer');
        if (startButton) {
            startButton.addEventListener('click', () => this.startVisualization());
        }
        
        // Algorithm selection
        const algoSelect = document.getElementById('algorithmSelect');
        if (algoSelect) {
            algoSelect.addEventListener('change', () => {
                this.currentAlgorithm = algoSelect.value;
            });
        }
        
        this.currentAlgorithm = 'bubble';
        this.generateArray();
        this.draw();
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        this.canvas.width = Math.min(600, containerWidth - 20);
        this.canvas.height = 400;
        this.barWidth = (this.canvas.width - 40) / this.arraySize;
    }
    
    generateArray() {
        this.array = [];
        for (let i = 0; i < this.arraySize; i++) {
            this.array.push(Math.floor(Math.random() * (this.canvas.height - 100)) + 20);
        }
    }
    
    async startVisualization() {
        this.sorted = false;
        this.generateArray();
        document.getElementById('startAlgoVisualizer').disabled = true;
        
        switch (this.currentAlgorithm) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'selection':
                await this.selectionSort();
                break;
            case 'insertion':
                await this.insertionSort();
                break;
        }
        
        this.sorted = true;
        this.comparing = [-1, -1];
        this.swapping = [-1, -1];
        this.draw();
        document.getElementById('startAlgoVisualizer').disabled = false;
    }
    
    async bubbleSort() {
        for (let i = 0; i < this.array.length; i++) {
            for (let j = 0; j < this.array.length - i - 1; j++) {
                this.comparing = [j, j + 1];
                this.draw();
                await this.sleep(this.animationSpeed);
                
                if (this.array[j] > this.array[j + 1]) {
                    this.swapping = [j, j + 1];
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.draw();
                    await this.sleep(this.animationSpeed);
                }
            }
        }
    }
    
    async selectionSort() {
        for (let i = 0; i < this.array.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < this.array.length; j++) {
                this.comparing = [minIdx, j];
                this.draw();
                await this.sleep(this.animationSpeed);
                
                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                this.swapping = [i, minIdx];
                [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
                this.draw();
                await this.sleep(this.animationSpeed);
            }
        }
    }
    
    async insertionSort() {
        for (let i = 1; i < this.array.length; i++) {
            let key = this.array[i];
            let j = i - 1;
            
            while (j >= 0 && this.array[j] > key) {
                this.comparing = [j, j + 1];
                this.draw();
                await this.sleep(this.animationSpeed);
                
                this.array[j + 1] = this.array[j];
                this.swapping = [j, j + 1];
                this.draw();
                await this.sleep(this.animationSpeed);
                j--;
            }
            this.array[j + 1] = key;
        }
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.array.forEach((value, index) => {
            let color = '#3498db';
            if (this.comparing.includes(index)) color = '#f1c40f';
            if (this.swapping.includes(index)) color = '#e74c3c';
            if (this.sorted) color = '#2ecc71';
            
            this.ctx.fillStyle = color;
            this.ctx.fillRect(
                index * this.barWidth + 20,
                this.canvas.height - value,
                this.barWidth - 2,
                value
            );
        });
    }
}

// Typing Race Game
class TypingRace {
    constructor() {
        this.textDisplay = document.getElementById('typeText');
        this.input = document.getElementById('typeInput');
        this.timeDisplay = document.getElementById('typeTime');
        this.wpmDisplay = document.getElementById('typeWPM');
        this.startButton = document.getElementById('startTyping');
        
        if (!this.textDisplay || !this.input || !this.timeDisplay || 
            !this.wpmDisplay || !this.startButton) {
            console.error('Required elements not found for Typing Race');
            return;
        }
        
        this.texts = [
            'function calculateSum(a, b) { return a + b; }',
            'const array = [1, 2, 3].map(x => x * 2);',
            'class Rectangle { constructor(width, height) { this.width = width; this.height = height; } }',
            'import React, { useState, useEffect } from "react";',
            'SELECT * FROM users WHERE age > 18 ORDER BY name;'
        ];
        
        this.currentText = '';
        this.timeLeft = 60;
        this.isRunning = false;
        this.timer = null;
        this.mistakes = 0;
        
        // Initialize the game
        this.input.disabled = true;
        this.input.value = '';
        this.textDisplay.textContent = 'Click Start Game to begin...';
        
        // Event listeners
        this.startButton.addEventListener('click', () => {
            console.log('Starting Typing Race...');
            this.startGame();
        });
        
        this.input.addEventListener('input', () => {
            console.log('Input detected');
            this.checkInput();
        });
    }
    
    startGame() {
        console.log('Game starting...');
        // Clear any existing timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.isRunning = true;
        this.mistakes = 0;
        this.timeLeft = 60;
        this.currentText = this.texts[Math.floor(Math.random() * this.texts.length)];
        
        // Reset and enable input
        this.input.value = '';
        this.input.disabled = false;
        this.input.focus();
        
        // Update displays
        this.textDisplay.textContent = this.currentText;
        this.timeDisplay.textContent = this.timeLeft;
        this.wpmDisplay.textContent = '0';
        this.startButton.textContent = 'Restart Game';
        
        console.log('Game started with text:', this.currentText);
        
        // Start timer
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.timeDisplay.textContent = this.timeLeft;
            
            if (this.timeLeft === 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    checkInput() {
        if (!this.isRunning) return;
        
        const currentInput = this.input.value;
        const currentLength = currentInput.length;
        let correct = true;
        
        // Check each character
        for (let i = 0; i < currentLength; i++) {
            if (currentInput[i] !== this.currentText[i]) {
                correct = false;
                this.mistakes++;
                break;
            }
        }
        
        // Highlight text based on correctness
        const remainingText = this.currentText.slice(currentLength);
        this.textDisplay.innerHTML = `
            <span style="color: ${correct ? '#2ecc71' : '#e74c3c'}">${currentInput}</span>${remainingText}
        `;
        
        // Calculate WPM
        if (this.timeLeft < 60) {
            const timeElapsed = (60 - this.timeLeft) / 60; // Convert to minutes
            const wordsTyped = currentInput.length / 5; // Standard: 5 characters = 1 word
            const wpm = Math.round(wordsTyped / timeElapsed);
            this.wpmDisplay.textContent = wpm;
        }
        
        // Check if completed
        if (currentInput === this.currentText) {
            this.endGame(true);
        }
    }
    
    endGame(completed = false) {
        clearInterval(this.timer);
        this.isRunning = false;
        this.input.disabled = true;
        this.startButton.textContent = 'Start Game';
        
        const accuracy = Math.round(
            ((this.currentText.length - this.mistakes) / this.currentText.length) * 100
        );
        
        this.textDisplay.innerHTML = completed
            ? `<span style="color: #2ecc71">Completed! Accuracy: ${accuracy}%</span>`
            : `<span style="color: #e74c3c">Time's up! Accuracy: ${accuracy}%</span>`;
    }
}

// Initialize games when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all games
    const colorCatcher = document.getElementById('colorCatcherCanvas');
    if (colorCatcher) new ColorCatcher();
    
    const patternMaster = document.getElementById('patternMasterCanvas');
    if (patternMaster) new PatternMaster();
    
    const algoVisualizer = document.getElementById('algoVisualizerCanvas');
    if (algoVisualizer) new AlgorithmVisualizer();
    
    const typingRace = document.getElementById('typeText');
    if (typingRace) new TypingRace();
}); 