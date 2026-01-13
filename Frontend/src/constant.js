// constant.js

export const users = [
  {
    id: "u1",
    name: "Vikram",
    email: "vikram@example.com",
    password: "hashed_password_123"
  },
  {
    id: "u2",
    name: "Arjun",
    email: "arjun@example.com",
    password: "hashed_password_456"
  },
  {
    id: "u3",
    name: "Sneha",
    email: "sneha@example.com",
    password: "hashed_password_789"
  }
];

export const gigs = [
  {
    id: "g1",
    title: "Build a Portfolio Website",
    description: "Need a responsive portfolio website using React",
    budget: 8000,
    ownerId: "u1",
    status: "open"
  },
  {
    id: "g2",
    title: "E-commerce Backend API",
    description: "Create REST APIs using Node.js and MongoDB",
    budget: 15000,
    ownerId: "u2",
    status: "assigned"
  },
  {
    id: "g3",
    title: "UI Design for Mobile App",
    description: "Design modern UI screens using Figma",
    budget: 6000,
    ownerId: "u3",
    status: "open"
  }
];

export const bids = [
  {
    id: "b1",
    gigId: "g1",
    freelancerId: "u2",
    message: "I can complete this within 5 days with clean UI.",
    status: "pending"
  },
  {
    id: "b2",
    gigId: "g1",
    freelancerId: "u3",
    message: "Experienced in React portfolios, ready to start.",
    status: "hired"
  },
  {
    id: "b3",
    gigId: "g2",
    freelancerId: "u1",
    message: "I have built similar APIs before.",
    status: "rejected"
  }
];
