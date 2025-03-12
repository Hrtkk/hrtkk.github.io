---
layout: default
title: Playground
permalink: /playground/
---

<link rel="stylesheet" href="{{ '/assets/css/playground.css' | relative_url }}">
<script src="{{ '/assets/js/playground.js' | relative_url }}"></script>

<div class="playground-container">
    <h1>Welcome to the Tech Playground!</h1>
    <p>Challenge yourself with these fun tech-related games and puzzles.</p>

    <section class="game-section pattern-game">
        <h2 class="game-title">Pattern Challenge</h2>
        <p>Can you figure out the next number in the sequence?</p>
        
        <div class="pattern-sequence" id="pattern-sequence"></div>
        
        <form id="pattern-form" class="pattern-form">
            <input type="number" id="pattern-answer" class="pattern-input" placeholder="Next number?" required>
            <button type="submit" class="game-button submit-button">Check Answer</button>
            <button type="button" id="hint-button" class="game-button hint-button">Get Hint</button>
            <button type="button" id="next-pattern" class="game-button next-button">Next Pattern</button>
        </form>
        
        <div id="pattern-result" class="pattern-result"></div>
    </section>

    <section class="game-section memory-game">
        <h2 class="game-title">Programming Memory Match</h2>
        <p>Match the programming concepts with their descriptions. Find all pairs to win!</p>
        
        <div id="memory-board" class="memory-board"></div>
        <div id="game-status" class="game-status"></div>
    </section>

    <section class="game-section coming-soon">
        <h2 class="game-title">More Challenges Coming Soon!</h2>
        <p>Stay tuned for more exciting tech challenges and games:</p>
        <ul>
            <li>Code Debugging Puzzles</li>
            <li>Algorithm Visualization</li>
            <li>CSS Grid Game</li>
            <li>Type Racing</li>
        </ul>
    </section>
</div>