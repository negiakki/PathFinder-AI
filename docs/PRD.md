\# Product Requirements Document (PRD)



\# PathFinder AI

\### Your Personal AI Career Counselor



Version: 1.0



\---



\# Product Vision



PathFinder AI is an AI-powered career counseling platform designed to help students in Classes 9–12, particularly those from rural and underserved communities, make informed academic and career decisions.



Instead of functioning as a generic chatbot, PathFinder AI provides a structured Career Discovery Session followed by a personalized Career Report, similar to guidance provided by a professional career counselor.



The platform aims to reduce confusion around stream selection, higher education, and career planning by providing accessible, personalized, and trustworthy AI guidance.



\---



\# Problem Statement



Students in Classes 9–12 often make some of the most important academic decisions of their lives without access to proper career guidance.



Many students choose streams after Class 10 because of peer pressure, parental influence, or lack of awareness rather than their interests and strengths.



Similarly, students in Classes 11–12 are often unaware of suitable degree programs, entrance examinations, career opportunities, required skills, and available learning resources.



This problem is significantly more severe in rural and underserved communities where access to experienced career counselors is limited.



PathFinder AI bridges this gap by providing personalized AI-powered career counseling that helps students understand themselves, explore career opportunities, and confidently plan their future.



\---



\# Target Users



\## Primary Users



\- Students studying in Classes 9–12

\- Rural and underserved communities

\- Students unsure about future career choices



\## Secondary Users



\- Parents

\- Teachers

\- School counselors



\---



\# Goals



The application should help students:



\- Choose the right academic stream.

\- Discover suitable career options.

\- Understand higher education pathways.

\- Identify skill gaps.

\- Create personalized learning roadmaps.

\- Build confidence while making career decisions.



\---



\# User Journey



Landing Page



↓



Career Discovery Session



↓



AI Analysis



↓



Career Report



↓



Download Career Report



\---



\# Functional Requirements



\## 1. Landing Page



The landing page should contain:



\- Hero section

\- Brief introduction

\- Features overview

\- "Start Career Discovery" button

\- Modern and clean design



\---



\## 2. Career Discovery Session



The assessment should feel like talking to a counselor rather than filling out a form.



Requirements:



\- One question displayed at a time

\- Progress indicator

\- Smooth transitions

\- Dynamic flow based on student's class



\---



\## 3. Assessment Questions



\### Common Questions



\- Current Class

\- Preferred Language

\- Career Values



\### Classes 9–10



Collect:



\- Favorite Subjects

\- Interests

\- Hobbies

\- Preferred Activities

\- Learning Style

\- Personality Traits

\- Biggest Career Concern



Goal:



Recommend the most suitable academic stream.



\### Classes 11–12



Collect:



\- Current Stream

\- Favorite Subjects

\- Career Interests

\- Preferred College Type

\- Budget Preference

\- Preferred Work Environment

\- Biggest Career Challenge



Goal:



Recommend suitable careers and higher education pathways.



\---



\## 4. AI Analysis



The application sends the student's responses to IBM watsonx.ai.



The AI generates a structured Career Report.



Only one AI request should be made for each assessment to minimize token usage and improve response time.



\---



\## 5. AI Analysis Screen



Instead of a loading spinner, display an AI analysis sequence.



Example:



🧠 Building your Career Profile...



✔ Identifying interests



✔ Understanding learning style



✔ Matching career pathways



✔ Creating personalized recommendations



✔ Preparing Career Report



\---



\# Career Report



The report must be presented using modern cards.



Never display one large paragraph.



\---



\## Card 1 — Career Snapshot



Contains:



\- Recommended Stream (or Career)

\- Primary Career Match

\- Alternative Career Paths

\- Learning Style

\- Core Strengths



\---



\## Card 2 — Why This Recommendation



Explain:



\- Why the recommendation suits the student

\- Which interests and strengths influenced the recommendation



\---



\## Card 3 — Career Opportunities



Display multiple career cards.



Each card includes:



\- Career Name

\- Short Description

\- Future Scope

\- Required Education



\---



\## Card 4 — Academic Pathway



Display a visual roadmap.



Example:



Class 10



↓



Science (PCM)



↓



JEE



↓



B.Tech Computer Science



↓



Software Engineer



\---



\## Card 5 — Skills to Develop



Display as skill chips.



Examples:



\- Critical Thinking

\- Programming

\- Communication

\- Leadership

\- Problem Solving



\---



\## Card 6 — Personalized Learning Roadmap



Generate a structured roadmap.



Example:



Month 1



↓



Month 2



↓



Month 3



↓



Month 4



\---



\## Card 7 — Learning Resources



Recommend:



\- IBM SkillsBuild

\- SWAYAM

\- NPTEL

\- freeCodeCamp

\- Official entrance examination websites



\---



\## Card 8 — Words of Encouragement



End every report with a short motivational message.



\---



\## Card 9 — Download Career Report



Allow the student to download the report as a PDF.



\---



\# Non-Functional Requirements



The application should:



\- Be fully responsive

\- Work on desktop and mobile devices

\- Have a clean, modern UI

\- Use card-based layouts

\- Include smooth animations

\- Generate reports within a few seconds

\- Be simple enough for first-time users



\---



\# Technical Stack



\## Frontend



\- React

\- Tailwind CSS



\## Backend



\- FastAPI

\- Python



\## AI



\- IBM watsonx.ai Runtime

\- Llama 3.3 70B Instruct



\## Development



\- IBM BOB



\## Deployment



Frontend:



\- Vercel



Backend:



\- Render



AI:



\- IBM watsonx.ai



\---



\# API Flow



Student completes Career Discovery Session



↓



Frontend sends responses to backend



↓



Backend constructs structured prompt



↓



IBM watsonx.ai processes request



↓



Structured JSON response returned



↓



Frontend renders Career Report



↓



User downloads PDF



\---



\# Design Guidelines



The application should feel like:



\- A modern education platform

\- A professional career counselor

\- Friendly and encouraging

\- Simple and easy to navigate



Avoid:



\- Chatbot interfaces

\- Walls of text

\- Technical jargon

\- Complex dashboards



\---



\# Out of Scope (Version 1)



The following features are intentionally excluded:



\- User Authentication

\- User Accounts

\- Database Storage

\- Chat History

\- Voice Interaction

\- Regional Language Support

\- Parent Dashboard

\- Teacher Dashboard

\- Scholarship Recommendation Engine

\- College Ranking System

\- Progress Tracking



\---



\# Future Scope



\- Hindi and regional language support

\- Voice-enabled counseling

\- Parent dashboard

\- Teacher dashboard

\- Scholarship finder

\- College recommendation engine

\- Personality assessment

\- Progress tracking

\- Student portfolio builder



\---



\# Success Criteria



A successful implementation should allow a student to:



✓ Complete the Career Discovery Session



↓



✓ Receive personalized AI career guidance



↓



✓ Understand suitable academic and career pathways



↓



✓ Identify important skills to develop



↓



✓ Receive a structured learning roadmap



↓



✓ Download a professional Career Report



↓



✓ Leave with greater confidence about future academic and career decisions.

