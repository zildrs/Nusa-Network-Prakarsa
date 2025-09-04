import {
  CloudMonitoring,
  ContentDeliveryNetwork,
  DataBackup,
  Datastore,
  IbmCloudHpc,
  Tsunami,
} from "@carbon/icons-react";
import type { Route } from "../routes/+types/solutions-detail";
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
    title: "Security Infrastructure",
    hero_title: "Protect Your Business with Our Advanced Security Solutions",
    hero_subtitle:
      "From advanced threat detection and vulnerability assessments to security awareness training and managed security services, our team of security experts is dedicated to providing you with the most comprehensive and cost-effective security solutions.",
    hero_cta: "Get Started Today",
    hero_cta_link: "/",
    what_we_do_title: "Protecting Your Business from Cyber Threats",
    what_we_do_subtitle:
      "From advanced threat detection and vulnerability assessments to security awareness training and managed security services, our team of security experts is dedicated to providing you with the most comprehensive and cost-effective security solutions.",
    what_we_do_img: "/security-infrastructure.jpg",
    service_title: "Solutions that secure your business",
    services: [
      {
        title: "Advanced Threat Detection",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Vulnerability Assessment",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Security Awareness Training",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Managed Security Services",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Security",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Endpoint Security",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Protect Your Business from Cyber Threats",
    cta_subtitle: "",
    cta_text: "Schedule Free Consultation",
    cta_link: "/",
  },
  ["network-infrastructure"]: {
    title: "Network Infrastructure",
    hero_title: "Future-Proof Your Network with Our Expertise",
    hero_subtitle:
      "From network assessments and design to implementation and management, our team of network experts is dedicated to providing you with a reliable, scalable, and secure network infrastructure that meets your business needs.",
    hero_cta: "Discover How We Can Help You",
    hero_cta_link: "/",
    what_we_do_title:
      "Designing and Building Network Solutions for Your Business",
    what_we_do_subtitle:
      "From network assessments and design to implementation and management, our team of network experts is dedicated to providing you with a reliable, scalable, and secure network infrastructure that meets your business needs.",
    what_we_do_img: "/network-infrastructure.jpg",
    service_title: "Solutions that empower your network",
    services: [
      {
        title: "Network Assessment",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Design",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Implementation",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Management",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Network Security",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "Cloud Connectivity",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Future-Proof Your Network with Our Expertise",
    cta_subtitle: "",
    cta_text: "Schedule Free Consultation",
    cta_link: "/",
  },
  ["internet-of-things"]: {
    title: "Internet of Things (IoT)",
    hero_title: "Unlock the Power of IoT for Your Business",
    hero_subtitle:
      "From IoT device management and data analytics to security and network infrastructure, our team of experts is dedicated to helping you unlock the full potential of IoT for your business.",
    hero_cta: "Get Started Today",
    hero_cta_link: "/",
    what_we_do_title: "Solutions that empower your IoT strategy",
    what_we_do_subtitle:
      "From IoT device management and data analytics to security and network infrastructure, our team of experts is dedicated to helping you unlock the full potential of IoT for your business.",
    what_we_do_img: "/internet-of-things.jpg",
    service_title: "Services that help you unlock the power of IoT",
    services: [
      {
        title: "IoT Device Management",
        icon: Datastore,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "IoT Data Analytics",
        icon: IbmCloudHpc,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "IoT Security",
        icon: Tsunami,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "IoT Network Infrastructure",
        icon: DataBackup,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "IoT Consulting Services",
        icon: ContentDeliveryNetwork,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
      {
        title: "IoT Integration Services",
        icon: CloudMonitoring,
        description:
          "Lorem ipsum dolor sit amet dolor sit lorem ipsum secure colocation and cloud-ready",
      },
    ],
    cta_title: "Unlock the Power of IoT for Your Business",
    cta_subtitle: "",
    cta_text: "Schedule Free Consultation",
    cta_link: "/",
  },
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const slug = url.pathname.split("/").pop() as keyof typeof solutions;
  return { ...solutions[slug], slug };
}
