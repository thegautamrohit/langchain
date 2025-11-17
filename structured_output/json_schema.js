import { Ollama } from "@langchain/ollama";
import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";

// Define the schema for phone review
const phoneReviewSchema = z.object({
    phoneName: z.string().describe("The name of the phone"),
    manufacturer: z.string().describe("The manufacturer of the phone"),

    display: z
        .object({
            size: z.string().describe("Screen size in inches"),
            type: z.string().describe("Display type (e.g., AMOLED, LCD)"),
            resolution: z.string().describe("Display resolution"),
            refreshRate: z.string().describe("Screen refresh rate"),
            protection: z.string().describe("Screen protection glass"),
        })
        .describe("Display specifications"),

    design: z
        .object({
            frameMaterial: z.string().describe("Material used for frame"),
            waterResistance: z
                .string()
                .describe("IP rating for water and dust resistance"),
            specialFeatures: z
                .array(z.string())
                .describe("Special design features like S Pen"),
        })
        .describe("Design details"),

    camera: z
        .object({
            mainCamera: z.string().describe("Main/primary camera specs"),
            ultraWide: z.string().describe("Ultra-wide camera specs"),
            telephoto: z
                .array(z.string())
                .describe("Telephoto camera specs with zoom levels"),
            frontCamera: z.string().describe("Front-facing camera specs"),
            videoCapabilities: z
                .array(z.string())
                .describe("Video recording capabilities"),
        })
        .describe("Camera system"),

    performance: z
        .object({
            processor: z.string().describe("Chipset/processor name"),
            ramOptions: z.array(z.string()).describe("Available RAM configurations"),
            storageOptions: z.array(z.string()).describe("Available storage options"),
        })
        .describe("Performance hardware"),

    software: z
        .object({
            os: z.string().describe("Operating system"),
            ui: z.string().describe("Custom UI/skin"),
            updateSupport: z.string().describe("Software update commitment"),
            aiFeatures: z.array(z.string()).describe("AI features available"),
        })
        .describe("Software and features"),

    battery: z
        .object({
            capacity: z.string().describe("Battery capacity in mAh"),
            wiredCharging: z.string().describe("Wired charging speed"),
            wirelessCharging: z.string().describe("Wireless charging speed"),
        })
        .describe("Battery specifications"),

    connectivity: z
        .object({
            network: z.array(z.string()).describe("Network support (4G, 5G, etc.)"),
            wifi: z.string().describe("WiFi version"),
            bluetooth: z.string().describe("Bluetooth version"),
            other: z.array(z.string()).describe("Other connectivity features"),
        })
        .describe("Connectivity options"),

    biometrics: z.array(z.string()).describe("Biometric authentication methods"),
});


// <<<<<<<<<<<<<<<<<<         USE ANOTHER LLM HERE (OPENAI OR ANTHROPIC) OLLAMA DOESNOT SUPPORT withStructuredOutput METHOD  >>>>>>>>>>>>>>>>
// const LLM = new Ollama({
//     model: "qwen3:4b",
//     temperature: 0.7,
// }); 

const LLM = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
    apiKey: "YOUR_OPENAI_API_KEY",
});


// Create structured output LLM
const structuredLLM = LLM.withStructuredOutput(phoneReviewSchema);

// Combine the review text
const reviewText = `
The Samsung Galaxy S25 Ultra continues the Ultra legacy with a device that's powerful, polished, and packed with cutting-edge features. It's clear Samsung aimed to solidify its position at the top of the premium smartphone market—and it mostly succeeds.

Design and Display

The S25 Ultra features a 6.9-inch Dynamic AMOLED 2X display with a 120Hz adaptive refresh rate, offering vibrant colors, deep blacks, and smooth scrolling.

The display has a resolution of 3120 x 1440 pixels.

It is protected by Corning Gorilla Glass Armor 2, which provides enhanced durability.

The phone has a titanium frame and an IP68 rating for dust and water resistance.

It also includes an embedded S Pen stylus.

Software & Features

Running One UI 7.1 based on Android 15, the user experience is smooth and customizable. Samsung's commitment to 7 years of software updates gives it an edge over most Android competitors. The integration of Galaxy AI, such as real-time translation, generative photo editing, and productivity enhancements in Samsung Notes, brings genuinely useful features to the everyday experience.

Camera

The S25 Ultra has a quad-camera setup:

200MP wide-angle primary camera
50MP ultra-wide-angle camera
10MP telephoto camera (3x optical zoom)
50MP periscope telephoto camera (5x optical zoom)

The front-facing camera is 12MP.

The camera system supports 8K video recording, HDR, and various professional features.

Performance and Hardware

The S25 Ultra is powered by the Snapdragon 8 Elite processor.

It comes with 12GB or 16GB of RAM.

Storage options include 256GB, 512GB, and 1TB.

The phone runs on Android 15 with Samsung's One UI 7.

Battery

The S25 Ultra has a 5000mAh battery.

It supports 45W wired fast charging and 15W wireless charging.

Other Features

The phone supports 5G connectivity.

It has an ultrasonic in-display fingerprint sensor.

It includes Wi-Fi 7, Bluetooth 5.3, NFC, and USB Type-C.
`;

// Extract structured data from the review
const prompt = `Extract all the technical specifications and features from the following phone review. 
Be thorough and accurate in extracting all details mentioned.

Review:
${reviewText}`;

console.log("Extracting structured data from phone review...\n");

const structuredData = await structuredLLM.invoke(prompt);

console.log("Extracted Structured Data:");
console.log(JSON.stringify(structuredData, null, 2));
