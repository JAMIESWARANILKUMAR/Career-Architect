export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  url: string;
  score: number;
}

export const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Software Engineer Intern', company: 'Google', location: 'Bangalore / Remote', type: 'Full-time', salary: '₹80,000/mo', url: 'https://careers.google.com', score: 85 },
  { id: '2', title: 'Associate Data Scientist', company: 'NASSCOM', location: 'Delhi / Hybrid', type: 'Contract', salary: '₹12L - 15L PA', url: 'https://nasscom.in', score: 42 },
  { id: '3', title: 'Frontend Developer', company: 'LinkedIn', location: 'Remote', type: 'Full-time', salary: '₹15L - 25L PA', url: 'https://linkedin.com/jobs', score: 92 },
  { id: '4', title: 'Backend Developer (Go)', company: 'Zomato', location: 'Gurugram', type: 'Full-time', salary: '₹20L - 30L PA', url: 'https://zomato.com/careers', score: 78 },
  { id: '5', title: 'UX Designer', company: 'Swiggy', location: 'Bangalore', type: 'Full-time', salary: '₹18L - 24L PA', url: 'https://swiggy.com/careers', score: 65 },
  { id: '6', title: 'Full Stack Engineer', company: 'Razorpay', location: 'Remote', type: 'Full-time', salary: '₹25L - 40L PA', url: 'https://razorpay.com/jobs', score: 88 },
  { id: '7', title: 'DevOps Intern', company: 'AWS', location: 'Mumbai', type: 'Internship', salary: '₹60,000/mo', url: 'https://aws.amazon.com/careers', score: 72 },
  { id: '8', title: 'ML Researcher', company: 'Microsoft', location: 'Hyderabad', type: 'Full-time', salary: '₹35L+ PA', url: 'https://careers.microsoft.com', score: 55 },
  { id: '9', title: 'App Developer (React Native)', company: 'Ola', location: 'Bangalore', type: 'Full-time', salary: '₹15L - 22L PA', url: 'https://ola.com/careers', score: 81 },
  { id: '10', title: 'Security Analyst', company: 'Flipkart', location: 'Bangalore', type: 'Full-time', salary: '₹12L - 18L PA', url: 'https://flipkart.com/jobs', score: 49 },
  { id: '11', title: 'Product Manager', company: 'Paytm', location: 'Noida', type: 'Full-time', salary: '₹25L - 35L PA', url: 'https://paytm.com/careers', score: 62 },
  { id: '12', title: 'Cloud Architect', company: 'TCS', location: 'Remote', type: 'Full-time', salary: '₹22L - 30L PA', url: 'https://tcs.com/careers', score: 74 },
  { id: '13', title: 'Blockchain Dev', company: 'Polygon', location: 'Remote', type: 'Full-time', salary: '₹30L+ PA', url: 'https://polygon.technology/careers', score: 38 },
  { id: '14', title: 'QA Engineer', company: 'Infosys', location: 'Pune', type: 'Full-time', salary: '₹8L - 12L PA', url: 'https://infosys.com/careers', score: 91 },
  { id: '15', title: 'Graphic Designer', company: 'Canva', location: 'Remote', type: 'Contract', salary: '₹10L - 15L PA', url: 'https://canva.com/careers', score: 25 },
  { id: '16', title: 'React Expert', company: 'Vercel', location: 'Remote', type: 'Full-time', salary: '₹40L+ PA', url: 'https://vercel.com/jobs', score: 94 },
  { id: '17', title: 'Systems Programmer', company: 'Apple', location: 'Hyderabad', type: 'Full-time', salary: '₹30L+ PA', url: 'https://apple.com/careers', score: 68 },
  { id: '18', title: 'Growth Hacker', company: 'CRED', location: 'Bangalore', type: 'Full-time', salary: '₹20L - 28L PA', url: 'https://cred.club/careers', score: 53 },
  { id: '19', title: 'Data Engineer', company: 'Dunzo', location: 'Bangalore', type: 'Full-time', salary: '₹14L - 20L PA', url: 'https://dunzo.com/careers', score: 77 },
  { id: '20', title: 'UI Engineer', company: 'Uber', location: 'Bangalore', type: 'Full-time', salary: '₹28L - 45L PA', url: 'https://uber.com/careers', score: 89 },
  { id: '21', title: 'Site Reliability Engineer', company: 'Atlassian', location: 'Remote', type: 'Full-time', salary: '₹35L+ PA', url: 'https://atlassian.com/careers', score: 82 },
  { id: '22', title: 'HR Generalist', company: 'Meta', location: 'Remote', type: 'Full-time', salary: '₹15L - 22L PA', url: 'https://metacareers.com', score: 15 },
  { id: '23', title: 'Node.js Developer', company: 'Postman', location: 'Bangalore', type: 'Full-time', salary: '₹22L - 32L PA', url: 'https://postman.com/careers', score: 87 },
  { id: '24', title: 'iOS Developer', company: 'Byju\'s', location: 'Bangalore', type: 'Full-time', salary: '₹18L - 26L PA', url: 'https://byjus.com/careers', score: 64 },
  { id: '25', title: 'Technical Writer', company: 'GitHub', location: 'Remote', type: 'Full-time', salary: '₹12L - 18L PA', url: 'https://github.com/careers', score: 79 },
  { id: '26', title: 'Community Manager', company: 'Discord', location: 'Remote', type: 'Full-time', salary: '₹10L - 14L PA', url: 'https://discord.com/jobs', score: 32 },
  { id: '27', title: 'Ruby on Rails Senior', company: 'Shopify', location: 'Remote', type: 'Full-time', salary: '₹45L+ PA', url: 'https://shopify.com/careers', score: 44 },
  { id: '28', title: 'Rust Systems Dev', company: 'Cloudflare', location: 'Remote', type: 'Full-time', salary: '₹50L+ PA', url: 'https://cloudflare.com/careers', score: 58 },
  { id: '29', title: 'Video Editor', company: 'Netflix', location: 'Mumbai', type: 'Contract', salary: '₹25L+ PA', url: 'https://netflix.com/jobs', score: 12 },
  { id: '30', title: 'Project Coordinator', company: 'Google', location: 'Remote', type: 'Internship', salary: '₹50,000/mo', url: 'https://careers.google.com', score: 66 },
  { id: '31', title: 'Full Stack Engineer (MERN)', company: 'HCLTech', location: 'Noida', type: 'Full-time', salary: '₹6L - 10L PA', url: 'https://hcltech.com/careers', score: 83 },
  { id: '32', title: 'Cybersecurity Intern', company: 'Cisco', location: 'Bangalore', type: 'Internship', salary: '₹45,000/mo', url: 'https://cisco.com/careers', score: 71 },
  { id: '33', title: 'Database Admin', company: 'Oracle', location: 'Hyderabad', type: 'Full-time', salary: '₹15L - 22L PA', url: 'https://oracle.com/careers', score: 69 },
  { id: '34', title: 'Front End Specialist', company: 'Salesforce', location: 'Hyderabad', type: 'Full-time', salary: '₹28L+ PA', url: 'https://salesforce.com/careers', score: 90 },
  { id: '35', title: 'Mobile Analytics', company: 'Adjust', location: 'Remote', type: 'Full-time', salary: '₹20L - 30L PA', url: 'https://adjust.com/careers', score: 47 },
  { id: '36', title: 'Solutions Architect', company: 'IBM', location: 'Remote', type: 'Full-time', salary: '₹25L - 38L PA', url: 'https://ibm.com/careers', score: 75 },
  { id: '37', title: 'Junior Dev', company: 'Upstox', location: 'Mumbai', type: 'Full-time', salary: '₹10L - 15L PA', url: 'https://upstox.com/careers', score: 84 },
  { id: '38', title: 'Technical Sales', company: 'HubSpot', location: 'Remote', type: 'Full-time', salary: '₹12L - 20L PA', url: 'https://hubspot.com/careers', score: 28 },
  { id: '39', title: 'SEO Engineer', company: 'Figma', location: 'Remote', type: 'Full-time', salary: '₹35L+ PA', url: 'https://figma.com/careers', score: 52 },
  { id: '40', title: 'Kubernetes Admin', company: 'Red Hat', location: 'Remote', type: 'Full-time', salary: '₹30L+ PA', url: 'https://redhat.com/careers', score: 80 },
  { id: '41', title: 'Product Marketing', company: 'Notion', location: 'Remote', type: 'Full-time', salary: '₹25L+ PA', url: 'https://notion.so/careers', score: 18 },
  { id: '42', title: 'API Integration Specialist', company: 'Twilio', location: 'Remote', type: 'Full-time', salary: '₹38L+ PA', url: 'https://twilio.com/careers', score: 86 },
  { id: '43', title: 'Embedded Systems', company: 'Tesla', location: 'Remote', type: 'Full-time', salary: '₹55L+ PA', url: 'https://tesla.com/careers', score: 61 },
  { id: '44', title: 'Data Analyst', company: 'Lenskart', location: 'Delhi', type: 'Full-time', salary: '₹8L - 14L PA', url: 'https://lenskart.com/careers', score: 76 },
  { id: '45', title: 'Script Writer (AI)', company: 'OpenAI', location: 'Remote', type: 'Contract', salary: '$100/hr', url: 'https://openai.com/careers', score: 95 },
  { id: '46', title: 'Customer Support (Tech)', company: 'Stripe', location: 'Remote', type: 'Full-time', salary: '₹15L - 22L PA', url: 'https://stripe.com/careers', score: 41 },
  { id: '47', title: 'Staff Engineer', company: 'Pinterest', location: 'Remote', type: 'Full-time', salary: '₹60L+ PA', url: 'https://pinterest.com/careers', score: 73 },
  { id: '48', title: 'DevRel Manager', company: 'Prisma', location: 'Remote', type: 'Full-time', salary: '₹35L+ PA', url: 'https://prisma.io/jobs', score: 67 },
  { id: '49', title: 'Solidity Engineer', company: 'Ethereum', location: 'Remote', type: 'Full-time', salary: '₹80L+ PA', url: 'https://ethereum.org/careers', score: 35 },
  { id: '50', title: 'Core Maintainer', company: 'Meta', location: 'Remote', type: 'Full-time', salary: '₹70L+ PA', url: 'https://metacareers.com', score: 93 },
];
