// Single source of content for the site.
// Everything here is taken from the academic CV (latexcode.txt / shafayetsadik_CV_Academic.pdf).
// Inline **double asterisks** mark bold text and are rendered by `rich()` in src/lib/rich.ts.

export const profile = {
  name: 'Shafayet Sadik Sowad',
  initials: 'SS',
  role: 'Systems Engineer',
  company: 'ANTS Drone Hub',
  tagline:
    'Systems Engineer specializing in autonomous drones, embedded hardware, and multi-domain system integration.',
  summary:
    'EEE graduate and Systems Engineer specializing in autonomous drones, embedded hardware, and multi-domain system integration. Experienced in applying machine learning to wireless communication and UAV systems. Adept at bridging hardware and software, with a strong research drive and commitment to collaboration.',
  email: 'shafayetsadik@iut-dhaka.edu',
  phone: '+8801780622406',
  phoneDisplay: '+880 1780-622406',
  github: 'https://github.com/ShafayetSadik',
  githubHandle: 'ShafayetSadik',
  linkedin: 'https://www.linkedin.com/in/shafayet-sadik-sowad-ab61a2226/',
  cvFile: 'Shafayet_Sadik_Sowad_CV.pdf',
  // Drop a photo into src/assets/ and point this at it, e.g. 'headshot.jpg'.
  photo: null as string | null,
};

export const focusAreas = [
  'Autonomous UAV Inspection',
  'Path Planning',
  'UAV Photogrammetry & 3D Reconstruction',
  'Machine Learning for Aerial Perception',
  'Digital Twins',
];

export const highlights = [
  { value: 4, decimals: 0, prefix: '', suffix: '', label: 'Peer-reviewed publications' },
  { value: 100, decimals: 0, prefix: '~', suffix: ' km²', label: 'Mapped by agricultural drone survey' },
  { value: 8, decimals: 0, prefix: '', suffix: '', label: 'Engineering projects' },
  { value: 3.64, decimals: 2, prefix: '', suffix: '', label: 'CGPA, B.Sc. in EEE' },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  points: string[];
};

