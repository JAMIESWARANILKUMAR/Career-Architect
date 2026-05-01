export interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const dailyChallenges: Question[] = [
  {
    id: '1',
    question: "What is a 'Deadlock' in Operating Systems?",
    options: [
      "A situation where two or more processes are blocked forever",
      "A way to speed up process execution",
      "A type of security lock on files",
      "When a program crashes due to lack of RAM"
    ],
    correct: 0,
    explanation: "Deadlock occurs when processes hold resources and wait for others held by different processes, creating a cycle."
  },
  {
    id: '2',
    question: "In React, what is the purpose of 'useMemo' hook?",
    options: [
      "To memoize a value and prevent expensive recalculations",
      "To store state across page refreshes",
      "To directly manipulate the DOM",
      "To create a new component"
    ],
    correct: 0,
    explanation: "useMemo returns a memoized value that only changes when one of its dependencies has changed."
  },
  {
    id: '3',
    question: "Which data structure uses the 'Last In, First Out' (LIFO) principle?",
    options: [
      "Queue",
      "Stack",
      "Linked List",
      "Binary Tree"
    ],
    correct: 1,
    explanation: "A stack follows LIFO where the last element added is the first one to be removed."
  },
  {
    id: '4',
    question: "What does the 'ACID' acronym stand for in database transactions?",
    options: [
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Completeness, Integrity, Density",
      "Access, Control, Information, Data",
      "Area, Core, Index, Distribution"
    ],
    correct: 0,
    explanation: "ACID properties ensure that database transactions are processed reliably."
  },
  {
    id: '5',
    question: "In System Design, what is 'Horizontal Scaling'?",
    options: [
      "Adding more power (CPU/RAM) to an existing machine",
      "Adding more machines to your pool of resources",
      "Optimizing the code to run faster",
      "Changing the database schema"
    ],
    correct: 1,
    explanation: "Horizontal scaling (scaling out) means adding more nodes (servers) to the system."
  },
  {
    id: '6',
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correct: 2,
    explanation: "A balanced BST allows for logarithmic search time because it splits the search space in half at each step."
  },
  {
    id: '7',
    question: "Which HTTP status code represent a 'Forbidden' access?",
    options: [
      "401",
      "403",
      "404",
      "500"
    ],
    correct: 1,
    explanation: "403 Forbidden means the server understood the request but refuses to authorize it."
  },
  {
    id: '8',
    question: "What is 'Tree Shaking' in JavaScript development?",
    options: [
      "Removing unused code from final bundles",
      "A method of sorting binary trees",
      "Debugging tool for deep nested objects",
      "Automatic documentation generator"
    ],
    correct: 0,
    explanation: "Tree shaking is a form of dead code elimination commonly used in bundlers like Webpack or Vite."
  },
  {
    id: '9',
    question: "In CSS, what is the difference between 'visibility: hidden' and 'display: none'?",
    options: [
      "No difference",
      "visibility: hidden hides the element but keeps its space; display: none removes it from layout",
      "display: none keeps the space; visibility: hidden removes it",
      "display: none only works on mobile devices"
    ],
    correct: 1,
    explanation: "visibility: hidden keeps the element's box in the flow, while display: none removes it entirely."
  },
  {
    id: '10',
    question: "What is the primary use of a 'Redis' database?",
    options: [
      "Storing large video files",
      "In-memory data structure store, used as cache and message broker",
      "Relational data storage for financial reports",
      "Running machine learning models"
    ],
    correct: 1,
    explanation: "Redis is known for its high performance and versatility as an in-memory storage system."
  },
  {
    id: '11',
    question: "What is 'Currying' in Functional Programming?",
    options: [
      "Translating a function with multiple arguments into a sequence of functions with one argument",
      "A way to encrypt data in memory",
      "Type of error handling in Node.js",
      "Optimizing database queries"
    ],
    correct: 0,
    explanation: "Currying allows you to partially apply arguments to a function."
  },
  {
    id: '12',
    question: "Which of the following is NOT a valid Git command?",
    options: [
      "git push",
      "git commit",
      "git save",
      "git fetch"
    ],
    correct: 2,
    explanation: "Git uses 'add' and 'commit' to save changes; 'git save' is not a standard command (though 'stash' exists)."
  },
  {
    id: '13',
    question: "What is a 'CDN' (Content Delivery Network)?",
    options: [
      "A centralized server for all web traffic",
      "A geographically distributed network of servers to deliver content faster",
      "A tool to compress images automatically",
      "A database management system"
    ],
    correct: 1,
    explanation: "CDNs improve loading speeds by serving content from servers closest to the user."
  },
  {
    id: '14',
    question: "In TypeScript, what does the 'unknown' type represent?",
    options: [
      "A value that can be anything, but requires type checking before use",
      "The same as 'any', but faster",
      "A value that can never occur",
      "An alias for 'string | number'"
    ],
    correct: 0,
    explanation: "'unknown' is the type-safe sibling of 'any'. You must narrow the type before performing operations on it."
  },
  {
    id: '15',
    question: "What is the 'Box Model' in CSS?",
    options: [
      "The hierarchy of div elements",
      "Content, Padding, Border, and Margin surrounding an element",
      "A workflow for designing buttons",
      "The way flexbox items grow"
    ],
    correct: 1,
    explanation: "The CSS box model describes the rectangular boxes generated for elements in the document tree."
  },
  {
    id: '16',
    question: "What is a 'JWT' used for?",
    options: [
      "Securely transmitting information between parties as a JSON object",
      "JavaScript Web Testing",
      "Joining Web Tunnels",
      "Database indexing"
    ],
    correct: 0,
    explanation: "JSON Web Tokens are commonly used for authentication and information exchange."
  },
  {
    id: '17',
    question: "What is the purpose of 'Docker'?",
    options: [
      "To monitor CPU usage",
      "To containerize applications and their dependencies",
      "To write unit tests",
      "To manage cloud billings"
    ],
    correct: 1,
    explanation: "Docker allows developers to package applications into standardized units called containers."
  },
  {
    id: '18',
    question: "Which algorithm is commonly used for finding shortest paths in a graph?",
    options: [
      "Dijkstra's Algorithm",
      "Merge Sort",
      "Binary Search",
      "K-Means Clustering"
    ],
    correct: 0,
    explanation: "Dijkstra's algorithm finds the shortest path between nodes in a graph with non-negative edge weights."
  },
  {
    id: '19',
    question: "What does 'Hydration' mean in the context of SSR (Server Side Rendering)?",
    options: [
      "Drinking water while coding",
      "Making static HTML interactive by attaching event listeners in the browser",
      "Compressing files on the server",
      "Updating the database with fresh data"
    ],
    correct: 1,
    explanation: "Hydration is the process of client-side JavaScript taking over static HTML sent by the server."
  },
  {
    id: '20',
    question: "What is 'Memoization'?",
    options: [
      "A technique to speed up programs by storing results of expensive function calls",
      "Learning code by heart",
      "Writing comments in code",
      "Type of variable declaration"
    ],
    correct: 0,
    explanation: "Memoization stores pre-computed values to avoid repeating the same calculations."
  },
  {
    id: '21',
    question: "What is the difference between 'throttle' and 'debounce'?",
    options: [
      "They are the same",
      "Throttle limits executions over time; Debounce waits for a period of inactivity before executing",
      "Throttle is for CSS; Debounce is for JS",
      "Debounce is faster than Throttle"
    ],
    correct: 1,
    explanation: "Throttling ensures a function runs at most once in a given interval, while debouncing ensures it runs only after a burst of events."
  },
  {
    id: '22',
    question: "Which of these is a 'Non-Relational' (NoSQL) database?",
    options: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Oracle DB"
    ],
    correct: 2,
    explanation: "MongoDB is a document-oriented NoSQL database that stores data in JSON-like format."
  },
  {
    id: '23',
    question: "What is 'Cross-Site Scripting' (XSS)?",
    options: [
      "A way to share scripts between websites",
      "A security vulnerability where an attacker injects malicious scripts into web pages",
      "A framework for cross-platform development",
      "A CSS technique for multi-site styling"
    ],
    correct: 1,
    explanation: "XSS occurs when untrusted data is sent to a web browser without proper validation or escaping."
  },
  {
    id: '24',
    question: "What is 'Event Delegation' in JavaScript?",
    options: [
      "Assigning event listeners to parent elements instead of multiple children",
      "Passing events to a different browser tab",
      "A way to delete event listeners",
      "Running events in a background thread"
    ],
    correct: 0,
    explanation: "Event delegation leverages event bubbling to manage events at a higher level in the DOM."
  },
  {
    id: '25',
    question: "What is the 'Virtual DOM'?",
    options: [
      "A 3D representation of your website",
      "A lightweight copy of the real DOM used for performance optimization in libraries like React",
      "A tool to preview websites on VR headsets",
      "The DOM inside an iframe"
    ],
    correct: 1,
    explanation: "The Virtual DOM allows libraries to determine minimal changes needed to update the UI efficiently."
  },
  {
    id: '26',
    question: "What is 'Polyfill'?",
    options: [
      "A type of foam used in server rooms",
      "A piece of code used to provide modern functionality on older browsers",
      "A CSS property for gradients",
      "A database backup strategy"
    ],
    correct: 1,
    explanation: "Polyfills implement features that are missing in certain browser environments."
  },
  {
    id: '27',
    question: "What is 'Type Inference' in TypeScript?",
    options: [
      "Manually declaring every type",
      "The compiler automatically figuring out types based on assigned values",
      "Converting strings to numbers automatically",
      "Testing types at runtime"
    ],
    correct: 1,
    explanation: "TypeScript can often guess the type of a variable without explicit annotations."
  },
  {
    id: '28',
    question: "Which is a 'GraphQL' characteristic?",
    options: [
      "It only works with SQL databases",
      "It allows clients to request exactly the data they need and nothing more",
      "It uses REST endpoints for everything",
      "It is a new programming language like Java"
    ],
    correct: 1,
    explanation: "GraphQL provides a more efficient, powerful and flexible alternative to REST."
  },
  {
    id: '29',
    question: "What is 'CSRF' (Cross-Site Request Forgery)?",
    options: [
      "An attack that forces an authenticated user to execute unwanted actions",
      "A way to share resources between domains",
      "A CSS framework for responsive design",
      "Configuring server-side routing"
    ],
    correct: 0,
    explanation: "CSRF tricks the browser into sending a request to a site where the user is already authenticated."
  },
  {
    id: '30',
    question: "What is 'Microservices Architecture'?",
    options: [
      "A single large codebase for everything",
      "Structuring an application as a collection of small, independent services",
      "Using very small servers for hosting",
      "Writing code that only runs on mobile phones"
    ],
    correct: 1,
    explanation: "Microservices allow for better scalability and independent deployment of different system parts."
  },
  {
    id: '31',
    question: "What is 'Optimistic UI'?",
    options: [
      "An interface that looks very bright and colorful",
      "Updating the UI before the server confirms a successful operation",
      "A UI that works even when the server is down",
      "A design pattern for error messages"
    ],
    correct: 1,
    explanation: "Optimistic UI makes apps feel faster by assuming requests will succeed and updating immediately."
  },
  {
    id: '32',
    question: "What is the purpose of 'Kubernetes' (K8s)?",
    options: [
      "To write better JavaScript code",
      "To automate deployment, scaling, and management of containerized applications",
      "To manage CSS variables across projects",
      "To track user clicks on a website"
    ],
    correct: 1,
    explanation: "Kubernetes is an open-source system for automating containerized application management."
  },
  {
    id: '33',
    question: "What is 'Refactoring'?",
    options: [
      "Adding new features to an app",
      "Restructuring existing code without changing its external behavior",
      "Rewriting the whole app from scratch",
      "Moving code from one server to another"
    ],
    correct: 1,
    explanation: "Refactoring improves code quality, readability, and maintainability."
  },
  {
    id: '34',
    question: "In Node.js, what is the 'Event Loop'?",
    options: [
      "A way to repeat loops in JavaScript",
      "The mechanism that handles asynchronous operations and callbacks",
      "A tool to track mouse movements",
      "A security feature for servers"
    ],
    correct: 1,
    explanation: "The Event Loop allows Node.js to perform non-blocking I/O operations despite being single-threaded."
  },
  {
    id: '35',
    question: "What is 'Infrastructure as Code' (IaC)?",
    options: [
      "Building server rooms manually",
      "Managing and provisioning infrastructure through machine-readable definition files",
      "Writing code that runs inside cables",
      "Naming servers with code names"
    ],
    correct: 1,
    explanation: "IaC allows for consistent and repeatable infrastructure management."
  },
  {
    id: '36',
    question: "What is a 'Pure Function'?",
    options: [
      "A function that only uses prime numbers",
      "A function that returns the same output for the same input and has no side effects",
      "A function written in C++",
      "A function that doesn't use variables"
    ],
    correct: 1,
    explanation: "Pure functions are easy to test and reason about because they are predictable."
  },
  {
    id: '37',
    question: "In React, what are 'Fragments'?",
    options: [
      "Broken parts of a component",
      "A way to group multiple elements without adding extra nodes to the DOM",
      "Components that only render sometimes",
      "Pieces of the CSS box model"
    ],
    correct: 1,
    explanation: "Fragments (<> or <React.Fragment>) prevent unnecessary div wrappers in the HTML."
  },
  {
    id: '38',
    question: "What is 'Lighthouse' by Google?",
    options: [
      "A tool to find servers on a map",
      "An automated tool for improving the quality of web pages",
      "A plugin for dark mode",
      "A search engine for code"
    ],
    correct: 1,
    explanation: "Lighthouse audits performance, accessibility, SEO, and PWA features."
  },
  {
    id: '39',
    question: "What does 'SaaS' stand for?",
    options: [
      "Software as a Service",
      "Server as a System",
      "System as a Service",
      "Software as a Solution"
    ],
    correct: 0,
    explanation: "SaaS is a software licensing and delivery model in which software is licensed on a subscription basis."
  },
  {
    id: '40',
    question: "What is 'Responsive Design'?",
    options: [
      "An app that responds very fast to clicks",
      "A design approach that makes web pages look good on all devices and screen sizes",
      "A way to send automated responses to emails",
      "A coding style for accessibility"
    ],
    correct: 1,
    explanation: "Responsive design uses media queries and flexible layouts to adapt to different screen dimensions."
  },
  {
    id: '41',
    question: "What is 'Immutability' in programming?",
    options: [
      "When a value cannot be changed after it is created",
      "When a variable can be accessed from anywhere",
      "When a function runs forever",
      "When code is written in a permanent file"
    ],
    correct: 0,
    explanation: "Immutability helps prevent unintended side effects and state bugs."
  },
  {
    id: '42',
    question: "What is the purpose of 'PropTypes' in React?",
    options: [
      "To speed up rendering",
      "To document and validate component props during development",
      "To style components dynamically",
      "To manage global state"
    ],
    correct: 1,
    explanation: "PropTypes provide runtime warnings if expected props are missing or of the wrong type."
  },
  {
    id: '43',
    question: "What is 'Normalization' in databases?",
    options: [
      "Setting data to its normal values",
      "The process of organizing data to reduce redundancy and improve data integrity",
      "Scaling a database horizontally",
      "Standardizing table names"
    ],
    correct: 1,
    explanation: "Normalization involves dividing larger tables into smaller ones and defining relationships between them."
  },
  {
    id: '44',
    question: "What is an 'API Gateway'?",
    options: [
      "A portal for developers to read documentation",
      "A server that acts as an entry point for all API calls to your services",
      "A type of secure password",
      "The landing page for a web API"
    ],
    correct: 1,
    explanation: "API Gateways handle routing, composition, authentication, and rate limiting."
  },
  {
    id: '45',
    question: "What is 'Serverless Computing'?",
    options: [
      "Websites that run without servers",
      "A model where the cloud provider manages server allocation and execution",
      "Hosting files on a local computer only",
      "A way to build apps without any internet connection"
    ],
    correct: 1,
    explanation: "Serverless (like AWS Lambda or Vercel Functions) allows developers to focus on code rather than infrastructure."
  },
  {
    id: '46',
    question: "What is 'Semantic HTML'?",
    options: [
      "HTML that looks very beautiful",
      "Using HTML tags that clearly describe their meaning/purpose (e.g. <article>, <nav>)",
      "A way to write HTML in different languages",
      "HTML that uses AI for content"
    ],
    correct: 1,
    explanation: "Semantic HTML improves accessibility and SEO by providing structure to the content."
  },
  {
    id: '47',
    question: "What is 'Big O' Notation?",
    options: [
      "A way to name variables in large projects",
      "A mathematical notation describing the limiting behavior of an algorithm's performance/complexity",
      "The logo of a famous tech company",
      "A type of global object in JavaScript"
    ],
    correct: 1,
    explanation: "Big O helps developers compare the efficiency of different algorithms as input size grows."
  },
  {
    id: '48',
    question: "What is 'Shallow Comparison'?",
    options: [
      "A quick glance at the code",
      "Comparing objects only by their top-level properties/references",
      "Comparing only string lengths",
      "Checking if a number is small"
    ],
    correct: 1,
    explanation: "Shallow comparison doesn't check nested properties, making it faster but potentially less accurate for deep objects."
  },
  {
    id: '49',
    question: "What is 'Z-Index' in CSS?",
    options: [
      "The index of a letter in a string",
      "A property that controls the stack order of overlapping elements",
      "The speed of an animation",
      "The zoom level of a page"
    ],
    correct: 1,
    explanation: "Elements with higher z-index appear on top of elements with lower ones."
  },
  {
    id: '50',
    question: "What is 'Hot Module Replacement' (HMR)?",
    options: [
      "Switching hardware while the server is running",
      "Updating modules in a running application without a full page reload",
      "Repairing a computer in a cold room",
      "A way to speed up the computer fan"
    ],
    correct: 1,
    explanation: "HMR significantly improves developer experience by showing changes instantly without losing app state."
  },
  {
    id: '51',
    question: "What is 'OAuth'?",
    options: [
      "A programming language for security",
      "An open standard for access delegation (used for social logins)",
      "A way to encrypt hard drives",
      "A type of secure firewall"
    ],
    correct: 1,
    explanation: "OAuth allows websites to access user data from other services without sharing passwords."
  },
  {
    id: '52',
    question: "What is the 'Spread Operator' (...) in JavaScript?",
    options: [
      "A way to write comments",
      "A syntax to copy or expand arrays and objects",
      "An operator to delete properties",
      "A tool to align text"
    ],
    correct: 1,
    explanation: "Spread makes it easy to merge objects or pass array elements as separate arguments."
  },
  {
    id: '53',
    question: "What is 'Strict Mode' in JavaScript?",
    options: [
      "A way to force users to use modern browsers",
      "A variant of JavaScript that catches more errors and prevents use of 'unsafe' features",
      "A mode where you can't use semicolons",
      "A setting for high-performance servers"
    ],
    correct: 1,
    explanation: "Strict mode helps in writing 'cleaner' code and avoiding common mistakes."
  },
  {
    id: '54',
    question: "What is 'CI/CD'?",
    options: [
      "Code Inspection / Code Deployment",
      "Continuous Integration / Continuous Deployment (or Delivery)",
      "Computer Intelligence / Computer Design",
      "Checking Information / Correcting Data"
    ],
    correct: 1,
    explanation: "CI/CD automates the path from code check-in to production deployment."
  },
  {
    id: '55',
    question: "What is 'TDD' (Test-Driven Development)?",
    options: [
      "Testing the app after it is deployed",
      "Developing code by writing tests before writing the actual implementation",
      "Using AI to write tests",
      "Testing only the most difficult parts of code"
    ],
    correct: 1,
    explanation: "TDD leads to better design and high test coverage by making tests a core part of the cycle."
  },
  {
    id: '56',
    question: "What is a 'Web Worker'?",
    options: [
      "Someone who builds websites",
      "A JavaScript script that runs in the background, independent of the main UI thread",
      "A bot that crawls the web",
      "A tool to design layouts"
    ],
    correct: 1,
    explanation: "Web Workers allow for heavy processing without freezing the user interface."
  },
  {
    id: '57',
    question: "What is a 'Monolith'?",
    options: [
      "A large stone monument",
      "An application built as a single, unified unit",
      "A high-end server for databases",
      "A type of CSS framework"
    ],
    correct: 1,
    explanation: "Monoliths are simpler to develop initially but can become difficult to scale and maintain as they grow."
  },
  {
    id: '58',
    question: "What is 'SVG'?",
    options: [
      "Stable Vector Graphics",
      "Scalable Vector Graphics",
      "Simple Visual Graphic",
      "Standard Variable Group"
    ],
    correct: 1,
    explanation: "SVGs define graphics in XML format, making them resolution-independent and perfect for icons and logos."
  },
  {
    id: '59',
    question: "What is 'Flexbox'?",
    options: [
      "A flexible laptop for developers",
      "A CSS layout module for arranging items in rows or columns",
      "A type of relational database",
      "A state management library"
    ],
    correct: 1,
    explanation: "Flexbox provides a more efficient way to distribute space and align items in a container."
  },
  {
    id: '60',
    question: "What is 'WebAssembly' (Wasm)?",
    options: [
      "A new assembly language for CPUs",
      "A binary instruction format for a stack-based virtual machine, allowing near-native speed in browsers",
      "A protocol to connect servers",
      "A standard for web design"
    ],
    correct: 1,
    explanation: "Wasm allows languages like C++, Rust, and Go to run in the web browser at high performance."
  }
];
