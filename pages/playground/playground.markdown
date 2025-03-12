---
layout: page
title: Interactive Playground
permalink: /playground/
---

<link rel="stylesheet" href="/assets/css/playground.css">
<script src="/assets/js/playground.js"></script>

<div class="container">
    <!-- Game Previews -->
    <section class="game-previews">
        <div class="preview-grid">
            <div class="preview-card">
                <img src="/assets/images/games/color-catcher-preview.png" alt="Color Catcher Preview">
                <h3>Color Catcher</h3>
                <p>Test your reflexes by catching falling blocks that match your paddle's color. Quick thinking and precise movements are key to success!</p>
                <ul class="game-features">
                    <li>🎮 Arrow key controls</li>
                    <li>🎯 Color matching mechanics</li>
                    <li>📱 Touch controls for mobile</li>
                </ul>
            </div>
            
            <div class="preview-card">
                <img src="/assets/images/games/pattern-master-preview.png" alt="Pattern Master Preview">
                <h3>Pattern Master</h3>
                <p>Create beautiful patterns by matching tiles in the correct sequence. Learn about symmetry and design while having fun!</p>
                <ul class="game-features">
                    <li>🎨 Multiple pattern types</li>
                    <li>🔄 Rotate and mirror tools</li>
                    <li>✨ Real-time pattern preview</li>
                </ul>
            </div>
            
            <div class="preview-card">
                <img src="/assets/images/games/algo-viz-preview.png" alt="Algorithm Visualizer Preview">
                <h3>Algorithm Visualizer</h3>
                <p>Watch sorting algorithms in action! Understand how different sorting methods work through colorful animations.</p>
                <ul class="game-features">
                    <li>🔍 Multiple sorting algorithms</li>
                    <li>📊 Visual step-by-step process</li>
                    <li>⚡ Adjustable animation speed</li>
                </ul>
            </div>
            
            <div class="preview-card">
                <img src="/assets/images/games/typing-race-preview.png" alt="Typing Race Preview">
                <h3>Typing Race</h3>
                <p>Improve your coding speed by typing out real code snippets. Track your WPM and accuracy in real-time!</p>
                <ul class="game-features">
                    <li>⌨️ Code-focused typing practice</li>
                    <li>⏱️ WPM tracking</li>
                    <li>📈 Accuracy measurement</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Color Catcher Game -->
    <section class="game-section color-catcher">
        <h2>Color Catcher</h2>
        <p>Catch falling blocks that match your paddle's color. Use left/right arrow keys to move.</p>
        <div class="game-container">
            <canvas id="colorCatcherCanvas"></canvas>
            <div class="game-controls">
                <button id="startGame">Start Game</button>
                <div class="score-display">Score: <span id="score">0</span></div>
            </div>
        </div>
    </section>

    <!-- Pattern Master Game -->
    <section class="game-section pattern-master">
        <h2>Pattern Master</h2>
        <p>Create beautiful design patterns by placing tiles in the correct sequence. Learn about symmetry and design principles.</p>
        <div class="game-container">
            <canvas id="patternMasterCanvas"></canvas>
            <div class="game-controls">
                <div class="pattern-tools">
                    <button id="rotatePattern">Rotate</button>
                    <button id="mirrorPattern">Mirror</button>
                    <button id="clearPattern">Clear</button>
                </div>
                <select id="patternSelect">
                    <option value="mandala">Mandala</option>
                    <option value="geometric">Geometric</option>
                    <option value="floral">Floral</option>
                </select>
                <button id="startPatternMaster">New Pattern</button>
                <div class="score-display">Score: <span id="patternScore">0</span></div>
            </div>
            <div class="pattern-hint">Hint: <span id="patternHint"></span></div>
        </div>
    </section>

    <!-- Algorithm Visualizer -->
    <section class="game-section algo-visualizer">
        <h2>Algorithm Visualizer</h2>
        <p>Watch and learn how different sorting algorithms work in real-time.</p>
        <div class="game-container">
            <canvas id="algoVisualizerCanvas"></canvas>
            <div class="game-controls">
                <select id="algorithmSelect">
                    <option value="bubble">Bubble Sort</option>
                    <option value="selection">Selection Sort</option>
                    <option value="insertion">Insertion Sort</option>
                </select>
                <button id="startAlgoVisualizer">Visualize</button>
            </div>
        </div>
    </section>

    <!-- Typing Race Game -->
    <section class="game-section typing-race">
        <h2>Typing Race</h2>
        <p>Test your coding speed by typing out code snippets accurately.</p>
        <div class="game-container">
            <div id="typeText" class="type-text"></div>
            <textarea id="typeInput" placeholder="Start typing here..."></textarea>
            <div class="game-controls">
                <button id="startTyping">Start Game</button>
                <div class="stats">
                    <div>Time: <span id="typeTime">60</span>s</div>
                    <div>WPM: <span id="typeWPM">0</span></div>
                </div>
            </div>
        </div>
    </section>
</div>