# DevSync
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
</head>
<body>

<h1>DevSync - Real-Time Code Collaboration & Online Compiler</h1>
<p>
    <strong>DevSync</strong> is a real-time code collaboration platform that allows multiple developers to work together
    in a shared environment. Collaborators can write and compile code across different programming languages instantly,
    thanks to its integrated JDoodle API. Built using <strong>React, CSS, Socket.IO, Node, and Express</strong>,
    DevSync is designed for a seamless and productive teamwork experience.
</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#supported-languages">Supported Languages</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#real-time-collaboration">Real-Time Collaboration</a></li>
    <li><a href="#online-compiler">Online Compiler</a></li>
    
</ul>

<h2 id="demo">1. Demo</h2>
<p>Check out the live demo here: <strong><a href="https://devsync-frontend-peh8.onrender.com">DevSync Demo</a></strong></p>

<h2 id="features">2. Features</h2>
<h3>Real-Time Code Collaboration</h3>
<ul>
    <li><strong>Multi-User Collaboration</strong>: Multiple users can join a session and collaborate live.</li>
    <li><strong>Real-Time Sync</strong>: Code changes are instantly shared among active users.</li>
    <li><strong>User Identification</strong>: Each collaborator can set a unique username.</li>
</ul>

<h3>Online Compiler</h3>
<ul>
    <li><strong>Multi-Language Support</strong>: Compile and run code in various languages using JDoodle API.</li>
    <li><strong>Instant Output</strong>: Get real-time output or error messages.</li>
    <li><strong>Code Versioning</strong>: Access prior code versions within a session.</li>
</ul>

<h2 id="technologies-used">3. Technologies Used</h2>
<table>
    <tr><th>Technology</th><th>Description</th></tr>
    <tr><td>React</td><td>Front-end framework for building user interfaces.</td></tr>
    <tr><td>CSS</td><td>Styling and layout.</td></tr>
    <tr><td>Socket.IO</td><td>Enables real-time, bidirectional communication between client and server.</td></tr>
    <tr><td>Node.js</td><td>Server environment and real-time handling.</td></tr>
    <tr><td>Express.js</td><td>Backend framework for handling API requests and server logic.</td></tr>
    <tr><td>JDoodle API</td><td>Compiling and running code across different languages.</td></tr>
</table>

<h2 id="supported-languages">4. Supported Languages</h2>
<p>DevSync supports various programming languages to enhance collaboration, including:</p>
<ul>
    <li>JavaScript</li>
    <li>Python</li>
    <li>Java</li>
    <li>C++</li>
    <li>Ruby</li>
    <li>PHP</li>
    <li>Go</li>
</ul>

<h2 id="getting-started">5. Getting Started</h2>
<h3>Prerequisites</h3>
<ul>
    <li>Node.js (version &gt;= 14)</li>
</ul>

<h3>Installation</h3>
<ol>
    <li>Clone the Repository:
        <pre><code>git clone https://github.com/yourusername/devsync.git
cd devsync
</code></pre></li>
    <li>Install Dependencies:
        <pre><code>npm install</code></pre></li>
    <li>Run the Server:
        <pre><code>npm start</code></pre></li>
</ol>
<p>Open <code>http://localhost:3000</code> to start using DevSync locally.</p>

<h2 id="project-structure">6. Project Structure</h2>
<p>DevSync is organized into <code>client/</code> and <code>server/</code> directories:</p>
<ul>
    <li><strong>client/</strong>: Contains the React front-end.</li>
    <li><strong>server/</strong>: Contains the Express.js backend and Socket.IO integration.</li>
</ul>



<h2 id="real-time-collaboration">7. Real-Time Collaboration</h2>
<p>DevSync uses <strong>Socket.IO</strong> to enable real-time code collaboration with minimal delay. Users can:</p>
<ul>
    <li>Edit code collaboratively</li>
    <li>View other users' cursor positions</li>
    <li>Chat with other participants (optional)</li>
</ul>

<h2 id="online-compiler">8. Online Compiler</h2>
<p>The JDoodle API processes code submitted by users and sends real-time output or error feedback back to the client.</p>





</body>
</html>
