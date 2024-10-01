---
layout: post
title: Fundamentals on Stream Processing
date:   2024-09-26 14:25:27 +0530
categories: techincal
author: Hritik Kumar
excerpt_separator: <!--more-->
---
## Fundamentals on Stream Processing
- There are many concepts we need to aware of before we jump into the world of Stream Processing.
Topics that we will be discussing
  - Time Semantics
    - Processing Time
    - Event Time
    - Watermarks
  - State and Consistency Models
  - Failures

## Time Semantics
- Processing Time
  - Processing Time is the time of machine on which operator is processing the particular event.
  - Processing Time window inclues all the events that arrives at the window operator within a time period on that machine.
- Event Time
  - Event Time is the time when an event in the stream actually happened. Event Time is the timestamp assigned to event at the time of its creation.
  - The results of operation based on event time are predictable and also deterministic and will yield the same result no matter how it is processed.
  - But handling delay is a quite challenge, which needs to take care while dealing with event time.

## Watermarks
- When we talk about event time, we also need to take care of delays. In real world, an out of order events are ubiquitous. This makes handling events based on event time bit challenging.
- In order to deal with delays, which make our situation difficult on when to trigger an event-time window.
- Watermarks are basically a point in time, when we say, it enough, and we can't wait any longer and we accept that there will be no events that are gonna come with event time less than current point in time.
- In other words, at time ***t*** we assume that, all the future events will have event time ***t'*** > ***t***
- It doesn't actually solve the problem, but provides a way to deal with delays. Watermarks provide a configurable tradeof between result confidence and latency.


### State and Consistency Models 