export const experience: Job[] = [
  {
    company: 'ANTS Drone Hub',
    role: 'Systems Engineer',
    period: 'Oct 2025 — Present',
    current: true,
    points: [
      'Built a **drone-based window view simulation workflow** for real estate, with **facade viewpoint generation**, a **custom path planner** for drones, and a **Gazebo** simulator.',
      'Developed software converting **UAV photogrammetry** into OGC 3D Tiles for a Three.js web-based **digital twin viewer**.',
      'Worked on **aerial thermography**, capturing IR images with drones to identify hotspots on solar panels using **ML pipelines**.',
      'Developed **swarm drone systems** with synchronized flight control and formation execution, including a **custom light show designer**.',
      'Planned and led **agricultural drone spray operations** and field testing for precision mapping and autonomous flight missions.',
      'Performed **agricultural drone mapping** over approximately 100 sq. km for survey and planning applications.',
      'Designed circuit schematics and PCBs, including custom library development, filtering, redundancy, and signal integrity practices.',
    ],
  },
  {
    company: 'Cybernetics Hi-Tech Solutions (Pvt.) Ltd.',
    role: 'R&D Engineer Intern',
    period: 'Jun 2024 — Oct 2025',
    points: [
      '**Selected motors and rotary actuators** based on mechanical and electrical requirements, including speed, torque, gearbox selection, and **datasheet analysis**.',
      'Worked on **drone communication systems**, studying **SBUS, UART, USB, and MAVLink**-based data transfer.',
      'Contributed to **circuit design and schematic** development.',
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  // Optional image file name in src/assets/projects/ (added later).
  image?: string;
};

const repo = 'https://github.com/ShafayetSadik/Projects/tree/main/';

export const projects: Project[] = [
  {
    title: 'Mars Rover',
    description:
      'Developed electrical systems and custom PCBs, integrating autonomous navigation and communication systems.',
    tags: ['PCB Design', 'Autonomy', 'Comms'],
    url: repo + 'Mars%20Rover',
  },
  {
    title: 'Autonomous SLAM Drone',
    description:
      'Built around a Pixhawk, Raspberry Pi, Intel RealSense D435 and an optical flow sensor.',
    tags: ['SLAM', 'Pixhawk', 'RealSense'],
    url: repo + 'Autonomous%20SLAM%20Drone',
  },
  {
    title: 'Underwater ROV Design',
    description:
      'Designed and integrated sensor, power, and communication systems, supporting reliable control and data transmission.',
    tags: ['Power', 'Sensors', 'Comms'],
    url: repo + 'Underwater%20ROV',
  },
  {
    title: 'Real-Time IoT Monitoring & Control System',
    description:
      'Integrates pH, ultrasonic and temperature sensors, an OLED display, SIM800L, DC and servo motors, and temperature control.',
    tags: ['IoT', 'GSM', 'Embedded'],
    url: repo + 'Remote%20Monitoring%20and%20Controlled%20Automated%20%20IoT%20System',
  },
  {
    title: 'LiPo 6S Battery Management System',
    description:
      'A 6S BMS built from analog components, including logic gates and op-amps, with Simulink simulation and a functional PCB.',
    tags: ['Analog', 'Simulink', 'PCB'],
    url: repo + 'Lipo%206s%20Battery%20Management%20System%20(BMS)',
  },
  {
    title: 'SAP-1 8-bit Computer',
    description:
      'A basic computer built from ICs, registers and flip-flops, simulated in Proteus and implemented on custom PCBs.',
    tags: ['Digital Logic', 'Proteus', 'PCB'],
    url: repo + 'SAP-1',
  },
  {
    title: '8051 Microcontroller Alarm Clock',
    description:
      'Assembly-coded alarm clock with real-time countdown, keypad interface, LCD, 7-segment displays and puzzle-solving functionality.',
    tags: ['8051', 'Assembly'],
    url: repo + 'Microcontroller%20(8051)%20based%20Digital%20Alarm%20Clock',
  },
  {
    title: 'Prosthetic Leg Gait Cycle Model',
    description:
      'A human leg gait cycle model built with neural networks and radial basis functions in Simulink.',
    tags: ['Simulink', 'Neural Networks'],
    url: repo + 'SIMULINK%20Model%20for%20a%20Prosthetic%20Leg%20Gait%20Cycle.',
  },
];

export type Publication = {
  authors: string;
  title: string;
  venue: string;
  details?: string;
  year: string;
  doi?: string;
  status?: string;
};

// The author's own name is wrapped in ** so it renders bold.
export const journalPapers: Publication[] = [
  {
    authors: 'M. M. S. Shafi, K. M. Istiaque, **S. S. Sowad**, and M. T. Kawser',
    title: 'Drive-Test-Based LTE Handover Dataset for Cellular Mobility Studies in Urban Bangladesh',
    venue: 'Data in Brief',
    details: 'Art. no. 113220',
    year: '2026',
    doi: '10.1016/j.dib.2026.113220',
  },
];

export const conferencePapers: Publication[] = [
  {
    authors: 'K. M. Istiaque, **S. S. Sowad**, M. M. S. Shafi, and M. T. Kawser',
    title: 'Reducing Handover and Ping-Pong Events in LTE Networks via Q-Learning and Subtractive Clustering',
    venue: '2025 8th International Seminar on Research of Information Technology and Intelligent Systems (ISRITI)',
    details: 'Yogyakarta, Indonesia',
    year: '2025',
    doi: '10.1109/ISRITI68345.2025.11393278',
  },
  {
    authors: 'K. M. Istiaque, M. M. S. Shafi, **S. S. Sowad**, and M. T. Kawser',
    title: 'Adaptive Handover Optimization in LTE: Comparative Evaluation of Fuzzy Logic and DQN',
    venue: '2025 IEEE Asia Pacific Conference on Wireless and Mobile (APWiMob)',
    details: 'Bali, Indonesia, pp. 198–204',
    year: '2025',
    doi: '10.1109/APWiMob67231.2025.11269172',
  },
  {
    authors: 'M. M. S. Shafi, K. M. Istiaque, **S. S. Sowad**, and M. T. Kawser',
    title: 'Handover Optimization in LTE Networks Using Contextual Bandit Reinforcement Learning and Real-World Data',
    venue: '2025 International Conference on Computer Engineering, Network, and Intelligent Multimedia (CENIM)',
    details: 'Surabaya, Indonesia, pp. 249–254',
    year: '2025',
    doi: '10.1109/CENIM67940.2025.11326341',
  },
];

export const underReview: Publication[] = [
  {
    authors: 'M. M. S. Shafi, K. M. Istiaque, T. S. Ahona, **S. S. Sowad**, and M. T. Kawser',
    title:
      'Triplet-Loss-Driven Contrastive Autoencoding for Anomaly-Based Handover Prediction Using Drive-Test Data in Dynamic Cellular Environment',
    venue: 'Ad Hoc Networks (Elsevier)',
    year: 'Submitted',
    status: 'Under review',
  },
];

export const dataset = {
  title: 'Drive-Test-Based LTE Handover Dataset for Cellular Mobility Studies in Urban Bangladesh',
  description:
    'Open LTE drive-test dataset collected in urban Dhaka, with timestamped RSRP, RSRQ, CINR, velocity, and cell-level measurements in raw and ML-ready formats.',
  url: 'https://data.mendeley.com/datasets/n2pvmtyn2j/1',
  host: 'Mendeley Data',
};

export const skills = [
  {
    group: 'Robotics & Autonomy',
    items: ['ROS 2', 'SLAM', 'Linux', 'Kinematics', 'Gazebo', 'PX4 / ArduPilot', 'MAVLink', 'OpenCV'],
  },
  {
    group: 'Programming & ML',
    items: ['Python', 'C / C++', 'MATLAB', 'Git', 'TensorFlow', 'Reinforcement Learning', 'LaTeX'],
  },
  {
    group: 'Embedded & Communications',
    items: ['STM32', 'ESP32', 'Raspberry Pi', 'PlatformIO', 'SBUS', 'UART', 'UDP'],
  },
  {
    group: 'Circuit Design & VLSI',
    items: ['Cadence Virtuoso', 'Proteus', 'Simulink', 'PSpice', 'Fusion 360', 'KiCad', 'Altium'],
  },
  {
    group: 'Software Development',
    items: ['Three.js', 'FastAPI', 'REST APIs', 'Docker', 'Webhooks'],
  },
  {
    group: 'Spatial Analysis',
    items: ['QGIS', 'Agisoft Metashape'],
  },
];

export const education = {
  school: 'Islamic University of Technology (IUT)',
  degree: 'B.Sc. in Electrical and Electronic Engineering',
  date: 'October 2025',
  cgpa: '3.64 / 4.00',
  thesis: {
    title:
      'Machine Learning-Driven Handover Optimization in LTE Networks: Quality Signal Indicator, Classifier-Based Prediction Analysis and Hybrid Q-Learning',
    url: 'https://github.com/ShafayetSadik/thesis',
    summary:
      'Conducted a drive-test-based study of LTE networks in Dhaka to build a real-world dataset focused on signal quality indicators for handover analysis. Developed machine learning and hybrid Q-learning frameworks to predict and optimize handover decisions.',
  },
};

export const ielts = {
  test: 'IELTS Academic',
  body: 'British Council',
  overall: 7.5,
  bands: [
    { skill: 'Listening', score: 7.5 },
    { skill: 'Reading', score: 7.0 },
    { skill: 'Writing', score: 6.5 },
    { skill: 'Speaking', score: 8.0 },
  ],
};

export const leadership = [
  { role: 'Team Lead', org: 'Project Aero', note: 'Drone Project', period: 'Jun 2024 — Oct 2025' },
  { role: 'Vice Chair', org: 'IEEE RAS IUT Student Branch Chapter', period: 'Jun 2024 — Oct 2025' },
  { role: 'Head of Operations', org: 'IUT Robotics Society', period: 'Aug 2024 — Oct 2025' },
  { role: 'Senior Electrical Executive', org: 'Project Altair', note: 'Mars Rover', period: 'Jun 2023 — Oct 2025' },
  { role: 'Head of PCB', org: 'Accelerate', note: 'Inter-University PCB Design Competition', period: 'Jul 2024' },
];

export const awards = [
  { result: '2nd Place', team: 'Project Aqua', event: 'Underwater Vehicle Design Challenge 2023', place: 'IIT Guwahati, India' },
  { result: '6th Place · ABEX Task Winner', team: 'Project Altair', event: 'International Rover Challenge 2024', place: 'Coimbatore, India' },
  { result: 'Top 12 Finalist', team: 'Project Aero', event: 'International Space Drone Challenge 2024', place: 'India' },
  { result: '18th Place', team: 'Project Altair', event: 'University Rover Challenge 2025', place: 'USA' },
];

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
