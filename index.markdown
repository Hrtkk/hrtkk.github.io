---
layout: default
title: ByteScribble
---
<div class="home-container">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to ByteScribble</h1>
      <p class="hero-subtitle">Exploring the Art of Software Engineering</p>
      <div class="hero-cta">
        <a href="/blogs" class="primary-button">Read Articles</a>
        <a href="/about" class="secondary-button">About Me</a>
      </div>
    </div>
    <div class="hero-animation">
      <div class="code-animation"></div>
    </div>
  </section>

  <!-- Featured Posts Section -->
  <section class="featured-posts">
    <h2 class="section-title">Featured Articles</h2>
    <div class="posts-grid">
      {% for post in site.posts limit:3 %}
        <div class="post-card">
          <div class="post-card-content">
            <span class="post-category">{{ post.category }}</span>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            <a href="{{ post.url }}" class="read-more">Read More →</a>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>

  <!-- Topics Section -->
  <section class="topics-section">
    <h2 class="section-title">What I Write About</h2>
    <div class="topics-grid">
      <div class="topic-card">
        <div class="topic-icon">🏗️</div>
        <h3>System Design</h3>
        <p>Deep dives into architectural patterns and scalable systems</p>
      </div>
      <div class="topic-card">
        <div class="topic-icon">💻</div>
        <h3>Software Architecture</h3>
        <p>Best practices and patterns in software development</p>
      </div>
      <div class="topic-card">
        <div class="topic-icon">🎯</div>
        <h3>Interview Prep</h3>
        <p>Comprehensive guides for technical interviews</p>
      </div>
    </div>
  </section>

  <!-- Newsletter Section -->
  <section class="newsletter-section">
    <div class="newsletter-content">
      <h2>Stay Updated</h2>
      <p>Get the latest articles and insights delivered to your inbox</p>
      <form class="newsletter-form" id="newsletter-form">
        <input type="email" placeholder="Enter your email" required>
        <button type="submit" class="primary-button">Subscribe</button>
      </form>
    </div>
  </section>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.post-card, .topic-card').forEach((el) => observer.observe(el));

    // Newsletter form handling
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Add your newsletter subscription logic here
            alert('Thanks for subscribing! We\'ll be in touch soon.');
            this.reset();
        });
    }
});
</script>

