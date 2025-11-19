import { Logo } from "@/once-ui/components";

const person = {
  firstName: "DDOOR",
  lastName: "",
  get name() {
    return this.firstName;
  },
  role: "Door Manufacturer",
  avatar: "/images/logo.jpg",
  email: "contact@ddoor.com",
  location: "Asia/Jakarta",
};

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} - Premium Door Solutions`,
  description: `Leading manufacturer of high-quality doors and door solutions`,
  headline: <>Crafting Excellence in Every Door</>,
  featured: {
    display: false,
    title: "",
    href: "",
  },
  subline: (
    <>
      Welcome to DDOOR, where we combine innovative design with superior craftsmanship
      to create doors that define spaces and enhance security.
    </>
  ),
};

const aboutUs = {
  path: "/about",
  label: "About Us",
  title: `About – ${person.name}`,
  description: `Learn about DDOOR's commitment to quality and innovation`,
  intro: {
    display: true,
    title: "About Us",
    description: (
      <>
        With over two decades of experience, DDOOR has been at the forefront of door manufacturing,
        delivering exceptional quality and innovative designs to homes and businesses worldwide.
        Our commitment to excellence and attention to detail ensures that every door we create
        meets the highest standards of quality and security.
      </>
    ),
  },
};

const products = {
  path: "/products",
  label: "Products",
  title: "Our Products",
  description: "Explore our range of premium doors",
  categories: [
    {
      title: "Interior Doors",
      description: "Elegant solutions for your indoor spaces",
      items: [
        "Wooden Panel Doors",
        "Glass Doors",
        "Sliding Doors",
        "Pocket Doors"
      ]
    },
    {
      title: "Exterior Doors",
      description: "Durable and secure entrance solutions",
      items: [
        "Security Doors",
        "Weather-resistant Doors",
        "Grand Entrances",
        "Storm Doors"
      ]
    },
    {
      title: "Specialty Doors",
      description: "Custom solutions for unique needs",
      items: [
        "Fire-rated Doors",
        "Soundproof Doors",
        "Smart Doors",
        "Custom Designs"
      ]
    }
  ]
};

const brands = {
  path: "/brands",
  label: "Collections",
  title: "Our Collections",
  description: "Discover our exclusive door collections",
  collections: [
    {
      name: "Premium Series",
      description: "Luxury doors with premium finishes and materials"
    },
    {
      name: "Classic Series",
      description: "Timeless designs for traditional homes"
    },
    {
      name: "Modern Series",
      description: "Contemporary doors for modern spaces"
    },
    {
      name: "Smart Series",
      description: "Technology-integrated door solutions"
    }
  ]
};

const contact = {
  path: "/contact",
  label: "Contact Us",
  title: "Contact DDOOR",
  description: "Get in touch with our door experts",
  email: person.email,
  phone: "+1-234-567-8900",
  address: "123 Door Street, Design District",
  showroom: {
    title: "Visit Our Showroom",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    appointment: "Schedule a consultation with our experts"
  }
};

export { person, home, aboutUs, products, brands, contact };
