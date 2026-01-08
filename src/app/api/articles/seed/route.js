import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

// Article images will be handled by the frontend component
// These are placeholder paths - the actual images will be assigned by the articles page
const articleImagePaths = [
  "/assets/Articles/front-view-smiley-woman-holding-goat.jpg",
  "/assets/Articles/researcher-holds-test-tube-with-water-hand-blue-glove.jpg",
  "/assets/Articles/view-woman-working-animal-farming-field-celebrate-labour-day-women 1.jpg",
  "/assets/Articles/young-farmer-feeding-his-goats-milk-from-bottle-farm.jpg",
  "/assets/Articles/young-woman-farmer-looking-after-cows-cowshed.jpg",
];

const sampleArticles = [
  {
    title: "Goat Care and Health Management",
    description: "Comprehensive guide to maintaining healthy goats through proper nutrition, vaccination, and preventive care. Learn essential practices for goat farmers.",
    category: "Livestock Care",
    brand: "Rampart Power",
    usage: "Educational guide for goat farmers and livestock owners",
    composition: "Educational content and best practices",
    benefits: "Improved goat health, increased productivity, disease prevention",
    otherDetails: "Includes vaccination schedules and feeding guidelines",
    photo: articleImagePaths[0],
    longDescription: "Proper goat care involves understanding their nutritional needs, health monitoring, and preventive medicine. This guide covers all aspects of goat health management including common diseases, treatment protocols, and best farming practices."
  },
  {
    title: "Laboratory Testing in Veterinary Medicine",
    description: "Understanding the importance of laboratory testing in diagnosing and treating animal diseases. Explore modern veterinary diagnostics.",
    category: "Veterinary Science",
    brand: "Rampart Power",
    usage: "For veterinarians and livestock diagnostic professionals",
    composition: "Diagnostic procedures and testing protocols",
    benefits: "Accurate disease diagnosis, effective treatment planning, early detection",
    otherDetails: "Covers various diagnostic tests and their interpretations",
    photo: articleImagePaths[1],
    longDescription: "Laboratory testing plays a crucial role in veterinary medicine. This article explores various diagnostic tests, their importance, and how they contribute to effective animal healthcare. Learn about sample collection, test interpretation, and modern diagnostic technologies."
  },
  {
    title: "Women in Agriculture and Livestock Farming",
    description: "Celebrating the contributions of women in agriculture and livestock management. Empowering female farmers with knowledge and resources.",
    category: "Agriculture",
    brand: "Rampart Power",
    usage: "Inspiring content for women in farming",
    composition: "Success stories and agricultural practices",
    benefits: "Empowerment, knowledge sharing, community building",
    otherDetails: "Features real stories from women farmers",
    photo: articleImagePaths[2],
    longDescription: "Women play a vital role in agriculture and livestock farming worldwide. This article highlights their contributions, challenges, and success stories. It also provides resources and support for women entering or advancing in the agricultural sector."
  },
  {
    title: "Young Livestock Rearing Techniques",
    description: "Essential techniques for raising healthy young animals from birth to maturity. Focus on proper feeding, care, and early health management.",
    category: "Livestock Care",
    brand: "Rampart Power",
    usage: "For farmers raising young livestock",
    composition: "Feeding schedules and care protocols",
    benefits: "Healthy growth, reduced mortality, improved productivity",
    otherDetails: "Covers calves, kids, lambs, and piglets",
    photo: articleImagePaths[3],
    longDescription: "Raising young livestock requires specialized knowledge and care. This comprehensive guide covers feeding techniques, health monitoring, vaccination schedules, and housing requirements for young animals. Learn how to ensure proper growth and development from birth."
  },
  {
    title: "Cattle Management and Dairy Farming",
    description: "Best practices for cattle management in modern dairy farming. Optimize milk production and maintain herd health through proper management techniques.",
    category: "Dairy Farming",
    brand: "Rampart Power",
    usage: "For dairy farmers and cattle managers",
    composition: "Management practices and herd health protocols",
    benefits: "Increased milk yield, improved herd health, better profitability",
    otherDetails: "Includes milking procedures and housing management",
    photo: articleImagePaths[4],
    longDescription: "Effective cattle management is essential for successful dairy farming. This article covers feeding programs, milking procedures, housing requirements, disease prevention, and reproductive management. Learn modern techniques to maximize productivity and ensure animal welfare."
  }
];

// POST route to seed articles
export async function POST(request) {
  try {
    const articlesCollection = await dbConnect(
      collectionNameObj.articlesCollection
    );

    // Check if articles already exist
    const existingCount = await articlesCollection.countDocuments();
    
    if (existingCount > 0) {
      return NextResponse.json(
        { 
          message: "Articles already exist. Use DELETE to clear before seeding.",
          existingCount 
        },
        { status: 400 }
      );
    }

    // Insert sample articles with timestamps
    const articlesWithTimestamps = sampleArticles.map(article => ({
      ...article,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const result = await articlesCollection.insertMany(articlesWithTimestamps);

    return NextResponse.json(
      {
        message: "Articles seeded successfully",
        count: result.insertedCount,
        insertedIds: Object.values(result.insertedIds).map(id => id.toString())
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error seeding articles:", error);
    return NextResponse.json(
      { error: "Failed to seed articles", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE route to clear all articles (use with caution)
export async function DELETE(request) {
  try {
    const articlesCollection = await dbConnect(
      collectionNameObj.articlesCollection
    );

    const result = await articlesCollection.deleteMany({});

    return NextResponse.json(
      {
        message: "All articles deleted successfully",
        deletedCount: result.deletedCount
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting articles:", error);
    return NextResponse.json(
      { error: "Failed to delete articles" },
      { status: 500 }
    );
  }
}

