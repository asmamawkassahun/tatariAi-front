import { FileItem } from "./types/fileItem";

export const initialFiles: FileItem[] = [
  {
    name: "src",
    path: "src",
    content: "",
    language: "",
    type: "folder",
    children: [
      {
        name: "pages",
        path: "src/pages",
        content: "",
        language: "",
        type: "folder",
        children: [
          {
            name: "index.tsx",
            path: "src/pages/index.tsx",
            content: `import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;`,
            language: "typescript",
            type: "file",
          },
        ],
      },
      {
        name: "components",
        path: "src/components",
        content: "",
        language: "",
        type: "folder",
        children: [
          {
            name: "Hero.tsx",
            path: "src/components/Hero.tsx",
            content: `export default function Hero() {
  return (
    <section className="pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build amazing things with our tools
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  );
}`,
            language: "typescript",
            type: "file",
          },
          {
            name: "Features.tsx",
            path: "src/components/Features.tsx",
            content: `export default function Features() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Fast</h3>
            <p className="text-gray-600">Lightning fast performance</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Secure</h3>
            <p className="text-gray-600">Enterprise-grade security</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Scalable</h3>
            <p className="text-gray-600">Grows with your needs</p>
          </div>
        </div>
      </div>
    </section>
  );
}`,
            language: "typescript",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: "public",
    path: "public",
    content: "",
    language: "",
    type: "folder",
    children: [],
  },
  {
    name: "package.json",
    path: "package.json",
    content: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`,
    language: "json",
    type: "file",
  },
  {
    name: "tsconfig.json",
    path: "tsconfig.json",
    content: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true
  }
}`,
    language: "json",
    type: "file",
  },
]