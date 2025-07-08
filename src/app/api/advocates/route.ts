import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function GET(request: Request) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '5');
  const search = searchParams.get('search') || '';

  let filteredData = advocateData;
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredData = advocateData.filter(advocate => 
      advocate.firstName.toLowerCase().includes(searchLower) ||
      advocate.lastName.toLowerCase().includes(searchLower) ||
      advocate.city.toLowerCase().includes(searchLower) ||
      advocate.degree.toLowerCase().includes(searchLower) ||
      advocate.phoneNumber.toString().includes(searchLower) ||
      advocate.yearsOfExperience.toString().includes(searchLower) ||
      advocate.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchLower)
      )
    );
  }

  const offset = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(offset, offset + pageSize);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  return Response.json({
    data: paginatedData,
    pagination: {
      page,
      pageSize,
      total: filteredData.length,
      totalPages
    }
  });
}
