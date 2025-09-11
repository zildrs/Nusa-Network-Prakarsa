import {
  Camera,
  CloudMonitoring,
  ContentDeliveryNetwork,
  DataBackup,
  Datastore,
  IbmCloudHpc,
  RainScattered,
  TemperatureWater,
  Tsunami,
  WaveDirection,
  WaveHeight,
  WavePeriod,
} from "@carbon/icons-react";
export type Solution =
  | "data-center"
  | "managed-services"
  | "security-infrastructure"
  | "network-infrastructure"
  | "internet-of-things";

export type SolutionData = {
  title: string;
  hero_title: string;
  hero_subtitle: string;
  hero_img: string;
  hero_cta: string;
  hero_cta_link: string;
  what_we_do_title: string;
  what_we_do_subtitle: string;
  what_we_do_img: string;
  service_title: string;
  services: {
    title: string;
    icon: React.ElementType;
    description: string;
  }[];
  cta_title: string;
  cta_subtitle: string;
  cta_text: string;
  cta_link: string;
};

export const solutions: Record<Solution, SolutionData> = {
  ["data-center"]: {
    title: "Data Center",
    hero_title: "Modern, Secure, and Scalable Data Center Solutions",
    hero_subtitle:
      "Empower your business with enterprise-grade data center solutions, 24/7 uptime, and expert support — all tailored to your needs",
    hero_img: "/data-center.jpg",
    hero_cta: "Schedule Free Consultation",
    hero_cta_link: "/",
    what_we_do_title: "Reliable. Scalable. Always On.",
    what_we_do_subtitle:
      "From secure colocation and cloud-ready hosting to disaster recovery and 24/7 monitoring, our solutions are tailored to ensure uptime, compliance, and total peace of mind. Backed by certified experts and advanced infrastructure, we help you stay online, connected, and future-ready.",
    what_we_do_img: "/data-center.jpg",
    service_title: "Solutions that fit your infrastructure needs",
    services: [
      {
        title: "Colocation Services",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Private Cloud & Virtualization",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Disaster Recovery",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Data Backup & Storage Solutions",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Redundancy & Load Balancing",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Managed Server Hosting",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Let's Build Your Resilient IT Backbone Today",
    cta_subtitle: "",
    cta_text: "Schedule Free Consultation",
    cta_link: "/",
  },
  ["managed-services"]: {
    title: "Managed Services",
    hero_title: "All-in-One IT Care for Your Business",
    hero_subtitle:
      "Comprehensive IT solutions to keep your business ahead in the digital era",
    hero_img: "/hero.png",
    hero_cta: "Schedule Free Consultation",
    hero_cta_link: "/contact",
    what_we_do_title: "IT Solutions, Managed for You",
    what_we_do_subtitle:
      "We take care of monitoring, optimization, security, cloud, and recovery. Keeping your IT smooth, safe, and cost-effective. So you can focus on what matters most: your business.",
    what_we_do_img: "/managed-services.jpg",
    service_title: "Solutions that fit your business needs",
    services: [
      {
        title: "IT Monitoring & Maintenance",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Operation Center",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Security Operation Center",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "IT Helpdesk",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "VAPT",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Engineer On Site",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "IT Solutions, Managed for You",
    cta_subtitle:
      "Focus on growing your business while we take care of monitoring, securing, and optimizing your IT.",
    cta_text: "Schedule Free Consultation",
    cta_link: "/contact",
  },
  ["security-infrastructure"]: {
    title: "Security",
    hero_title:
      "Comprehensive Security Solution for Your Digital Infrastructure",
    hero_subtitle:
      "From endpoints to cloud, Nusa Network delivers comprehensive, enterprise-grade security solutions to protect your business in real time.",
    hero_img: "/security-infrastructure.png",
    hero_cta: "Schedule a Free Consultation",
    hero_cta_link: "/contact",
    what_we_do_title:
      "Protecting Every Layer of Your IT Infrastructure with Expert Precision",
    what_we_do_subtitle:
      "Our solutions are designed to proactively defend your network, users, data, and infrastructure from evolving threats. From advanced firewalls and secure cloud access to real-time threat detection and compliance enforcement, we integrate security into every layer of your technology stack.",
    what_we_do_img: "/security.jpg",
    service_title: "Solutions that fit your infrastructure needs",
    services: [
      {
        title: "Network Security",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Endpoint Protection",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Email & Web Security",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Cloud Security",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Security Operations",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Compliance & Audit",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Ready to Secure Your Business?",
    cta_subtitle:
      "Get a free security assessment or consultation from our certified engineers today.",
    cta_text: "Schedule Free Consultation",
    cta_link: "/contact",
  },
  ["network-infrastructure"]: {
    title: "Network Infrastructure",
    hero_title: "Build a Smarter, Faster and Secure Network Infrastructure.",
    hero_subtitle:
      "Future-proof your operations with tailored network design, implementation, and management — delivered by experts you can trust.",
    hero_img: "/network-infrastructure.jpg",
    hero_cta: "Schedule Free Consultation",
    hero_cta_link: "/contact",
    what_we_do_title: "Build a Future-Ready Network Today",
    what_we_do_subtitle:
      "Our expert team works with you to design, deploy, and manage end-to-end infrastructures tailored to your business needs — ensuring maximum uptime, optimal performance, and secure operations at every stage. ",
    what_we_do_img: "/network.jpg",
    service_title: "Solutions that empower your network",
    services: [
      {
        title: "LAN/WAN Design and Deployment",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "SD-WAN Solutions",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Wireless Network Solutions",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Security Integration",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Data Center Networking",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Cloud & Hybrid Connectivity",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Ready to Upgrade Your Network?",
    cta_subtitle:
      "Talk to our network engineers today and discover how we can architect your next-gen infrastructure.",
    cta_text: "Schedule Free Consultation",
    cta_link: "/contact",
  },
  ["internet-of-things"]: {
    title: "IOT",
    hero_title: "Unlock the Power of IoT for Your Business",
    hero_subtitle:
      "From IoT device management and data analytics to security and network infrastructure, our team of experts is dedicated to helping you unlock the full potential of IoT for your business.",
    hero_img: "/iot.png",
    hero_cta: "Visit NADA Website",
    hero_cta_link: "https://www.nada.org/",
    what_we_do_title:
      "Smarter, Integrated Solutions for Real-Time Ecosystem Observation",
    what_we_do_subtitle:
      "NADA delivers intelligent system solutions designed to simplify and enhance the way we monitor and understand our environment. Whether for smart cities, industrial sites, or natural resource management, NADA empowers decision-makers with accurate, actionable data through a secure, user-friendly platform.",
    what_we_do_img: "/iot-tools.png",
    service_title: "Services that help you unlock the power of IoT",
    services: [
      {
        title: "Wave Monitor",
        icon: WavePeriod,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Time-lapse Camera",
        icon: Camera,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Water Quality Monitor",
        icon: TemperatureWater,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Currents Monitor",
        icon: WaveHeight,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Weather Monitor",
        icon: RainScattered,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Water Level Monitor",
        icon: WaveDirection,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Make Better Environmental Decisions",
    cta_subtitle:
      "NADA empowers you to make informed decisions through smarter, connected monitoring systems. Start transforming your ecosystem today.",
    cta_text: "Schedule Free Consultation",
    cta_link: "/contact",
  },
};
